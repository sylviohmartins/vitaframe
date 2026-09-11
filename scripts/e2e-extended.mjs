import { spawn, spawnSync } from 'node:child_process';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import process from 'node:process';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const port = 4174;
const origin = `http://127.0.0.1:${port}`;

function findChrome() {
  const candidates = [process.env.CHROME_BIN, 'google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser'].filter(Boolean);
  for (const candidate of candidates) {
    const result = spawnSync('which', [candidate], { encoding: 'utf8' });
    if (result.status === 0) return result.stdout.trim();
  }
  throw new Error('Chrome/Chromium not found.');
}

async function waitFor(url, attempts = 100) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
    } catch {}
    await delay(100);
  }
  throw new Error(`Timeout waiting for ${url}`);
}

function waitForDevTools(child, timeoutMs = 12000) {
  return new Promise((resolve, reject) => {
    let stderr = '';
    let settled = false;
    const finish = (fn, value) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      fn(value);
    };
    const timer = setTimeout(() => {
      finish(reject, new Error(`Timeout waiting for Chrome DevTools endpoint. Chrome stderr: ${stderr.slice(-2000)}`));
    }, timeoutMs);

    child.stderr.setEncoding('utf8');
    child.stderr.on('data', chunk => {
      stderr = `${stderr}${chunk}`.slice(-6000);
      const match = stderr.match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (match) finish(resolve, match[1]);
    });
    child.once('error', error => finish(reject, error));
    child.once('exit', (code, signal) => {
      if (!settled) finish(reject, new Error(`Chrome exited before DevTools became ready (code=${code}, signal=${signal}). ${stderr.slice(-2000)}`));
    });
  });
}

class CDP {
  constructor(url) {
    this.nextId = 1;
    this.pending = new Map();
    this.socket = new WebSocket(url);
  }
  async open() {
    await new Promise((resolve, reject) => {
      this.socket.onopen = resolve;
      this.socket.onerror = reject;
      this.socket.onmessage = event => {
        const message = JSON.parse(event.data);
        if (message.id && this.pending.has(message.id)) {
          const { resolve: done, reject: fail } = this.pending.get(message.id);
          this.pending.delete(message.id);
          if (message.error) fail(new Error(message.error.message)); else done(message.result);
        }
      };
    });
  }
  send(method, params = {}) {
    const id = this.nextId++;
    this.socket.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => this.pending.set(id, { resolve, reject }));
  }
  async evaluate(expression) {
    const result = await this.send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.text || 'Runtime evaluation failed');
    return result.result.value;
  }
  close() { this.socket.close(); }
}

async function waitForPage(cdp, predicate, description, attempts = 100) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const value = await cdp.evaluate(predicate);
      if (value) return value;
    } catch {}
    await delay(100);
  }
  const diagnostics = await cdp.evaluate(`({href:location.href,title:document.title,readyState:document.readyState,body:document.body?.textContent?.slice(0,180)})`);
  throw new Error(`Timeout waiting for ${description}: ${JSON.stringify(diagnostics)}`);
}

async function assertAX(cdp, label) {
  const ax = await cdp.send('Accessibility.getFullAXTree');
  const interactiveRoles = new Set(['button','link','textbox','combobox','radio','checkbox']);
  const unnamed = ax.nodes.filter(node => interactiveRoles.has(node.role?.value) && !String(node.name?.value || '').trim() && !node.ignored);
  if (unnamed.length) throw new Error(`${label}: accessibility tree has ${unnamed.length} unnamed interactive node(s).`);
  const overflow = await cdp.evaluate(`document.documentElement.scrollWidth>document.documentElement.clientWidth`);
  if (overflow) throw new Error(`${label}: horizontal overflow detected.`);
}

async function screenshot(cdp, name) {
  const shot = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  await writeFile(`e2e-artifacts/${name}.png`, Buffer.from(shot.data, 'base64'));
}

