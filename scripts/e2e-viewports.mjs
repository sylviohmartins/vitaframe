import { spawn, spawnSync } from 'node:child_process';
import process from 'node:process';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const port = 4175;
const origin = `http://127.0.0.1:${port}`;

const viewports = [
  ['iphone-compact', 375, 667],
  ['iphone-pro', 390, 844],
  ['iphone-pro-max', 430, 932],
  ['android-small', 360, 740],
  ['android-large', 412, 915],
  ['tablet', 768, 1024],
  ['desktop', 1440, 1000],
];

const surfaces = [
  ['home', '/index.html#home', '[data-vf-time-estimate]'],
  ['preferences', '/index.html#assessment?step=5', '.food-category'],
  ['training', '/index.html#assessment?step=7', '[data-vf-training-extra]'],
  ['recovery', '/index.html#assessment?step=8', '[data-vf-behavior-extra]'],
  ['profile', '/index.html#profile', '[data-vf-prompt-profile]'],
  ['adaptive', '/adaptive.html', '#questionHost'],
  ['meals', '/meals.html', '.meal-page'],
  ['advanced', '/advanced.html', '.advanced-page'],
];

function findChrome() {
  for (const candidate of [process.env.CHROME_BIN, 'google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser'].filter(Boolean)) {
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
    const timer = setTimeout(() => reject(new Error(`Chrome DevTools timeout: ${stderr.slice(-1500)}`)), timeoutMs);
    child.stderr.setEncoding('utf8');
    child.stderr.on('data', chunk => {
      stderr += chunk;
      const match = stderr.match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (match) {
        clearTimeout(timer);
        resolve(match[1]);
      }
    });
    child.once('error', error => { clearTimeout(timer); reject(error); });
  });
}

class CDP {
  constructor(url) {
    this.id = 1;
    this.pending = new Map();
    this.socket = new WebSocket(url);
  }
  async open() {
    await new Promise((resolve, reject) => {
      this.socket.onopen = resolve;
      this.socket.onerror = reject;
      this.socket.onmessage = event => {
        const message = JSON.parse(event.data);
        if (!message.id || !this.pending.has(message.id)) return;
        const pending = this.pending.get(message.id);
        this.pending.delete(message.id);
        if (message.error) pending.reject(new Error(message.error.message));
        else pending.resolve(message.result);
      };
    });
  }
  send(method, params = {}) {
    const id = this.id++;
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

async function waitForPage(cdp, selector, label) {
  for (let i = 0; i < 100; i += 1) {
    const ready = await cdp.evaluate(`document.readyState==='complete' && !!document.querySelector(${JSON.stringify(selector)})`).catch(() => false);
    if (ready) return;
    await delay(80);
  }
  throw new Error(`Timeout waiting for ${label}`);
}

const server = spawn('python3', ['-m', 'http.server', String(port), '--bind', '127.0.0.1'], { stdio: 'ignore' });
let chrome;
let cdp;

try {
  await waitFor(`${origin}/`);
  chrome = spawn(findChrome(), [
    '--headless=new', '--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--no-proxy-server',
    '--remote-debugging-port=0', '--remote-debugging-address=127.0.0.1', '--remote-allow-origins=*',
    `--user-data-dir=/tmp/vitaframe-viewports-${process.pid}`, 'about:blank',
  ], { stdio: ['ignore', 'ignore', 'pipe'] });

  const browserWs = await waitForDevTools(chrome);
  const debug = new URL(browserWs);
  const targets = await (await waitFor(`http://${debug.hostname}:${debug.port}/json/list`)).json();
  const page = targets.find(item => item.type === 'page' && item.webSocketDebuggerUrl) ?? targets[0];
  if (!page?.webSocketDebuggerUrl) throw new Error('No Chrome page target found.');

  cdp = new CDP(page.webSocketDebuggerUrl);
  await cdp.open();
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');

  for (const [viewportName, width, height] of viewports) {
    await cdp.send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 800 });
    for (const [surfaceName, path, selector] of surfaces) {
      await cdp.send('Page.navigate', { url: `${origin}${path}` });
      await waitForPage(cdp, selector, `${viewportName}/${surfaceName}`);
      const result = await cdp.evaluate(`(() => ({
        overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        width: document.documentElement.clientWidth,
        mainVisible: (() => { const r=document.querySelector(${JSON.stringify(selector)})?.getBoundingClientRect(); return !!r && r.width>0 && r.height>0; })(),
        title: document.title
      }))()`);
      if (result.overflow) throw new Error(`${viewportName}/${surfaceName}: horizontal overflow at ${width}x${height}`);
      if (!result.mainVisible) throw new Error(`${viewportName}/${surfaceName}: primary surface is not visible`);
      if (!String(result.title).includes('VitaFrame')) throw new Error(`${viewportName}/${surfaceName}: invalid document title`);
    }
  }

  console.log(`Viewport matrix OK: ${viewports.length} sizes × ${surfaces.length} critical surfaces.`);
} finally {
  cdp?.close();
  chrome?.kill('SIGTERM');
  server.kill('SIGTERM');
}
