<!-- Generated format registry: analysis/document-formats.mjs -->
# .stl: Stylesheet definitions

[All file types](README.md) · [Format overview](../formats.md)

| Property | Current assessment |
|---|---|
| Classification | bespoke |
| Definition status | Text observed; binary unresolved |
| Confidence | High text role |

## Identification and observed structure

Text examples use BACKGROUND, TEXTWINDOW, SHORTDESCRIPTION, SIZE, FONT and ACTION blocks. Other files are binary. Not STL 3D meshes.

This is an evidence-backed working definition, not a complete vendor specification. A suffix or generic magic match is not enough to select a decoder. Do not modify original bytes to make them fit a hypothesis.

## Analysis and implementation

- [Detailed analysis](../../analysis/formats.md)
- No dedicated verified decoder is registered yet.

## Retained publication examples

- [corpus/hyperties-demos/ht30glos/ogawa/arch.stl](../../corpus/hyperties-demos/ht30glos/ogawa/arch.stl)
- [corpus/hyperties-demos/ht30glos/ogawa/default.stl](../../corpus/hyperties-demos/ht30glos/ogawa/default.stl)
- [corpus/hyperties-demos/ht30glos/ogawa/grid.stl](../../corpus/hyperties-demos/ht30glos/ogawa/grid.stl)
- [corpus/hyperties-demos/ht30glos/ogawa/histpro.stl](../../corpus/hyperties-demos/ht30glos/ogawa/histpro.stl)
- [corpus/hyperties-demos/ht30glos/ogawa/histsys.stl](../../corpus/hyperties-demos/ht30glos/ogawa/histsys.stl)
- [corpus/hyperties-demos/ht30glos/ogawa/index.stl](../../corpus/hyperties-demos/ht30glos/ogawa/index.stl)

## Tool work item

P0: parse an AST, validate resources and interpret layout without host-command execution.

## Definition work still required

- Specify dispatch rules, supported versions, field widths, byte order and boundaries where applicable.
- Record text encoding, control bytes and units separately from storage structure.
- Separate observed fields from inferred meaning; retain unknown bytes/commands.
- Add a minimal synthetic fixture and real-corpus checks before claiming support.
- Validate truncation, invalid ranges, decompression bounds and unsupported variants explicitly.
- For media, compare decoded pixels/glyphs/frames; for indexes, compare keys and targets; for text, preserve byte provenance.

Future format tools should share a browser/Node TypeScript byte core, following the [existing tools](../../tools/README.md). Use established standard-format tooling when suitable rather than inventing a bespoke replacement.
