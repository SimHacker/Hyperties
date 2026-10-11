<!-- Generated format registry: analysis/document-formats.mjs -->
# .pbb: Bitmap fonts

[All file types](README.md) · [Format overview](../formats.md)

| Property | Current assessment |
|---|---|
| Classification | bespoke |
| Definition status | Definition placeholder |
| Confidence | High role; unresolved encoding |

## Identification and observed structure

Stylesheet FONT references and names such as BIT7X14.PBB establish font use. Compact headers and glyph-shaped payload are not fully decoded.

This is an evidence-backed working definition, not a complete vendor specification. A suffix or generic magic match is not enough to select a decoder. Do not modify original bytes to make them fit a hypothesis.

## Analysis and implementation

- [Detailed analysis](../../analysis/formats.md)
- No dedicated verified decoder is registered yet.

## Retained publication examples

- [corpus/hyperties-demos/ht30glos/ogawa/bit7x14.pbb](../../corpus/hyperties-demos/ht30glos/ogawa/bit7x14.pbb)
- [corpus/hyperties-demos/ht30glos/ogawa/default.pbb](../../corpus/hyperties-demos/ht30glos/ogawa/default.pbb)
- [corpus/hyperties-demos/ht30tour/bit7x14.pbb](../../corpus/hyperties-demos/ht30tour/bit7x14.pbb)
- [corpus/hyperties-demos/ht30tour/coure000.pbb](../../corpus/hyperties-demos/ht30tour/coure000.pbb)
- [corpus/hyperties-demos/ht30tour/coure001.pbb](../../corpus/hyperties-demos/ht30tour/coure001.pbb)
- [corpus/hyperties-demos/ht30tour/coure002.pbb](../../corpus/hyperties-demos/ht30tour/coure002.pbb)

## Tool work item

P1: parse metrics/glyphs, render an atlas and compare known character shapes.

## Definition work still required

- Specify dispatch rules, supported versions, field widths, byte order and boundaries where applicable.
- Record text encoding, control bytes and units separately from storage structure.
- Separate observed fields from inferred meaning; retain unknown bytes/commands.
- Add a minimal synthetic fixture and real-corpus checks before claiming support.
- Validate truncation, invalid ranges, decompression bounds and unsupported variants explicitly.
- For media, compare decoded pixels/glyphs/frames; for indexes, compare keys and targets; for text, preserve byte provenance.

Future format tools should share a browser/Node TypeScript byte core, following the [existing tools](../../tools/README.md). Use established standard-format tooling when suitable rather than inventing a bespoke replacement.
