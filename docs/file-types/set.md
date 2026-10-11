<!-- Generated format registry: analysis/document-formats.mjs -->
# .set: Runtime/editor settings

[All file types](README.md) · [Format overview](../formats.md)

| Property | Current assessment |
|---|---|
| Classification | bespoke |
| Definition status | Observed text |
| Confidence | High |

## Identification and observed structure

Text settings include editor, edits filename, username, date format and options. Currently Git-ignored as per-user state, not deleted.

This is an evidence-backed working definition, not a complete vendor specification. A suffix or generic magic match is not enough to select a decoder. Do not modify original bytes to make them fit a hypothesis.

## Analysis and implementation

- [Detailed analysis](../../analysis/publication-review.md)
- No dedicated verified decoder is registered yet.

## Retained publication examples

No retained publication example. This type was found during the survey but its files are removed packaging or currently excluded operational state.

## Tool work item

P2: document key grammar and create synthetic fixtures without copying personal state.

## Definition work still required

- Specify dispatch rules, supported versions, field widths, byte order and boundaries where applicable.
- Record text encoding, control bytes and units separately from storage structure.
- Separate observed fields from inferred meaning; retain unknown bytes/commands.
- Add a minimal synthetic fixture and real-corpus checks before claiming support.
- Validate truncation, invalid ranges, decompression bounds and unsupported variants explicitly.
- For media, compare decoded pixels/glyphs/frames; for indexes, compare keys and targets; for text, preserve byte provenance.

Future format tools should share a browser/Node TypeScript byte core, following the [existing tools](../../tools/README.md). Use established standard-format tooling when suitable rather than inventing a bespoke replacement.
