<!-- Generated format registry: analysis/document-formats.mjs -->
# REFER.TIE authoring references

[All file types](README.md) · [Format overview](../formats.md)

| Property | Current assessment |
|---|---|
| Classification | bespoke |
| Definition status | Definition placeholder |
| Confidence | Unresolved schema |

## Identification and observed structure

The manual identifies reference/editing data as unnecessary once editing is finished. Serialization and relation to article reference sections still need definition.

This is an evidence-backed working definition, not a complete vendor specification. A suffix or generic magic match is not enough to select a decoder. Do not modify original bytes to make them fit a hypothesis.

## Analysis and implementation

- [Detailed analysis](../../analysis/formats.md)
- No dedicated verified decoder is registered yet.

## Retained publication examples

- [corpus/books-and-literature/ACM/REFER.TIE](../../corpus/books-and-literature/ACM/REFER.TIE)
- [corpus/books-and-literature/CACM-Hypertext Conference issue July 1988/refer.tie](../../corpus/books-and-literature/CACM-Hypertext%20Conference%20issue%20July%201988/refer.tie)
- [corpus/books-and-literature/cr/refer.tie](../../corpus/books-and-literature/cr/refer.tie)
- [corpus/books-and-literature/horror/refer.tie](../../corpus/books-and-literature/horror/refer.tie)
- [corpus/books-and-literature/red-mask/refer.tie](../../corpus/books-and-literature/red-mask/refer.tie)
- [corpus/hyperties-demos/hat/hat-db/refer.tie](../../corpus/hyperties-demos/hat/hat-db/refer.tie)

## Tool work item

P1: compare references with article link order and authoring behavior.

## Definition work still required

- Specify dispatch rules, supported versions, field widths, byte order and boundaries where applicable.
- Record text encoding, control bytes and units separately from storage structure.
- Separate observed fields from inferred meaning; retain unknown bytes/commands.
- Add a minimal synthetic fixture and real-corpus checks before claiming support.
- Validate truncation, invalid ranges, decompression bounds and unsupported variants explicitly.
- For media, compare decoded pixels/glyphs/frames; for indexes, compare keys and targets; for text, preserve byte provenance.

Future format tools should share a browser/Node TypeScript byte core, following the [existing tools](../../tools/README.md). Use established standard-format tooling when suitable rather than inventing a bespoke replacement.
