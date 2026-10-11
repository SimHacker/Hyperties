<!-- Generated format registry: analysis/document-formats.mjs -->
# .pcl: HP Printer Command Language

[All file types](README.md) · [Format overview](../formats.md)

| Property | Current assessment |
|---|---|
| Classification | standard |
| Definition status | Recognized command family |
| Confidence | High |

## Identification and observed structure

ESC-based raster commands in hpguide/hplogo.pcl identify a printer stream.

This is an evidence-backed working definition, not a complete vendor specification. A suffix or generic magic match is not enough to select a decoder. Do not modify original bytes to make them fit a hypothesis.

## Analysis and implementation

- [Detailed analysis](../../analysis/formats.md)
- No dedicated verified decoder is registered yet.

## Retained publication examples

- [corpus/subject-and-institutional/hpguide/hplogo.pcl](../../corpus/subject-and-institutional/hpguide/hplogo.pcl)

## Tool work item

P2: use a bounded PCL interpreter for access previews rather than sending to a printer.

## Definition work still required

- Specify dispatch rules, supported versions, field widths, byte order and boundaries where applicable.
- Record text encoding, control bytes and units separately from storage structure.
- Separate observed fields from inferred meaning; retain unknown bytes/commands.
- Add a minimal synthetic fixture and real-corpus checks before claiming support.
- Validate truncation, invalid ranges, decompression bounds and unsupported variants explicitly.
- For media, compare decoded pixels/glyphs/frames; for indexes, compare keys and targets; for text, preserve byte provenance.

Future format tools should share a browser/Node TypeScript byte core, following the [existing tools](../../tools/README.md). Use established standard-format tooling when suitable rather than inventing a bespoke replacement.
