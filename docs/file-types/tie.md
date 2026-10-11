<!-- Generated format registry: analysis/document-formats.mjs -->
# .tie: Classic database family: multiple schemas

[All file types](README.md) · [Format overview](../formats.md)

| Property | Current assessment |
|---|---|
| Classification | bespoke |
| Definition status | Mixed: tested indexes/LZW/arithmetic and unresolved stores |
| Confidence | Role-dependent |

## Identification and observed structure

INDEX.TIE, BIGFILE.TIE, BIGRAPH.TIE, GINDEX.TIE, REFER.TIE and COMMON.TIE have different roles. Never dispatch every .TIE file to one parser.

This is an evidence-backed working definition, not a complete vendor specification. A suffix or generic magic match is not enough to select a decoder. Do not modify original bytes to make them fit a hypothesis.

## Analysis and implementation

- [Detailed analysis](../../analysis/packed-format.md)
- [Existing implementation](../../tools/src/packed.ts)

### Named schemas

- [INDEX.TIE legacy index](index-tie.md)
- [BIGFILE.TIE packed articles](bigfile-tie.md)
- [Adaptive arithmetic packed-article codec](arithmetic.md)
- [BIGRAPH.TIE packed graphics](bigraph-tie.md)
- [GINDEX.TIE graphics index](gindex-tie.md)
- [REFER.TIE authoring references](refer-tie.md)
- [COMMON.TIE shared/runtime data](common-tie.md)

## Retained publication examples

- [corpus/books-and-literature/ACM/BIGFILE.TIE](../../corpus/books-and-literature/ACM/BIGFILE.TIE)
- [corpus/books-and-literature/ACM/BIGRAPH.TIE](../../corpus/books-and-literature/ACM/BIGRAPH.TIE)
- [corpus/books-and-literature/ACM/COMMON.TIE](../../corpus/books-and-literature/ACM/COMMON.TIE)
- [corpus/books-and-literature/ACM/GINDEX.TIE](../../corpus/books-and-literature/ACM/GINDEX.TIE)
- [corpus/books-and-literature/ACM/INDEX.TIE](../../corpus/books-and-literature/ACM/INDEX.TIE)
- [corpus/books-and-literature/ACM/REFER.TIE](../../corpus/books-and-literature/ACM/REFER.TIE)

## Tool work item

P0: graphics extraction, reference schemas and additional corpus validation; both book codecs are recovered.

## Definition work still required

- Specify dispatch rules, supported versions, field widths, byte order and boundaries where applicable.
- Record text encoding, control bytes and units separately from storage structure.
- Separate observed fields from inferred meaning; retain unknown bytes/commands.
- Add a minimal synthetic fixture and real-corpus checks before claiming support.
- Validate truncation, invalid ranges, decompression bounds and unsupported variants explicitly.
- For media, compare decoded pixels/glyphs/frames; for indexes, compare keys and targets; for text, preserve byte provenance.

Future format tools should share a browser/Node TypeScript byte core, following the [existing tools](../../tools/README.md). Use established standard-format tooling when suitable rather than inventing a bespoke replacement.
