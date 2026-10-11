<!-- Generated format registry: analysis/document-formats.mjs -->
# .hnc: Later index companion HNC

[All file types](README.md) · [Format overview](../formats.md)

| Property | Current assessment |
|---|---|
| Classification | bespoke |
| Definition status | Definition placeholder |
| Confidence | Medium |

## Identification and observed structure

Headers and key-family strings suggest a related catalog/index. Exact fields and lookup relationship remain unresolved.

This is an evidence-backed working definition, not a complete vendor specification. A suffix or generic magic match is not enough to select a decoder. Do not modify original bytes to make them fit a hypothesis.

## Analysis and implementation

- [Detailed analysis](../../analysis/formats.md)
- No dedicated verified decoder is registered yet.

## Retained publication examples

- [corpus/hyperties-demos/tour30/about.hnc](../../corpus/hyperties-demos/tour30/about.hnc)
- [corpus/hyperties-demos/tour7_91/about.hnc](../../corpus/hyperties-demos/tour7_91/about.hnc)
- [corpus/museum/newmjh/ENC.HNC](../../corpus/museum/newmjh/ENC.HNC)
- [corpus/subject-and-institutional/frame/attguide.hnc](../../corpus/subject-and-institutional/frame/attguide.hnc)

## Tool work item

P0: map keys and records to the common database stem; do not guess the acronym.

## Definition work still required

- Specify dispatch rules, supported versions, field widths, byte order and boundaries where applicable.
- Record text encoding, control bytes and units separately from storage structure.
- Separate observed fields from inferred meaning; retain unknown bytes/commands.
- Add a minimal synthetic fixture and real-corpus checks before claiming support.
- Validate truncation, invalid ranges, decompression bounds and unsupported variants explicitly.
- For media, compare decoded pixels/glyphs/frames; for indexes, compare keys and targets; for text, preserve byte provenance.

Future format tools should share a browser/Node TypeScript byte core, following the [existing tools](../../tools/README.md). Use established standard-format tooling when suitable rather than inventing a bespoke replacement.
