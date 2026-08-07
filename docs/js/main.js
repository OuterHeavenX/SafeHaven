"use strict";
const rootElement = document.querySelector('#app-ui');
const canvasElement = document.querySelector('#game-canvas');
const fatal = document.querySelector('#fatal-error');
const bootShell = document.querySelector('#boot-shell');
const bootStatus = document.querySelector('#boot-status');
const bootDiagnostics = document.querySelector('#boot-diagnostics');
if (!rootElement || !canvasElement) {
    throw new Error('SafeHaven launcher could not find its required page elements.');
}
const root = rootElement;
const canvas = canvasElement;
canvas.style.visibility = 'hidden';
function setBootStage(stage) {
    if (bootStatus)
        bootStatus.textContent = stage;
}
function finishBootShell() {
    if (bootShell)
        bootShell.hidden = true;
}
function rendererDiagnostics() {
    let webgl2 = false;
    try {
        const probe = document.createElement('canvas');
        webgl2 = Boolean(probe.getContext('webgl2'));
    }
    catch {
        webgl2 = false;
    }
    return {
        webgpu: 'gpu' in navigator,
        webgl2,
        userAgent: navigator.userAgent,
    };
}
function showLauncherError(error, stage = 'UNKNOWN STARTUP STAGE') {
    console.error(error);
    const message = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? (error.stack ?? error.message) : String(error);
    const diag = rendererDiagnostics();
    if (bootShell)
        bootShell.hidden = false;
    setBootStage('SAFEHAVEN FAILED TO INITIALIZE');
    if (bootDiagnostics) {
        bootDiagnostics.hidden = false;
        bootDiagnostics.textContent = [
            `Stage: ${stage}`,
            `Error: ${message}`,
            `WebGPU available: ${diag.webgpu ? 'yes' : 'no'}`,
            `WebGL2 available: ${diag.webgl2 ? 'yes' : 'no'}`,
            '',
            stack,
        ].join('\n');
    }
    if (!fatal)
        return;
    fatal.hidden = false;
    fatal.innerHTML = `
    <h2>SafeHaven could not enter The Fallen Valley</h2>
    <p>The direct-browser launcher stayed alive and captured the failure instead of showing a blank page.</p>
    <pre>${escapeHtml(stack)}</pre>
    <button id="return-title">RETURN TO TITLE</button>
  `;
    fatal.querySelector('#return-title')?.addEventListener('click', () => {
        fatal.hidden = true;
        if (bootDiagnostics)
            bootDiagnostics.hidden = true;
        renderTitle();
    });
}
function escapeHtml(value) {
    return value.replace(/[&<>'"]/g, ch => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    })[ch] ?? ch);
}
function renderTitle() {
    setBootStage('READY');
    finishBootShell();
    canvas.style.visibility = 'hidden';
    root.innerHTML = `
    <div class="title-screen">
      <div class="moon"></div>
      <div class="fog f1"></div>
      <div class="fog f2"></div>
      <section class="title-card">
        <div class="kicker">ORDER OF THE HAVEN ARCHIVES</div>
        <h1>SAFEHAVEN</h1>
        <p>The darkness has found us.</p>
        <button id="new">NEW GAME</button>
        <button id="cont">CONTINUE</button>
        <button id="load">LOAD AUTOSAVE</button>
        <button id="settings">SETTINGS</button>
        <small>v0.1.0 — The Fallen Valley</small>
      </section>
    </div>
  `;
    root.querySelector('#new')?.addEventListener('click', () => void launch('new'));
    root.querySelector('#cont')?.addEventListener('click', () => void launch('continue'));
    root.querySelector('#load')?.addEventListener('click', () => void launch('continue'));
    root.querySelector('#settings')?.addEventListener('click', () => {
        alert('Graphics: AUTO\nAudio: 100%\nUI Scale: 100%\nReduced Motion: Off');
    });
}
function renderLoading() {
    root.innerHTML = `
    <div class="title-screen">
      <div class="moon"></div>
      <div class="fog f1"></div>
      <div class="fog f2"></div>
      <section class="title-card">
        <div class="kicker">THE FALLEN VALLEY</div>
        <h1>SAFEHAVEN</h1>
        <p>Opening the gates...</p>
        <small>Initializing the 3D battlefield</small>
      </section>
    </div>
  `;
}
let launching = false;
async function launch(mode) {
    if (launching)
        return;
    launching = true;
    renderLoading();
    try {
        setBootStage('LOADING CORE SYSTEMS...');
        const { GameApp } = await import('./app/GameApp.js');
        setBootStage('INITIALIZING ENGINE...');
        const game = new GameApp(canvas);
        await game.init();
        setBootStage('PREPARING THE FALLEN VALLEY...');
        canvas.style.visibility = 'visible';
        if (mode === 'new')
            game.newGame();
        else
            await game.load('autosave');
    }
    catch (error) {
        canvas.style.visibility = 'hidden';
        showLauncherError(error, bootStatus?.textContent ?? 'GAME LAUNCH');
    }
    finally {
        launching = false;
    }
}
try {
    setBootStage('LOADING CORE SYSTEMS...');
    renderTitle();
}
catch (error) {
    showLauncherError(error, 'TITLE SCREEN');
}
//# sourceMappingURL=main.js.map