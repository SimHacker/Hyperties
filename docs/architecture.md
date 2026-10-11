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

## Planned multilingual speech and pronunciation review

The current reader sets an English language hint and leaves voice selection to
the browser. It does **not** implement multilingual name annotations or reviewed
pronunciations. That is insufficient as a long-term approach for collections
with names from many languages, particularly the museum material.

### Preserve the text; annotate the access layer

Keep pronunciation annotations separate from historical source bytes. A proposed
annotation identifies the collection, record, source hash and exact byte span,
with the original spelling for verification. It can carry:

- a BCP 47 language/locale tag, where supported by evidence;
- a preferred pronunciation, with its notation identified (for example IPA),
  and optional reviewed speech-engine-specific rendering;
- evidence such as a cited recording or an account from the person, family,
  community or a knowledgeable language specialist;
- reviewer, review date, revision history and status: proposed, approved,
  disputed or superseded.

The same spelling can require different pronunciations for different people
or contexts. Support record/span-specific overrides rather than globally
assigning a language to every occurrence of a surname. Do not infer ethnicity,
nationality or a person's preferred pronunciation from spelling alone.
Changed source hashes or mismatched spans must invalidate the annotation
explicitly, not silently attach it to new text.

### Assistance proposes; humans decide

An ML classifier could locate candidate names and suggest language or
pronunciation candidates, with confidence and supporting evidence. Its output
belongs in a review queue, not directly in published speech annotations.
Language identification is not proof of pronunciation, and confidence is not
an approval. Reviewers should hear the proposed rendering in context, compare
it with the evidence, and accept, revise or reject it. Ambiguous alternatives
and unresolved cases should remain visible.

Store approved decisions as portable, versioned data so they survive changes
of classifier, browser or speech engine. Corrections need a clear contribution
and review path. Prioritize names and passages with relevant custodians and
language specialists; automation helps with scale, not with deciding whose
name is spoken correctly.

### Portable tags, device-specific voices

Use language and pronunciation metadata as the durable intent. A browser
adapter resolves that intent against available voices, including voices that
arrive asynchronously through `voiceschanged`. Offer an audition and explicit
user selection; voice names or URIs may be saved as local preferences but are
not portable identifiers guaranteed on another device.

Split speech into appropriate language spans while preserving order, context
and cancellation across the whole playback. Switching to a voice with the
right language tag does not guarantee it pronounces a name correctly.
Web Speech synthesis does not provide a portable IPA/SSML pronunciation
interface; preserve that evidence without claiming it will be honored by every
engine. Any altered spoken spelling is a reviewed access derivative, never
a change to the displayed historical text.

When no suitable voice or rendering is available, expose that limitation and
offer an explicit choice to continue with an auditioned alternative or skip
the affected speech. Do not silently label an English default as a correct
multilingual pronunciation. Reviewed recordings may be another option where
permissions allow. The visible article and definition remain accessible.

### Validation before publication

Test source-span integrity, annotation precedence, voice availability changes,
unsupported languages, cancellation and playback order. Human listening review
must cover the actual names on the target voice/engine, not just successful
API calls or language-tag matching. An approved annotation does not certify
every future voice implementation: material voice changes require re-audition.
See the [museum preservation principles](../analysis/crown-jewels.md#reviewed-pronunciation-is-part-of-respectful-access).
