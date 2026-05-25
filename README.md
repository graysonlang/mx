# @graysonlang/mx

Prebuilt MaterialX JavaScript/WASM shader-generation runtime.

This package is a repackaging of generated runtime artifacts from the upstream MaterialX project. It is not a fork or replacement for MaterialX itself.

This package contains the generated `JsMaterialXGenShader` browser/runtime files only:

- `dist/runtime/JsMaterialXGenShader.js`
- `dist/runtime/JsMaterialXGenShader.wasm`
- `dist/runtime/JsMaterialXGenShader.data`
- `dist/runtime/metadata.json`

It intentionally does not include MaterialX sample assets, geometry, HDRIs, documents, or viewer resources. Consumers should choose and package their own assets separately.

## Upstream

MaterialX is developed by the Academy Software Foundation and the MaterialX contributors:

https://github.com/AcademySoftwareFoundation/MaterialX

The upstream source revision used for this package is recorded in `materialx-source.json` and `dist/runtime/metadata.json`.

## License and Attribution

The MaterialX source code and generated runtime artifacts are licensed under the Apache License, Version 2.0. The Apache 2.0 license text is included in this repository as `LICENSE`.

Copyright and authorship for MaterialX remain with the original MaterialX contributors. This package only provides npm-friendly distribution of the generated `JsMaterialXGenShader` JavaScript, WebAssembly, and data bundle.

## Versioning

Package versions track the upstream MaterialX version. For example, `@graysonlang/mx@1.39.5` contains a runtime built from MaterialX `v1.39.5`.

If the wrapper needs a packaging-only rebuild for the same upstream MaterialX version, use an explicit prerelease suffix such as `1.39.5-1`.

## Usage

```js
import { createMaterialXGenShader } from '@graysonlang/mx';

const mx = await createMaterialXGenShader();
console.log(mx.getVersionString());
```

Applications that serve the runtime files themselves can also copy files from `dist/runtime` or use the exported runtime subpaths.

## Build

Installed consumers do not build MaterialX. They use the prebuilt files already included under `dist/runtime`.

Rebuild this package only when changing the MaterialX source revision, the Emscripten build recipe, or the package wrapper. Rebuilding requires Git, Node.js, npm, and Emscripten with `em++` available through `CXX`, `EMSDK`, or `PATH`.

```sh
npm run setup:materialx
npm run build
npm run verify
```

The build output is committed/published under `dist/runtime` so downstream packages do not need to compile MaterialX during install.

If a consuming app is using this package through `npm link` or a local `file:` dependency, rebuild this package first, then rerun the consumer app's build so it copies the updated `dist/runtime` files.
