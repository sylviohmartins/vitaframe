import { spawn, spawnSync } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import process from 'node:process';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const port = 4173;
const appUrl = `http://127.0.0.1:${port}/#home`;

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
  let value;
  for (let i = 0; i < attempts; i += 1) {
    try {
      value = await cdp.evaluate(predicate);
      if (value) return value;
    } catch {}
    await delay(100);
  }
  const diagnostics = await cdp.evaluate(`({href:location.href,title:document.title,readyState:document.readyState,body:document.body?.textContent?.slice(0,160)})`);
  throw new Error(`Timeout waiting for ${description}: ${JSON.stringify(diagnostics)}`);
}

const server = spawn('python3', ['-m', 'http.server', String(port), '--bind', '127.0.0.1'], { stdio: 'ignore' });
let chrome;
let cdp;
try {
  await waitFor(`http://127.0.0.1:${port}/`);
  const chromeBin = findChrome();
  chrome = spawn(chromeBin, [
    '--headless=new', '--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--no-proxy-server',
    '--remote-debugging-port=0', '--remote-debugging-address=127.0.0.1', '--remote-allow-origins=*',
    `--user-data-dir=/tmp/vitaframe-cdp-${process.pid}`, '--window-size=390,844', appUrl
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
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await cdp.send('Page.navigate', { url: appUrl });
  await waitForPage(cdp, `document.readyState === 'complete' && document.title.includes('VitaFrame') && !!document.querySelector('h1')`, 'VitaFrame home');

  const home = await cdp.evaluate(`({title:document.title,h1:document.querySelector('h1')?.textContent,overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth})`);
  if (!home.title.includes('VitaFrame') || !home.h1 || home.overflow) throw new Error(`Home smoke failed: ${JSON.stringify(home)}`);

  await cdp.evaluate(`document.querySelector('[data-action="start"]').click()`);
  await waitForPage(cdp, `location.hash.includes('privacy')`, 'privacy route');
  await cdp.evaluate(`document.querySelector('[data-action="consent"]').click()`);
  await waitForPage(cdp, `location.hash.includes('privacy') && document.querySelector('#privacyButton')?.textContent.includes('Salvo neste dispositivo')`, 'consent enabled');
  await cdp.evaluate(`location.hash='#assessment?step=1'`);
  await waitForPage(cdp, `location.hash.includes('step=1') && !!document.querySelector('input[name="goal.primary"]')`, 'assessment step 1');
  await cdp.evaluate(`(() => { const x=document.querySelector('input[name="goal.primary"][value="fat-loss"]'); x.checked=true; x.dispatchEvent(new Event('change',{bubbles:true})); document.querySelector('[data-action="next"]').click(); })()`);
  await waitForPage(cdp, `location.hash.includes('step=2')`, 'assessment step 2');

  const a11y = await cdp.evaluate(`(() => {
    const els=[...document.querySelectorAll('button,a,input:not([type="hidden"]),select,textarea')].filter(el=>!el.disabled && el.offsetParent!==null);
    const name=el=>el.getAttribute('aria-label')||el.getAttribute('title')||el.textContent?.trim()||el.labels?.[0]?.textContent?.trim()||el.getAttribute('placeholder');
    return {missing:els.filter(el=>!name(el)).map(el=>el.outerHTML.slice(0,100)), overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth};
  })()`);
  if (a11y.missing.length || a11y.overflow) throw new Error(`Mobile accessibility/layout smoke failed: ${JSON.stringify(a11y)}`);

  await mkdir('e2e-artifacts', { recursive: true });
  const mobileShot = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  await writeFile('e2e-artifacts/mobile-step2.png', Buffer.from(mobileShot.data, 'base64'));

  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await cdp.evaluate(`location.hash='#profile'`);
  await waitForPage(cdp, `!!document.querySelector('.profile-page')`, 'profile page');
  await cdp.evaluate(`document.querySelector('#themeToggle').click()`);
  await waitForPage(cdp, `document.documentElement.dataset.theme === 'dark'`, 'dark theme');
  const desktop = await cdp.evaluate(`({profile:!!document.querySelector('.profile-page'),theme:document.documentElement.dataset.theme,overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth})`);
  if (!desktop.profile || desktop.theme !== 'dark' || desktop.overflow) throw new Error(`Desktop/profile smoke failed: ${JSON.stringify(desktop)}`);
  const desktopShot = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  await writeFile('e2e-artifacts/desktop-profile-dark.png', Buffer.from(desktopShot.data, 'base64'));

  console.log('E2E OK: home, consent, assessment navigation, mobile layout/accessibility, profile and dark theme.');
} finally {
  cdp?.close();
  chrome?.kill('SIGTERM');
  server.kill('SIGTERM');
}
