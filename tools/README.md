# Shared HyperTIES format tools

TypeScript byte readers shared by Node and browsers. No legacy compiler or
historical executable is required.

**Design rule:** all tools, converters and validators should eventually run in
both Node and the browser from raw source bytes. Shared code stays
platform-independent; Node-only I/O and tooling live in thin build adapters.
See [the architecture guide](../docs/architecture.md).

## Build and test

```sh
cd tools
npm ci
npm test
```

`npm run build` type-checks and emits ES modules and declarations under `dist/`,
then bundles the same code into `dist/browser.js` with the `HypertiesFormats`
global. `dist/` and `node_modules/` are generated and ignored. The lockfile records
the toolchain dependencies; there are no runtime npm dependencies.

## Modules

- [records.ts](src/records.ts): byte-preserving text views, little-endian article
  headers, both classic index dialects, range validation, partial markup scanner.
- [packed.ts](src/packed.ts): the observed classic LZW packed-article codec.
- [encoding.ts](src/encoding.ts): an explicit CP437 access-copy display profile,
  not a claim that every historical file uses that encoding.
- [index.ts](src/index.ts): shared exports.

The core accepts `Uint8Array`, uses `DataView`, and returns typed records. Node
`Buffer` is accepted as a Uint8Array input but is never required by the core.
There are no filesystem, network, DOM or process dependencies in these modules.
Errors carry `FormatError.code`; malformed and unsupported data do not produce
success-shaped empty records.

Node example, after building:

```js
import { readFileSync } from 'node:fs';
import { parseArticle } from './dist/index.js';
const article = parseArticle(readFileSync('../corpus/museum/oldmjh/INTRODUC.FIL'));
console.log(article.heading);
```

Browser ES-module example, served over HTTP:

```js
import { parseArticle } from './dist/index.js';
const bytes = new Uint8Array(await selectedFile.arrayBuffer());
const article = parseArticle(bytes);
```

The [local reading-room generator](../analysis/build-reading-room.mjs) embeds the
browser bundle and selected access data in a self-contained HTML file. This
works from a local file without CORS, a server or external downloads. A real
packed joke fixture was decoded in the browser with `Buffer` absent and produced
the same 280-byte record as Node.

## Recovery pipeline

From the repository root, after `npm --prefix tools run build`:

```sh
node analysis/analyze.mjs
node analysis/catalog.mjs
node analysis/recover-book.mjs --allow-partial
node analysis/build-reading-room.mjs
```

Open local `analysis/reading-room.html`. It contains 248 indexed book records
(218 recovered, 30 explicitly unsupported) and 402 museum articles. Generated
exports/HTML are Git-ignored access artifacts, not replacements for originals.

Without `--allow-partial`, book recovery returns a nonzero status if any records
remain unsupported; the flag intentionally permits a labeled incomplete access
prototype. Diagnostics remain in the export and command output.

The Node filesystem/catalog/export adapters are still JavaScript modules under
`analysis/`; their decoding logic delegates to this shared TypeScript core.
They can migrate to typed adapters separately without duplicating parsers.
