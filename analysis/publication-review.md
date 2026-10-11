# Publication review: privacy, not indiscriminate archiving

You confirmed that **Ben owns the Cognetics rights**. That is recorded as user-supplied authorization and is **not a blocker** for the Hyperties software/manual. The historical license language found in the manual is useful provenance but does not override your confirmation of the current rights situation. No external legal/ownership research was performed.

This review identifies private personal data and accidental inclusion of logs/machine state. The owner subsequently requested inclusion of the family source for Ben's review; see the [current decision and limitations](family-review.md). Third-party papers, books, photos and music-related material should be assessed separately from engine rights; do not blanket-label all historical content as newly authored open-source code.

**The private genealogy finding is not the Holocaust museum material.** [oldmjh](../corpus/museum/oldmjh) and [newmjh](../corpus/museum/newmjh) are public historical museum-information corpora, as you clarified, and are retained as restoration candidates. The separate [family](../corpus/personal-history/family) directory is the personal-family database.

## Confirmed public-repo exclusions

| Material | Finding | Action |
|---|---|---|
| [family](../corpus/personal-history/family/README.md), originally 79 files / 252,031 bytes | Personal genealogy with exact birth/christening dates, relationships and family narratives, including people who may still be living. Session logs record browsing behavior and content excerpts. The repeated browser was removed; 78 files / 155,324 bytes remain locally. | **Source included for Ben's review at the owner's request; logs excluded.** This supersedes the initial whole-directory exclusion recommendation, not the privacy finding. [Review notes](family-review.md). |
| Raw audit reports | `inventory`, `checksums`, `duplicates`, `research` and `curation manifest` enumerate private filenames/hashes or review leads even when no prose content is copied. | Keep local; [analysis ignore rules](.gitignore) exclude generated outputs. Generate a new public manifest from the curated, approved dataset instead. |
| `Music shortcut` | Unrelated Windows shortcut with local-path metadata. | Omit. |
| `.DS_Store`, AppleDouble sidecars | Operating-system view/path/resource metadata. | Omit all; not application content. |
| Raw family and authoring logs | Private browsing data in family; identical tour logs expose an old local home path and repetitive import state. | Exclude logs. Replace tour logs with a short diagnostic summary if needed. |

## Review leads, not automatic redactions

- Historical author contact details in [CACM](../corpus/books-and-literature/CACM-Hypertext%20Conference%20issue%20July%201988), [HTUIS](../corpus/hyperties-demos/htuis), [SIGCHI](../corpus/books-and-literature/sigchi) and [other literature indexes](../corpus/subject-and-institutional/toronto) generally look like publication/professional contacts. A historical public business phone/email is not automatically a leaked secret. Keep source context; avoid publishing extracted contact lists.
- [cmsc](../corpus/subject-and-institutional/cmsc), [redsk](../corpus/subject-and-institutional/redsk), [rogers](../corpus/subject-and-institutional/rogers), [usna](../corpus/subject-and-institutional/usna), and historical museum biographies contain names or life events as subject matter. Name detection is not grounds to erase an entire historical corpus.
- [AIDS](../corpus/subject-and-institutional/AIDS) appears to be a library/subject-navigation database, not a private patient record system. However, the audit did not fully decode every packed database or OCR every image, so this is **not clinical-data clearance**.
- `default settings` contain a historical user/editor identity and an edits filename. Other settings and binary companion stores may have local-system strings. Review them before publication; remove unneeded per-user state instead of rewriting historical source blindly.
- `.HOL` companions contain outline-like text and DOS directory-like records in samples. Their exact structure and any unused storage residues remain unresolved. Review/export packed formats before assuming all embedded bytes are intended published content.
- The [later DOCX](../reference/museum/oldmjh-Texts%20from%20Austria%20and%20the%20Holocaust.docx) core properties name its creator/last editor. This matches the supplied provenance and is not inherently private. Its body/header date discrepancy is noted in [timeline](timeline.md).

## Credential scan

The local [inspection script](inspect.mjs) checked every distinct loose-file content as raw bytes for:

- PEM/OpenSSH private-key markers;
- GitHub token prefixes;
- AWS access-key patterns;
- password/API-key/token assignment patterns;
- email, telephone and personal-life-event patterns as review leads.

**No private-key, GitHub-token, AWS-key, or credential-assignment pattern matched.**
The original survey had five email-matching content blobs, 11 phone matches and
68 personal-life-event matches. The current raw-file scan has four email matches,
11 phone matches and 68 life-event matches. These include historical publications
and false positives, not confirmed privacy issues. The supplied Dropbox access
URL is omitted from repository documents, including its query key and opaque
path identifiers.

Limitations:

- Raw-byte scan does not decompress all packed stores, parse DOCX as part of the scanner, decode ARC members, or OCR images/PDFs.
- Manual PDF text and DOCX body/core metadata were separately inspected locally. This is not a complete page-by-page privacy review.
- Packed `.TIE`/`.HDT` and image material need further review once decoded.
- A regex clean result is **not** a security/privacy guarantee.

No content was uploaded to an external scanner, service, language-search index, or website. Originals were not executed.

## Public documentation policy

Publish corpus descriptions, format schemas, restoration code, selected cleared fixtures and a sanitized provenance timeline. Do not publish the original full-path manifest as a badge of archival completeness: it is not needed for your goals.

Where third-party content permission remains uncertain, document what exists and keep the data on Dropbox/private storage until a decision is made. For the Cognetics software/manual, proceed on your confirmation of Ben's rights. Keep copyright/author attribution metadata with selected content; license new restoration code separately from historical publications and media.
