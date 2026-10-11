# Code architecture: one platform-independent core

[Repository index](../INDEX.md) · [Shared tools](../tools/README.md) · [Layout](layout.md)

## Philosophy (owner direction, October 11, 2026)

Every parser, converter, validator and analysis tool should eventually be able
to run in **both Node and the browser**, given access to the raw source files on
GitHub. The historical originals are the source of truth; modern readable forms
are derived from them.

- **Build-time conversion and analysis run in Node now**, on a laptop, to produce
  web-readable output. Those conversions need not run in the browser in
  practice—but they share libraries, code and data with the web runtime, so
  they must stay reusable.
- **Write reusable logic as browser-friendly TypeScript.** Operate on
  `Uint8Array`/`DataView`, strings and plain data. No filesystem, process,
  `Buffer`, network or DOM dependencies in shared modules.
- **Keep I/O at the edges.** Thin Node adapters read files, walk directories,
  call Git and write outputs. A browser adapter can supply the same bytes from
  `fetch` (for example, raw GitHub URLs), file pickers or bundled data.
- **Nothing browser-hostile in shared code.** Node-only libraries, tools or APIs
  are acceptable in build adapters when genuinely necessary, but must not leak
  into modules the runtime reuses. Prefer an equivalent pure implementation when
  it is practical.
- **Move work into the browser as needed**, without rewriting it, because the
  core never assumed a platform.

## Current state

| Layer | Location | Platform |
|---|---|---|
| Format core: articles, indexes, markup, LZW, adaptive arithmetic, CP437 profile | [tools/src](../tools/src) | Platform-independent TypeScript; tested in Node and in a `Buffer`-free browser context |
| Browser bundle | `tools/dist/browser.js` (generated) | Browser global `HypertiesFormats` |
| Inventory, catalog, recovery, documentation generators, verification | [analysis/*.mjs](../analysis/README.md) | Node adapters; decoding delegates to the shared core |
| Original-to-current path map | [analysis/layout.mjs](../analysis/layout.mjs) | Pure data and functions; candidate to move into the core |
| Reading room | `analysis/reading-room.html` (generated) | Browser, embedding the same bundle |

## Migration direction

When touching an analysis script, extract reusable logic—catalog link
resolution, file-type classification, path mapping, index/range validation,
checksum-manifest formatting—into typed core modules that accept bytes and
plain data. Leave filesystem traversal, `file(1)`/`strings` invocation, Git
queries and output writing in Node adapters. Use Web Crypto–compatible hashing
in shared code if hashing moves into the core.

New format tools (PCX, stylesheets, graphic regions, HDT, fonts, palettes,
animations) should start in the shared core with Node and browser tests, not as
Node-only scripts to be ported later.