async function assertBudgets() {
  const sizes = {};
  for (const file of [
    'index.html','advanced.html','adaptive.html','meals.html','assets/styles.css','assets/navigation.css','assets/advanced.css','assets/adaptive.css','assets/meals.css',
    'src/app.mjs','src/local-metrics.mjs','src/advanced.mjs','src/advanced-logic.mjs','src/adaptive-interview.mjs','src/adaptive-interview-logic.mjs','src/meals.mjs'
  ]) sizes[file] = (await stat(file)).size;

  const assertions = [
    [sizes['index.html'] <= 50_000, 'index.html exceeds 50 KB'],
    [sizes['advanced.html'] <= 50_000, 'advanced.html exceeds 50 KB'],
    [sizes['adaptive.html'] <= 50_000, 'adaptive.html exceeds 50 KB'],
    [sizes['meals.html'] <= 50_000, 'meals.html exceeds 50 KB'],
    [sizes['src/app.mjs'] + sizes['src/local-metrics.mjs'] <= 150_000, 'main JS exceeds 150 KB'],
    [sizes['src/advanced.mjs'] + sizes['src/advanced-logic.mjs'] <= 150_000, 'advanced JS exceeds 150 KB'],
    [sizes['src/adaptive-interview.mjs'] + sizes['src/adaptive-interview-logic.mjs'] <= 100_000, 'adaptive JS exceeds 100 KB'],
    [sizes['src/meals.mjs'] <= 80_000, 'meal JS exceeds 80 KB'],
    [sizes['assets/styles.css'] + sizes['assets/navigation.css'] <= 80_000, 'main CSS exceeds 80 KB'],
    [sizes['assets/styles.css'] + sizes['assets/advanced.css'] <= 80_000, 'advanced CSS exceeds 80 KB'],
    [sizes['assets/styles.css'] + sizes['assets/adaptive.css'] <= 80_000, 'adaptive CSS exceeds 80 KB'],
    [sizes['assets/styles.css'] + sizes['assets/meals.css'] <= 80_000, 'meal CSS exceeds 80 KB'],
  ];
  const failed = assertions.filter(([ok]) => !ok).map(([, message]) => message);
  if (failed.length) throw new Error(`Performance size budget failed: ${failed.join('; ')}`);
  return sizes;
}

function rectSignature(value) {
  return Object.fromEntries(Object.entries(value).map(([key, rect]) => [key, rect ? {
    x: Math.round(rect.x), y: Math.round(rect.y), width: Math.round(rect.width), height: Math.round(rect.height)
  } : null]));
}

function compareLayout(actual, baseline, tolerance = 8) {
  const diffs = [];
  for (const [viewport, expectedSelectors] of Object.entries(baseline)) {
    const actualSelectors = actual[viewport];
    if (!actualSelectors) { diffs.push(`missing viewport ${viewport}`); continue; }
    for (const [selector, expected] of Object.entries(expectedSelectors)) {
      const got = actualSelectors[selector];
      if (!got || !expected) { if (got !== expected) diffs.push(`${viewport}: mismatch ${selector}`); continue; }
      for (const key of ['x','y','width','height']) {
        if (Math.abs(got[key] - expected[key]) > tolerance) diffs.push(`${viewport} ${selector} ${key}: ${got[key]} vs ${expected[key]}`);
      }
    }
  }
  return diffs;
}

async function readBaseline() {
  try { return JSON.parse(await readFile('tests/visual-baseline.json', 'utf8')); } catch { return null; }
}

const sizes = await assertBudgets();
await mkdir('e2e-artifacts', { recursive: true });
const server = spawn('python3', ['-m', 'http.server', String(port), '--bind', '127.0.0.1'], { stdio: 'ignore' });
let chrome;
let cdp;

