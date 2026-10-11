<!-- Generated format registry: analysis/document-formats.mjs -->
# .arc: Classic ARC archive, method 8

[All file types](README.md) · [Format overview](../formats.md)

| Property | Current assessment |
|---|---|
| Classification | standard |
| Definition status | Header inspection only |
| Confidence | High container; unverified contents |

## Identification and observed structure

Header inspection finds 33 members, dynamic-LZW method 8 and CRC16 fields. Names/sizes match loose candidates; decompression/hash equivalence remains unverified.

This is an evidence-backed working definition, not a complete vendor specification. A suffix or generic magic match is not enough to select a decoder. Do not modify original bytes to make them fit a hypothesis.

## Analysis and implementation

- [Detailed analysis](../../analysis/formats.md)
- [Existing implementation](../../analysis/inspect.mjs)

## Retained publication examples

- [corpus/hyperties-demos/htuism/htuism.arc](../../corpus/hyperties-demos/htuism/htuism.arc)

## Tool work item

P1: implement/adapt a real method-8 decoder; validate length and CRC16 before deduplication.

## Definition work still required

- Specify dispatch rules, supported versions, field widths, byte order and boundaries where applicable.
- Record text encoding, control bytes and units separately from storage structure.
- Separate observed fields from inferred meaning; retain unknown bytes/commands.
- Add a minimal synthetic fixture and real-corpus checks before claiming support.
- Validate truncation, invalid ranges, decompression bounds and unsupported variants explicitly.
- For media, compare decoded pixels/glyphs/frames; for indexes, compare keys and targets; for text, preserve byte provenance.

Future format tools should share a browser/Node TypeScript byte core, following the [existing tools](../../tools/README.md). Use established standard-format tooling when suitable rather than inventing a bespoke replacement.
