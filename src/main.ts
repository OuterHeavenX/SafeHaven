const root = document.querySelector<HTMLDivElement>('#app-ui');
const canvas = document.querySelector<HTMLCanvasElement>('#game-canvas');
const fatal = document.querySelector<HTMLElement>('#fatal-error');

if (!root || !canvas) {
  throw new Error('SafeHaven launcher could not find its required page elements.');
}

canvas.style.visibility = 'hidden';

function showLauncherError(error: unknown) {
  console.error(error);
  if (!fatal) return;
  fatal.hidden = false;
  fatal.innerHTML = `
    <h2>SafeHaven could not enter The Fallen Valley</h2>
    <p>The title screen loaded correctly, but the 3D engine could not start.</p>
    <pre>${escapeHtml(error instanceof Error ? (error.stack ?? error.message) : String(error))}</pre>
    <button id="return-title">RETURN TO TITLE</button>
  `;
  fatal.querySelector('#return-title')?.addEventListener('click', () => {
    fatal.hidden = true;
    renderTitle();
  });
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  })[ch] ?? ch);
}

function renderTitle() {
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
async function launch(mode: 'new' | 'continue') {
  if (launching) return;
  launching = true;
  renderLoading();

  try {
    const { GameApp } = await import('./app/GameApp');
    const game = new GameApp(canvas);
    await game.init();
    canvas.style.visibility = 'visible';
    if (mode === 'new') game.newGame();
    else await game.load('autosave');
  } catch (error) {
    canvas.style.visibility = 'hidden';
    showLauncherError(error);
  } finally {
    launching = false;
  }
}

renderTitle();
