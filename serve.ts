import { createServer } from 'node:http';
import { readFileSync, statSync } from 'node:fs';
import { extname, join, normalize, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = join(fileURLToPath(new URL('.', import.meta.url)), 'game');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8' };
createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url || '/', 'http://localhost').pathname);
  const path = normalize(join(root, pathname === '/' ? 'index.html' : pathname));
  if (relative(root, path).startsWith('..') || !statSafe(path)) { response.writeHead(404); response.end('Not found'); return; }
  response.writeHead(200, { 'Content-Type': types[extname(path)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  response.end(readFileSync(path));
}).listen(Number(process.env.PORT || 8080), '127.0.0.1', () => console.log(`EMBERHOLD at http://127.0.0.1:${process.env.PORT || 8080}`));
function statSafe(path) { try { return statSync(path).isFile(); } catch { return false; } }
