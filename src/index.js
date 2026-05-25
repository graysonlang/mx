export const materialXVersion = '1.39.5';

export const runtimeFiles = [
  'JsMaterialXGenShader.js',
  'JsMaterialXGenShader.wasm',
  'JsMaterialXGenShader.data',
];

export function getRuntimeBaseUrl() {
  return new URL('../dist/runtime/', import.meta.url);
}

export function getRuntimeFileUrl(fileName) {
  return new URL(fileName, getRuntimeBaseUrl());
}

function getRuntimeFileLocation(fileName, runtimeBaseUrl) {
  const fileUrl = new URL(fileName, runtimeBaseUrl);
  if (typeof process === 'object' && process.versions?.node) {
    return fileUrl.pathname;
  }
  return fileUrl.href;
}

export async function createMaterialXGenShader(options = {}) {
  const runtimeBaseUrl = getRuntimeBaseUrl();
  const loaderUrl = new URL('JsMaterialXGenShader.js', runtimeBaseUrl);
  const { default: createMaterialX } = await import(loaderUrl.href);

  return createMaterialX({
    ...options,
    locateFile: (fileName, prefix) => {
      if (options.locateFile) return options.locateFile(fileName, prefix);
      return getRuntimeFileLocation(fileName, runtimeBaseUrl);
    },
  });
}
