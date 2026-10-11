<!-- Generated format registry: analysis/document-formats.mjs -->
# .grb: Graphic objects and link regions

[All file types](README.md) · [Format overview](../formats.md)

| Property | Current assessment |
|---|---|
| Classification | bespoke |
| Definition status | Text observed; binary unresolved |
| Confidence | High text role |

## Identification and observed structure

Text examples use FILE/TYPE/SIZE/MODE, named LINK rectangles and ACTION blocks including JUMP TO ARTICLE. Binary variants need their own definition.

This is an evidence-backed working definition, not a complete vendor specification. A suffix or generic magic match is not enough to select a decoder. Do not modify original bytes to make them fit a hypothesis.

## Analysis and implementation

- [Detailed analysis](../../analysis/formats.md)
- No dedicated verified decoder is registered yet.

## Retained publication examples

- [corpus/hyperties-demos/ht30glos/ogawa/arch.grb](../../corpus/hyperties-demos/ht30glos/ogawa/arch.grb)
- [corpus/hyperties-demos/ht30glos/ogawa/default.grb](../../corpus/hyperties-demos/ht30glos/ogawa/default.grb)
- [corpus/hyperties-demos/ht30glos/ogawa/descrip.grb](../../corpus/hyperties-demos/ht30glos/ogawa/descrip.grb)
- [corpus/hyperties-demos/ht30glos/ogawa/grid.grb](../../corpus/hyperties-demos/ht30glos/ogawa/grid.grb)
- [corpus/hyperties-demos/ht30glos/ogawa/histpro.grb](../../corpus/hyperties-demos/ht30glos/ogawa/histpro.grb)
- [corpus/hyperties-demos/ht30glos/ogawa/histsys.grb](../../corpus/hyperties-demos/ht30glos/ogawa/histsys.grb)

## Tool work item

P0: parse regions/actions and connect coordinates to decoded images; preserve unknown operations.

## Definition work still required

- Specify dispatch rules, supported versions, field widths, byte order and boundaries where applicable.
- Record text encoding, control bytes and units separately from storage structure.
- Separate observed fields from inferred meaning; retain unknown bytes/commands.
- Add a minimal synthetic fixture and real-corpus checks before claiming support.
- Validate truncation, invalid ranges, decompression bounds and unsupported variants explicitly.
- For media, compare decoded pixels/glyphs/frames; for indexes, compare keys and targets; for text, preserve byte provenance.

Future format tools should share a browser/Node TypeScript byte core, following the [existing tools](../../tools/README.md). Use established standard-format tooling when suitable rather than inventing a bespoke replacement.
