<!-- Generated format registry: analysis/document-formats.mjs -->
# .elb: Paged library/index family

[All file types](README.md) · [Format overview](../formats.md)

| Property | Current assessment |
|---|---|
| Classification | bespoke |
| Definition status | Definition placeholder |
| Confidence | Medium role; unresolved schema |

## Identification and observed structure

Binary headers, named keys such as artname and article/link/search filenames suggest indexed libraries. Page layout and key semantics remain incomplete.

This is an evidence-backed working definition, not a complete vendor specification. A suffix or generic magic match is not enough to select a decoder. Do not modify original bytes to make them fit a hypothesis.

## Analysis and implementation

- [Detailed analysis](../../analysis/formats.md)
- No dedicated verified decoder is registered yet.

## Retained publication examples

- [corpus/hyperties-demos/ht30glos/ai_artk.elb](../../corpus/hyperties-demos/ht30glos/ai_artk.elb)
- [corpus/hyperties-demos/ht30glos/ai_keyk.elb](../../corpus/hyperties-demos/ht30glos/ai_keyk.elb)
- [corpus/hyperties-demos/ht30glos/aindex.elb](../../corpus/hyperties-demos/ht30glos/aindex.elb)
- [corpus/hyperties-demos/ht30glos/header.elb](../../corpus/hyperties-demos/ht30glos/header.elb)
- [corpus/hyperties-demos/ht30glos/ogawa/ai_artk.elb](../../corpus/hyperties-demos/ht30glos/ogawa/ai_artk.elb)
- [corpus/hyperties-demos/ht30glos/ogawa/ai_keyk.elb](../../corpus/hyperties-demos/ht30glos/ogawa/ai_keyk.elb)

## Tool work item

P0: map headers/pages/keys and validate traversal bounds using multiple corpus samples.

## Definition work still required

- Specify dispatch rules, supported versions, field widths, byte order and boundaries where applicable.
- Record text encoding, control bytes and units separately from storage structure.
- Separate observed fields from inferred meaning; retain unknown bytes/commands.
- Add a minimal synthetic fixture and real-corpus checks before claiming support.
- Validate truncation, invalid ranges, decompression bounds and unsupported variants explicitly.
- For media, compare decoded pixels/glyphs/frames; for indexes, compare keys and targets; for text, preserve byte provenance.

Future format tools should share a browser/Node TypeScript byte core, following the [existing tools](../../tools/README.md). Use established standard-format tooling when suitable rather than inventing a bespoke replacement.
