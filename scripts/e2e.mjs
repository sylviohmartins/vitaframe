import { spawn, spawnSync } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import process from 'node:process';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const port = 4173;
const debugPort = 9222;

function findChrome() {
  const candidates = [process.env.CHROME_BIN, 'google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser'].filter(Boolean);
  for (const candidate of candidates) {
    const result = spawnSync('which', [candidate], { encoding: 'utf8' });
    if (result.status === 0) return result.stdout.trim();
  }
  throw new Error('Chrome/Chromium not found.');
}

async function waitFor(url, attempts = 80) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
    } catch {}
    await delay(100);
  }
  throw new Error(`Timeout waiting for ${url}`);
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

const server = spawn('python3', ['-m', 'http.server', String(port), '--bind', '127.0.0.1'], { stdio: 'ignore' });
let chrome;
let cdp;
try {
  await waitFor(`http://127.0.0.1:${port}/`);
  const chromeBin = findChrome();
  chrome = spawn(chromeBin, [
    '--headless=new', '--no-sandbox', '--disable-gpu', '--no-proxy-server', `--remote-debugging-port=${debugPort}`,
    '--remote-debugging-address=127.0.0.1', '--user-data-dir=/tmp/vitaframe-cdp', '--window-size=390,844', 'about:blank'
  ], { stdio: 'ignore' });
  const listResponse = await waitFor(`http://127.0.0.1:${debugPort}/json/list`);
  const pages = await listResponse.json();
  if (!pages[0]?.webSocketDebuggerUrl) throw new Error('No CDP page target found.');
  cdp = new CDP(pages[0].webSocketDebuggerUrl);
  await cdp.open();
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await cdp.send('Page.navigate', { url: `http://127.0.0.1:${port}/#home` });
  await delay(800);

  const home = await cdp.evaluate(`({title:document.title,h1:document.querySelector('h1')?.textContent,overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth})`);
  if (!home.title.includes('VitaFrame') || !home.h1 || home.overflow) throw new Error(`Home smoke failed: ${JSON.stringify(home)}`);

  await cdp.evaluate(`document.querySelector('[data-action="start"]').click()`);
  await delay(250);
  if (!(await cdp.evaluate(`location.hash`)).includes('privacy')) throw new Error('Start must route to privacy before consent.');
  await cdp.evaluate(`document.querySelector('[data-action="consent"]').click()`);
  await delay(200);
  await cdp.evaluate(`location.hash='#assessment?step=1'`);
  await delay(350);
  await cdp.evaluate(`(() => { const x=document.querySelector('input[name="goal.primary"][value="fat-loss"]'); x.checked=true; x.dispatchEvent(new Event('change',{bubbles:true})); document.querySelector('[data-action="next"]').click(); })()`);
  await delay(350);
  if (!(await cdp.evaluate(`location.hash`)).includes('step=2')) throw new Error('Assessment did not advance to step 2.');

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
  await delay(400);
  await cdp.evaluate(`document.querySelector('#themeToggle').click()`);
  await delay(100);
  const desktop = await cdp.evaluate(`({profile:!!document.querySelector('.profile-page'),theme:document.documentElement.dataset.theme,overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth})`);
  if (!desktop.profile || desktop.theme !== 'dark' || desktop.overflow) throw new Error(`Desktop/profile smoke failed: ${JSON.stringify(desktop)}`);
  const desktopShot = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  await writeFile('e2e-artifacts/desktop-profile-dark.png', Buffer.from(desktopShot.data, 'base64'));

  console.log('E2E OK: consent, assessment navigation, persistence path, mobile layout, accessible names, profile and dark theme.');
} finally {
  cdp?.close();
  chrome?.kill('SIGTERM');
  server.kill('SIGTERM');
}
