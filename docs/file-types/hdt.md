<!-- Generated format registry: analysis/document-formats.mjs -->
# .hdt: Later packed knowledge-base data

[All file types](README.md) · [Format overview](../formats.md)

| Property | Current assessment |
|---|---|
| Classification | bespoke |
| Definition status | Definition placeholder |
| Confidence | High main-store role |

## Identification and observed structure

Shared database stems are opened by later launchers. Stores contain readable article/style regions and opaque payload. Record IDs, boundaries and packing are unresolved.

This is an evidence-backed working definition, not a complete vendor specification. A suffix or generic magic match is not enough to select a decoder. Do not modify original bytes to make them fit a hypothesis.

## Analysis and implementation

- [Detailed analysis](../../analysis/formats.md)
- No dedicated verified decoder is registered yet.

## Retained publication examples

- [corpus/hyperties-demos/tour30/about.hdt](../../corpus/hyperties-demos/tour30/about.hdt)
- [corpus/hyperties-demos/tour7_91/about.hdt](../../corpus/hyperties-demos/tour7_91/about.hdt)
- [corpus/museum/newmjh/ENC.HDT](../../corpus/museum/newmjh/ENC.HDT)
- [corpus/subject-and-institutional/frame/attguide.hdt](../../corpus/subject-and-institutional/frame/attguide.hdt)
- [corpus/subject-and-institutional/hpguide/guide.hdt](../../corpus/subject-and-institutional/hpguide/guide.hdt)

## Tool work item

P0: recover the later museum database; establish boundaries, codecs and numeric-ID lookup.

## Definition work still required

- Specify dispatch rules, supported versions, field widths, byte order and boundaries where applicable.
- Record text encoding, control bytes and units separately from storage structure.
- Separate observed fields from inferred meaning; retain unknown bytes/commands.
- Add a minimal synthetic fixture and real-corpus checks before claiming support.
- Validate truncation, invalid ranges, decompression bounds and unsupported variants explicitly.
- For media, compare decoded pixels/glyphs/frames; for indexes, compare keys and targets; for text, preserve byte provenance.

Future format tools should share a browser/Node TypeScript byte core, following the [existing tools](../../tools/README.md). Use established standard-format tooling when suitable rather than inventing a bespoke replacement.
