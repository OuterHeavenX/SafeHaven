import http from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';

const root = process.argv.includes('--dist') ? 'dist' : '.';
const portArg = process.argv.find(arg => arg.startsWith('--port='));
const port = Number(portArg?.split('=')[1] ?? 4173);
const mime = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.glb':'model/gltf-binary','.gltf':'model/gltf+json','.mp3':'audio/mpeg','.ogg':'audio/ogg','.wav':'audio/wav','.wasm':'application/wasm'};

const server = http.createServer((req,res)=>{
  const raw = decodeURIComponent((req.url ?? '/').split('?')[0]);
  const safe = normalize(raw).replace(/^([.][.][/\\])+/, '').replace(/^[/\\]+/, '');
  let file = join(root, safe || 'index.html');
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
  if (!existsSync(file)) { res.writeHead(404, {'content-type':'text/plain; charset=utf-8'}); res.end('Not found'); return; }
  res.writeHead(200, {'content-type': mime[extname(file)] ?? 'application/octet-stream', 'cache-control':'no-store'});
  createReadStream(file).pipe(res);
});
server.listen(port, ()=>console.log(`SafeHaven static server: http://localhost:${port} (${root})`));
