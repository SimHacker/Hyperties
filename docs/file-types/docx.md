<!-- Generated format registry: analysis/document-formats.mjs -->
# .docx: Office Open XML document

[All file types](README.md) · [Format overview](../formats.md)

| Property | Current assessment |
|---|---|
| Classification | standard |
| Definition status | Recognized standard |
| Confidence | High |

## Identification and observed structure

ZIP-based Wordprocessing XML with body and core creator/date properties. Later museum text/provenance document.

This is an evidence-backed working definition, not a complete vendor specification. A suffix or generic magic match is not enough to select a decoder. Do not modify original bytes to make them fit a hypothesis.

## Analysis and implementation

- [Detailed analysis](../../analysis/timeline.md)
- No dedicated verified decoder is registered yet.

## Retained publication examples

- [reference/museum/oldmjh-Texts from Austria and the Holocaust.docx](../../reference/museum/oldmjh-Texts%20from%20Austria%20and%20the%20Holocaust.docx)

## Tool work item

Use existing OOXML readers; preserve attribution and distinguish document dates from corpus dates.

## Definition work still required

- Specify dispatch rules, supported versions, field widths, byte order and boundaries where applicable.
- Record text encoding, control bytes and units separately from storage structure.
- Separate observed fields from inferred meaning; retain unknown bytes/commands.
- Add a minimal synthetic fixture and real-corpus checks before claiming support.
- Validate truncation, invalid ranges, decompression bounds and unsupported variants explicitly.
- For media, compare decoded pixels/glyphs/frames; for indexes, compare keys and targets; for text, preserve byte provenance.

Future format tools should share a browser/Node TypeScript byte core, following the [existing tools](../../tools/README.md). Use established standard-format tooling when suitable rather than inventing a bespoke replacement.
