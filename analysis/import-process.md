# Dropbox to GitHub: provenance, curation and mapping

## Source and backup

Ben Shneiderman supplied the historical HyperTIES software, databases, media and
documents being used for this restoration. The repository owner provided this
Dropbox folder as the source/backup location on October 11, 2026:

[Dropbox](https://www.dropbox.com/) holds the original collection. Its shared-folder
URL is intentionally omitted: the `rlkey` parameter is an access-bearing sharing
key, and the path also contains opaque share identifiers. No key or share
identifier is included in this document. Obtain the access link privately from
the repository owner.

The link was supplied by the owner, not fetched or independently verified. This
process did not change Dropbox files or sharing settings. The Dropbox collection
is the preservation copy; GitHub is intended to hold a selected, understandable
restoration corpus, not a mirror of that folder.

**Sharing caveat:** the source may include personal material omitted from public
GitHub. A folder link can grant access beyond the files we select here. Before
publishing this document, confirm the link's scope and sharing permissions; a
separate public source folder may be appropriate. No claim is made that the full
Dropbox folder is privacy-cleared.

## Philosophy

- Preserve knowledge and restoration evidence, not repeated packaging.
- Prefer authored articles, styles, graphic definitions, indexes and original
  media over reconstructing an obsolete development environment.
- Keep distinct executables as optional evidence for recovering undocumented
  formats, missing information and algorithms. We will **not rebuild with the old
  tools**. Repeated copies or MZ-padding-only variants add no useful evidence.
- Remove proven duplicates only after identifying and checking their surviving
  counterpart. Discard Mac metadata without maintaining redundant copies.
- Different hashes do not necessarily mean interesting differences; equal hashes
  do not prove a file's separate path is unnecessary for a particular renderer.
- Keep meaningful editions and unresolved packed formats until semantic export
  or rendering comparisons justify consolidation.
- Treat inventory, deletion and rearrangement as separate operations, with
  explicit maps connecting the original layout to the curated one.
- Use ordinary Git, not LFS. Optional downloadable runtimes and regenerable
  derivatives need not live in every corpus directory.

## Work completed

### 1. Survey before deletion

The initial survey recorded 5,448 regular files totaling 68,664,843 bytes
(65.48 MiB), excluding Git storage and the analysis directory. It recorded sizes,
SHA-256 checksums, filesystem dates, file signatures, directory membership,
duplicate groups and archive members.

ZIP members were decompressed in memory, length/CRC checked and SHA-256 compared
with loose files. Related database trees and executable variants were compared
separately. The format catalog labels verified structures, plausible meanings and
unresolved formats rather than trusting every `file` signature.

### 2. Clear staging

At the owner's request, all previously staged files were unstaged without
changing their contents. No raw-dump commit was created. Selective staging and
publication remain deferred until sorting is complete.

### 3. Apply approved deduplication

With the owner's approval on October 11, 2026, the cleanup removed:

| Removal | Why it was safe for this restoration |
|---|---|
| Entire former `HypertiesDatabases-minusFamily` distribution | Substantive loose contents had top-level counterparts; the richer top-level editions were retained. All three embedded ZIPs added only duplicate content or Mac metadata. |
| All surveyed `.DS_Store` files | Finder metadata, not application content. |
| Repeated ECS/Ogawa content and README | All 264 Ogawa payload files were identical; retained under [ht30glos/ogawa](../corpus/hyperties-demos/ht30glos/ogawa). README retained under [ht30glos](../corpus/hyperties-demos/ht30glos). |
| ECS author/browser/UPDATE padding variants | Common executable bytes differed only in MZ header byte-length field and trailing zeros; [ht30glos tools](../corpus/hyperties-demos/ht30glos) retained. |
| Other byte-identical `.EXE` / `.COM` copies | One nonprivate-path copy retained for each distinct executable group. |

**2,919 files / 35,922,491 bytes (34.26 MiB) were removed.** The resulting inventory
contains 2,529 files, including the root README, and about 31.23 MiB outside the
analysis directory. Exact byte totals vary with edits to that README; historical
file payload excluding the README is **32,742,340 bytes**.

There are now **16 executable files in 16 distinct content groups**, totaling
2,953,517 bytes. Nothing genuinely distinct was discarded merely because it was
old or opaque.

The [ECS launcher](../corpus/hyperties-demos/ecs/ecs.bat) was retained as dependency evidence; ECS is now
a launcher-only directory. Old batch files are historical records, **not a
supported runnable distribution**: some no longer have a local executable after
shared copies were removed.

### 4. Preserve the import map and verify

The local `deduplication-log.json` records each removed path, original size/hash,
reason, retained counterpart/hash, and whether equivalence was exact,
padding-only, archive-member-based or discarded metadata. It records start and
completion status so a failed/partial operation cannot masquerade as success.

Pre-cleanup inventories and research evidence were saved under local
`before-dedup/`; they preserve useful original timestamps and comparisons without
copying the entire archive again. These raw maps are Git-ignored because they
also enumerate excluded personal filenames. The public narrative is this
document; a public per-file map should exclude personal entries.

All original historical files were checksum-checked before cleanup. Deletion
used explicitly listed regular files and then inspected empty directories, not
a broad recursive removal. Retained counterparts were checked after deletion.
The current inventory, checksums, directory map and remaining recommendations
were regenerated.

The verifier reconciles the new inventory against the old inventory and removal
journal: every missing file must be authorized; every retained historical file
must remain byte-identical. README edits are reported separately from historical
content changes. The cleaned, reorganized collection was then committed as the
first full publication, so no raw archive dump exists in Git history.

## What remains deliberately unresolved

- **49 duplicate groups / 64 extra copies / 525,246 bytes** remain, mostly shared
  content/media/fixtures. Removing them now without edition/asset maps could
  break references. They are good phase-two modularization candidates.
- HTUIS/HTUISM and TOUR30/TOUR7_91 contain meaningful changed files. Preserve
  editions or overlays until parsed/rendered comparisons establish what matters.
- Old/new museum databases are complementary source and later packed/media
  evidence, not proven duplicates.
- The remaining HTUISM ARC has matching member names/sizes but has not been
  decompressed and SHA-256 verified; it was not deleted.
- Opaque packed stores, fonts, indexes and damaged article fixtures remain where
  potentially useful.
- Personal genealogy is not public museum history. The owner now requests its
  source and navigation documents for Ben's review; logs remain excluded.
  [Provenance, privacy and the superseded exclusion policy](family-review.md)
  are recorded separately. Only its duplicated browser was removed.
- Windows shortcut/PIF, remaining scratch files and logs have recommendations,
  but were not swept away under permission to remove redundant trees/programs.

## Phase two: modularize and rearrange

The first reorganization is complete: intact collections moved under
subject-grouped `corpus/`, and reference documents under `reference/`.
All 2,528 historical files were hash-verified unchanged; authored navigation,
runtime adapters and tests were updated. See the [layout/path map](../docs/layout.md)
and [public source checksums](../manifests/README.md).
Shared-asset consolidation and edition overlays remain future work:

1. **Corpus editions:** one canonical authored tree per selected database;
   meaningful edition deltas become overlays rather than complete extra copies.
2. **Shared media/fonts:** stable, human-readable assets with hashes and per-corpus
   reference maps. Two different original filenames can map to one stored asset.
3. **Format modules:** article/index parsing, packed-store extraction, style and
   graphics grammar, image/font decoding, and rendering as separate components.
4. **Optional research runtimes:** one copy per required binary plus a
   database-to-runtime mapping. Preserve evidence without pretending to rebuild
   or depend on the historical toolchain.
5. **Test fixtures:** a small selection of representative and malformed records,
   with expected parse/render outcomes, not every scratch directory.
6. **Access derivatives:** UTF-8 text, PNG and animation exports generated from
   originals, kept distinct from byte-faithful source records.

Before moving files, create an original-path to curated-path mapping, update
references through import logic, and test resolution of articles, aliases,
styles, media and actions. Do not use hardlinks as the Git organization model:
Git does not preserve hardlink identity. Avoid symlink forests that obscure
provenance or complicate cross-platform use.

The **publication-only** source checksum manifest now covers 2,513 selected
historical files. Review selected paths before explicit staging. Family source
is included at the owner's request for Ben's review; raw logs, backups, per-user
settings and local audit manifests remain excluded.

## Related guides

- [Survey overview and tools](README.md)
- [Remaining curation decisions](curation.md)
- [Format catalog](formats.md)
- [Publication review](publication-review.md)
- [GitHub/restoration strategy](github-and-restoration.md)
