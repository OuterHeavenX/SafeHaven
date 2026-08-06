import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '../..');
const dist = resolve(root, 'dist');

await mkdir(resolve(dist, 'styles'), { recursive: true });
await mkdir(resolve(dist, 'vendor/playcanvas'), { recursive: true });

await cp(resolve(root, 'index.html'), resolve(dist, 'index.html'));
await cp(resolve(root, 'styles'), resolve(dist, 'styles'), { recursive: true });
await cp(resolve(root, 'public'), resolve(dist, 'public'), { recursive: true, force: true }).catch(() => {});
await cp(resolve(root, 'assets'), resolve(dist, 'assets'), { recursive: true, force: true }).catch(() => {});
await cp(resolve(root, 'node_modules/playcanvas/build/playcanvas.mjs'), resolve(dist, 'vendor/playcanvas/playcanvas.mjs'));

const htmlPath = resolve(dist, 'index.html');
let html = await readFile(htmlPath, 'utf8');
html = html.replace('./styles/global.css', './styles/global.css');
await writeFile(htmlPath, html);

console.log('SafeHaven static build prepared in dist/.');
