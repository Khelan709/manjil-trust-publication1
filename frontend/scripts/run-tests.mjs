/**
 * Minimal test runner: bundles each tests/*.test.jsx with esbuild (so JSX and the app's imports work),
 * runs it in Node with a jsdom browser, and fails if any test fails.
 */
import { build } from 'esbuild';
import { readdirSync, rmSync, mkdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const out = path.join(root, 'tests', '.tmp');
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

let failed = 0;
for (const file of readdirSync(path.join(root, 'tests')).filter((f) => f.endsWith('.test.jsx'))) {
  const outfile = path.join(out, file.replace('.jsx', '.mjs'));
  await build({
    entryPoints: [path.join(root, 'tests', file)], outfile, bundle: true, platform: 'node', format: 'esm', jsx: 'automatic', logLevel: 'error',
    loader: { '.css': 'empty', '.js': 'jsx', '.png': 'dataurl' }, define: { 'import.meta.env': '{}' },
    external: ['react', 'react-dom', 'react-router-dom', 'jsdom', 'react/jsx-runtime'],
  });
  console.log(`\n=== ${file}`);
  const r = spawnSync(process.execPath, [outfile], { cwd: root, stdio: 'inherit' });
  if (r.status !== 0) failed++;
}
rmSync(out, { recursive: true, force: true });
process.exit(failed ? 1 : 0);
