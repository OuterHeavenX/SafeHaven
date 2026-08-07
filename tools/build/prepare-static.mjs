import { cp, mkdir, readFile, writeFile, readdir } from 'node:fs/promises';
import { dirname, extname, join, resolve } from 'node:path';
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

// TypeScript preserves relative import specifiers exactly. Browsers do not resolve
// extensionless imports the way Vite did, so normalize every emitted relative
// module specifier to an explicit .js path. This keeps the source modular while
// producing standards-compliant browser ES modules with no bundler.
async function normalizeBrowserImports(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await normalizeBrowserImports(path);
      continue;
    }
    if (extname(entry.name) !== '.js') continue;

    let source = await readFile(path, 'utf8');
    source = source
      .replace(/(from\s+['"])(\.{1,2}\/[^'"\n]+)(['"])/g, (all, start, spec, end) => {
        if (/\.(?:js|mjs|json|css|wasm)$/.test(spec)) return all;
        return `${start}${spec}.js${end}`;
      })
      .replace(/(import\(\s*['"])(\.{1,2}\/[^'"\n]+)(['"]\s*\))/g, (all, start, spec, end) => {
        if (/\.(?:js|mjs|json|css|wasm)$/.test(spec)) return all;
        return `${start}${spec}.js${end}`;
      });
    await writeFile(path, source);
  }
}

await normalizeBrowserImports(resolve(dist, 'js'));

const htmlPath = resolve(dist, 'index.html');
let html = await readFile(htmlPath, 'utf8');
await writeFile(htmlPath, html);

console.log('SafeHaven static build prepared in dist/ with browser-safe ES module imports.');
