<!-- Generated format registry: analysis/document-formats.mjs -->
# .sys: Hyperties configuration

[All file types](README.md) · [Format overview](../formats.md)

| Property | Current assessment |
|---|---|
| Classification | bespoke |
| Definition status | Observed text subset |
| Confidence | High for TIES.SYS text; mixed otherwise |

## Identification and observed structure

TIES.SYS text samples use key = value for colors and paths. BACK.SYS/BUP.SYS and binary members need separate inspection. Not automatically DOS kernel drivers.

This is an evidence-backed working definition, not a complete vendor specification. A suffix or generic magic match is not enough to select a decoder. Do not modify original bytes to make them fit a hypothesis.

## Analysis and implementation

- [Detailed analysis](../../analysis/formats.md)
- No dedicated verified decoder is registered yet.

## Retained publication examples

- [corpus/books-and-literature/ACM/TIES.SYS](../../corpus/books-and-literature/ACM/TIES.SYS)
- [corpus/books-and-literature/CACM-Hypertext Conference issue July 1988/ties.sys](../../corpus/books-and-literature/CACM-Hypertext%20Conference%20issue%20July%201988/ties.sys)
- [corpus/books-and-literature/HHO-Hypertext on Hypertext book-1988/ties.sys](../../corpus/books-and-literature/HHO-Hypertext%20on%20Hypertext%20book-1988/ties.sys)
- [corpus/books-and-literature/cr/ties.sys](../../corpus/books-and-literature/cr/ties.sys)
- [corpus/books-and-literature/sigchi/ties.sys](../../corpus/books-and-literature/sigchi/ties.sys)
- [corpus/hyperties-demos/hat/hat-db/ties.sys](../../corpus/hyperties-demos/hat/hat-db/ties.sys)

## Tool work item

P1: lossless settings parser with unknown-key retention and binary dispatch guards.

## Definition work still required

- Specify dispatch rules, supported versions, field widths, byte order and boundaries where applicable.
- Record text encoding, control bytes and units separately from storage structure.
- Separate observed fields from inferred meaning; retain unknown bytes/commands.
- Add a minimal synthetic fixture and real-corpus checks before claiming support.
- Validate truncation, invalid ranges, decompression bounds and unsupported variants explicitly.
- For media, compare decoded pixels/glyphs/frames; for indexes, compare keys and targets; for text, preserve byte provenance.

Future format tools should share a browser/Node TypeScript byte core, following the [existing tools](../../tools/README.md). Use established standard-format tooling when suitable rather than inventing a bespoke replacement.