try {
  await waitFor(`${origin}/`);
  const chromeBin = findChrome();
  chrome = spawn(chromeBin, [
    '--headless=new','--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--no-proxy-server',
    '--remote-debugging-port=0','--remote-debugging-address=127.0.0.1','--remote-allow-origins=*',
    `--user-data-dir=/tmp/vitaframe-extended-cdp-${process.pid}`,'--window-size=390,844','about:blank'
  ], { stdio: ['ignore', 'ignore', 'pipe'] });

  const browserWs = await waitForDevTools(chrome);
  const debuggerUrl = new URL(browserWs);
  const listResponse = await waitFor(`http://${debuggerUrl.hostname}:${debuggerUrl.port}/json/list`);
  const pages = await listResponse.json();
  const page = pages.find(item => item.type === 'page' && item.webSocketDebuggerUrl) ?? pages[0];
  if (!page?.webSocketDebuggerUrl) throw new Error('No CDP page target found.');
  cdp = new CDP(page.webSocketDebuggerUrl);
  await cdp.open();
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await cdp.send('Accessibility.enable');
  await cdp.send('Performance.enable');
  await cdp.send('Page.addScriptToEvaluateOnNewDocument', { source: `
    window.__vfVitals={cls:0,lcp:0,maxEvent:0};
    try{new PerformanceObserver(list=>{for(const e of list.getEntries()){if(!e.hadRecentInput)window.__vfVitals.cls+=e.value;}}).observe({type:'layout-shift',buffered:true});}catch{}
    try{new PerformanceObserver(list=>{const e=list.getEntries().at(-1);if(e)window.__vfVitals.lcp=e.startTime;}).observe({type:'largest-contentful-paint',buffered:true});}catch{}
    try{new PerformanceObserver(list=>{for(const e of list.getEntries())window.__vfVitals.maxEvent=Math.max(window.__vfVitals.maxEvent,e.duration||0);}).observe({type:'event',buffered:true,durationThreshold:16});}catch{}
  ` });

  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await cdp.send('Page.navigate', { url: `${origin}/index.html#home` });
  await waitForPage(cdp, `document.readyState==='complete' && document.title.includes('VitaFrame') && !!document.querySelector('.hero')`, 'mobile home');
  await delay(250);

  const mobileLayout = rectSignature(await cdp.evaluate(`(() => {
    const pick=s=>{const r=document.querySelector(s)?.getBoundingClientRect();return r?{x:r.x,y:r.y,width:r.width,height:r.height}:null};
    return {'.topbar':pick('.topbar'),'.hero h1':pick('.hero h1'),'.hero-actions':pick('.hero-actions'),'.hero-panel':pick('.hero-panel')};
  })()`));
  const mobileVitals = await cdp.evaluate(`({vitals:window.__vfVitals,overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth,requests:performance.getEntriesByType('resource').length})`);
  if (mobileVitals.overflow) throw new Error('Mobile home has horizontal overflow.');
  if (mobileVitals.vitals.cls > 0.1) throw new Error(`CLS budget failed: ${mobileVitals.vitals.cls}`);
  if (mobileVitals.vitals.lcp > 2500) throw new Error(`LCP budget failed: ${mobileVitals.vitals.lcp}ms`);
  if (mobileVitals.requests > 12) throw new Error(`Critical request budget failed: ${mobileVitals.requests}`);
  await assertAX(cdp, 'mobile home');

  await cdp.evaluate(`(() => {
    localStorage.setItem('vitaframe:v1:consent','yes');
    localStorage.setItem('vitaframe:v1:assessment',JSON.stringify({
      meta:{version:1,createdAt:new Date(Date.now()-600000).toISOString(),updatedAt:new Date().toISOString(),lastStep:8,adaptiveSkipped:{}},
      goal:{primary:'fat-loss',pace:'balanced'},
      body:{age:'29',sex:'male',heightCm:'178',weightKg:'90',usualWeightKg:'87',waistCm:'96',bodyFatPct:'28.2',bodyFatSource:'',bodyFatDate:''},
      health:{answered:true},currentDiet:{answered:true},foodPreferences:{'fruits-1':3},foodNotes:{},
      routine:{answered:true,workMode:'hybrid'},lifestyle:{},training:{answered:true,daysPerWeek:'4',time:'',experience:''},
      recovery:{answered:true,sleepHours:'7'}
    }));
  })()`);

  await cdp.send('Page.navigate', { url: `${origin}/advanced.html` });
  await waitForPage(cdp, `document.readyState==='complete' && !!document.querySelector('#adaptiveList .adaptive-item')`, 'advanced adaptive list');
  await assertAX(cdp, 'advanced center');
  await cdp.evaluate(`(() => { const t=document.querySelector('#healthText'); t.value='Zepp Life\\nPeso 89,65 kg\\nGordura corporal 28,2 %\\nÁgua 49,2 %\\nMetabolismo basal 1815 kcal'; document.querySelector('#detectButton').click(); })()`);
  await waitForPage(cdp, `document.querySelectorAll('#detectedResults tbody tr').length>=4`, 'detected imported fields');
  await cdp.evaluate(`document.querySelector('#applyDetectedButton').click()`);
  await cdp.evaluate(`document.querySelector('#snapshotButton').click()`);
  await waitForPage(cdp, `document.querySelectorAll('#historyList .history-row').length===1`, 'history snapshot');
  await screenshot(cdp, 'advanced-mobile');

  await cdp.send('Page.navigate', { url: `${origin}/adaptive.html` });
  await waitForPage(cdp, `document.readyState==='complete' && document.querySelector('#questionHost h2')?.textContent.includes('bebida alcoólica')`, 'adaptive alcohol question');
  await assertAX(cdp, 'adaptive interview');
  await screenshot(cdp, 'adaptive-mobile');
  await cdp.evaluate(`(() => { const select=document.querySelector('#adaptiveAnswer'); select.value='no'; document.querySelector('#adaptiveForm').requestSubmit(); })()`);
  await waitForPage(cdp, `document.querySelector('#questionHost h2') && !document.querySelector('#questionHost h2').textContent.includes('bebida alcoólica')`, 'adaptive branch after alcohol no');
  const adaptiveState = await cdp.evaluate(`JSON.parse(localStorage.getItem('vitaframe:v1:assessment')).lifestyle`);
  if (adaptiveState.alcoholUse !== 'no' || adaptiveState.alcoholFrequency) throw new Error(`Adaptive branch persisted unexpected data: ${JSON.stringify(adaptiveState)}`);

  await cdp.send('Page.navigate', { url: `${origin}/meals.html` });
  await waitForPage(cdp, `document.readyState==='complete' && !!document.querySelector('#seedMeals')`, 'meal timeline');
  await assertAX(cdp, 'meal timeline');
  await cdp.evaluate(`document.querySelector('#seedMeals').click()`);
  await waitForPage(cdp, `document.querySelectorAll('.meal-card').length===4`, 'seeded meals');
  await cdp.evaluate(`document.querySelector('#addMeal').click()`);
  await waitForPage(cdp, `document.querySelectorAll('.meal-card').length===5`, 'added meal');
  await cdp.evaluate(`(() => { const last=document.querySelector('.meal-card:last-child textarea[name="foods"]'); last.value='whey e banana'; last.dispatchEvent(new Event('input',{bubbles:true})); })()`);
  const persistedMeals = await cdp.evaluate(`JSON.parse(localStorage.getItem('vitaframe:v1:assessment')).currentDiet.mealTimeline.length`);
  if (persistedMeals !== 5) throw new Error(`Meal timeline persistence failed: ${persistedMeals}`);
  await screenshot(cdp, 'meals-mobile');

  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await cdp.send('Page.navigate', { url: `${origin}/index.html#profile` });
  await waitForPage(cdp, `!!document.querySelector('.profile-page')`, 'desktop profile');
  await assertAX(cdp, 'desktop profile');
  const desktopLayout = rectSignature(await cdp.evaluate(`(() => {
    const pick=s=>{const r=document.querySelector(s)?.getBoundingClientRect();return r?{x:r.x,y:r.y,width:r.width,height:r.height}:null};
    return {'.topbar':pick('.topbar'),'.profile-page':pick('.profile-page'),'.profile-hero':pick('.profile-hero'),'.profile-columns':pick('.profile-columns')};
  })()`));

  const signature = { mobile: mobileLayout, desktop: desktopLayout };
  await writeFile('e2e-artifacts/layout-signature.json', JSON.stringify(signature, null, 2));
  await writeFile('e2e-artifacts/performance.json', JSON.stringify({ sizes, mobileVitals }, null, 2));
  const baseline = await readBaseline();
  if (baseline) {
    const diffs = compareLayout(signature, baseline);
    if (diffs.length) throw new Error(`Visual layout regression: ${diffs.slice(0, 12).join('; ')}`);
  }

  console.log('Extended E2E OK: adaptive branching, assisted import, history, meal timeline, AX tree, performance budgets and layout signature.');
} finally {
  cdp?.close();
  chrome?.kill('SIGTERM');
  server.kill('SIGTERM');
}
