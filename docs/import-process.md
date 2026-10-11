# From Ben's archive to a useful GitHub collection

[Back to the welcome page](README.md)

## Provenance and backup

Ben Shneiderman supplied the historical software, databases, media and documents.
The repository owner retains the original collection on Dropbox. The private
shared-folder URL, access-bearing query key and opaque sharing identifiers are
intentionally **not published**.

The link was supplied privately, not fetched or independently verified by this
process. Dropbox files and sharing settings were not changed. Access should be
obtained privately from the owner; the original backup is not automatically a
privacy-cleared public dataset.

## Philosophy

GitHub should be a comprehensible restoration collection, not another backup.

- Prefer authored source records, styles, links and media.
- Remove packaging that adds no useful information.
- Retain distinct binaries for rescuing missing formats or algorithms; do not
  depend on rebuilding with historical tools.
- Preserve meaningful editions and uncertainty.
- Map original paths to retained counterparts before deletion or rearrangement.
- Separate original bytes, decoded access text and modern interpretation.
- Publish private-safe catalogs, not raw manifests of every personal filename.
- Use ordinary Git; this archive does not need LFS.

## Completed work, October 11, 2026

| Stage | Outcome |
|---|---|
| Original survey | 5,448 files / 65.48 MiB, with sizes, SHA-256, dates and format signatures |
| Exact duplicate analysis | 31.44 MiB of extra byte-identical copies identified |
| Approved cleanup | 2,919 files / 34.26 MiB removed |
| Remaining collection | 2,529 files / approximately 31.23 MiB, excluding generated tools/reports |
| Historical executables | 16 distinct groups, each retained once |
| Remaining shared content | 49 duplicate groups / 64 extra copies / about 0.50 MiB |
| Semantic recovery | Article/index catalog; all 248 book records decoded with two verified codecs; 402 museum articles in the published reading room |

The root README changes during documentation work, so exact current byte totals
vary. Historical payload excluding that README is 32,742,340 bytes.

### Removed

- The redundant nested database distribution and its three ZIPs: all substantive
  content had retained counterparts; archive-only exceptions were Mac metadata.
- Finder `.DS_Store` metadata.
- Repeated ECS/Ogawa payload and duplicate README.
- Three ECS executable variants differing only in MZ length fields and zero
  padding.
- Other byte-identical EXE/COM copies, retaining one distinct copy each.

### Retained

Distinct programs, source records, opaque packed data, meaningful editions,
media and representative malformed records remain locally. The ECS launcher is
retained as dependency evidence; the old distribution is not promised runnable
unchanged after duplicate executable copies were removed.

The personal [family-history source](../corpus/personal-history/family/README.md) is included at the
owner's request for Ben's early review, superseding the initial exclusion
recommendation. Its [provenance and privacy review](../analysis/family-review.md)
remains open. Raw logs and full local audit manifests are excluded.
Public museum history is a separate corpus.

### Verification and history

The local journal records removed path, original hash, reason and retained
counterpart/hash. Pre-cleanup inventories preserve dates and comparisons.
Retained historical files are checked against original hashes, and every absent
file must correspond to an approved removal.

Previously staged raw files were unstaged at the owner's request. No raw archive
dump was committed. This GitHub publication includes explicitly selected originals, reference
documents, collection navigation and restoration tools. Raw logs, per-user
settings and private audit outputs remain excluded. Family source is the
explicit review exception described above; it is not certified privacy-cleared.

## Next: modularize without losing meaning

Intact collections have now moved into subject-grouped `corpus/`, with manuals
and museum documents under `reference/`. All 2,528 retained historical files
were SHA-256 verified unchanged. The [layout and original-path map](layout.md),
[version view](by-version.md), [storage view](by-storage.md) and
[publication checksums](../manifests/README.md) document this step.
The [future NeWS/webtop integration](future-integration.md) is recorded but not
performed. Further modularization remains proposed:

1. Canonical corpus editions, with meaningful overlays rather than copied trees.
2. Shared media/fonts with original-name-to-asset maps.
3. Shared TypeScript format modules for Node and browsers.
4. Optional research binaries with corpus/version mappings.
5. Small representative test fixtures.
6. Regenerable access derivatives separate from original records.

Before moves, build a path map and test article, alias, style and media
resolution. Git does not preserve hardlink identity; a hardlink forest is not
the organization strategy. We will not collapse uncertain variants simply
because their bytes differ or their names resemble each other.
