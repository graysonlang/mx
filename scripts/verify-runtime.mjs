import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const runtimeDir = path.join(root, 'dist', 'runtime');
const runtimeFiles = [
  'JsMaterialXGenShader.js',
  'JsMaterialXGenShader.wasm',
  'JsMaterialXGenShader.data',
  'metadata.json',
];

for (const file of runtimeFiles) {
  const filePath = path.join(runtimeDir, file);
  if (!existsSync(filePath)) {
    console.error(`Missing ${path.relative(root, filePath)}.`);
    process.exit(1);
  }
}

const { createMaterialXGenShader, materialXVersion } = await import('../src/index.js');
const mx = await createMaterialXGenShader();
const runtimeVersion = mx.getVersionString();

if (runtimeVersion !== materialXVersion) {
  console.error(`Expected MaterialX ${materialXVersion}, got ${runtimeVersion}.`);
  process.exit(1);
}

console.log(`Verified MaterialX ${runtimeVersion} runtime in ${path.relative(root, runtimeDir)}.`);
