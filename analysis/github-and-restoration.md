# GitHub without LFS

Phase-one deduplication is now complete: 2,919 files / 34.26 MiB removed,
2,529 files / about 31.23 MiB remain outside analysis outputs, and all 16 distinct
executable groups are retained once. See [the import process](import-process.md)
for mappings and the source/backup policy. Estimates below describe the original
survey and initial proposals where explicitly stated.

## Recommended answer

Use **ordinary Git** for the curated corpus, documentation and restoration code. No LFS is necessary for this archive:

- Raw file payload is 65.48 MiB, and the largest individual file is only 5.46 MiB.
- Straightforward wrapper/private/junk exclusions bring the loose working-copy payload to about 34.58 MiB.
- The remaining ECS content duplication and repeated runtimes can reduce that further.
- Git stores identical blob contents once. Thirty byte-identical browser paths waste layout/maintenance and extraction space, but not thirty separate identical Git objects. The current Git object directory's 29 MiB reflects already-staged compressed objects, not 109 MiB of unique payload.

The familiar GitHub ordinary-Git single-file warning/block thresholds (50/100 MiB) are far above this largest file. These thresholds were not live-queried; they are not the basis of the recommendation. Repo usefulness and reviewability matter more than squeezing out every kilobyte.

### Put in ordinary Git

- New restoration/parser/rendering code, build/test configuration and documentation.
- A **selected** set of databases that actually support restoration milestones.
- Original readable-ish article/style/graphic definitions, indexes needed to resolve references, and media needed to reproduce those examples.
- One manual PDF, given your confirmation that Ben owns the Cognetics rights; a 5.7 MB PDF is not an LFS problem.
- A sanitized provenance/format/collection catalog and checksums of **published** files.
- A few unusual original binary fixtures for parser tests, with explicit expected failures for malformed records.
- Small stable binary formats such as PCX, GIF/FLI and packed-only database stores when needed. Ordinary Git handles these; don't sacrifice irreplaceable data for a text-only aesthetic.

### Keep on Dropbox / optionally publish as GitHub Release assets

- The original complete archive and original packaging histories.
- Optional emulator/runtime bundle, one binary per needed version and a database-to-runtime hash map.
- Lower-priority commercial/demo databases not yet used by the restoration.
- Bulky generated access videos/contact sheets or future large exports that users can regenerate.
- Private material: **Dropbox/private only**, not a public Release.

Releases are an optional download distribution channel, not LFS and not a reason to duplicate every archive on GitHub. Checksummed links are enough where the original already has a stable private/public location appropriate to its contents. Do not expose a personal Dropbox share that accidentally contains private sibling directories.

## Proposed curated layout

This is a **future layout**, not a directory move already performed:

```text
README.md
docs/
  collections.md
  formats.md
  timeline.md
  provenance.md
tools/
  inventory/
  import/
  render/
corpus/
  cacm-1988/
  hypertext-on-hypertext-1988/
  hyperties-3-preview/
  ecs-ogawa/
  museum-old/
  museum-new/
fixtures/
  article-records/
  styles-and-graphics/
  fonts/
  malformed/
runtime/
  README.md                 # optional downloads, version/hash mapping
manifests/
  SHA256SUMS                # curated/public files only
```

Keep article basenames and case as original unless a tested normalization/import map replaces them. Use a separate generated access layer rather than renaming referenced files ad hoc.

## Choosing runtime versions instead of hoarding variants

The `pre-cleanup runtime evidence` identified 19 exact
executable contents. Three ECS/Ogawa pairs differed only in MZ length field and
trailing zeros. All 16 remaining structurally distinct groups are now retained
once, **including** converter, player, installer and UPDATE/author tools.
Current evidence is in `research.json`.

Suggested runtime milestones:

1. One classic browser known to render the CACM corpus (114,725-byte variant).
2. One `browser2` when needed for a genuinely distinct old corpus.
3. One 3.0 Rubidium example and one Lanthanum tool set for style/index experiments.
4. A later `.HDT` browser needed for tour/museum verification.
5. AAPLAY only if testing original animation-launch behavior.

HHO/AIDS have other classic browser hashes; frame, HP, tours and new museum have named later versions. Retain optional downloads when compatibility actually requires them, not a complete default bundle merely because they differ. **No compatibility tests were run**, so deleting every version except the newest would be premature.

You confirmed Ben's Cognetics rights, so rights are not a reason to block those
tools. Their value is recovering missing information, algorithms and format
behavior; we will not rebuild with the old tools. Optional placement and
corpus-to-runtime maps are phase-two decisions. Historical local launchers may
no longer work unchanged after duplicate executable copies were removed.

## Publishing without LFS

All originals were **unstaged at your explicit request**. No selective staging has happened. Current documentation/scripts are also unstaged.

After sorting:

1. Apply only approved curation decisions; keep the original Dropbox source untouched.
2. Add root ignore rules for operational junk/private directories as appropriate to the chosen final layout. Do not mistake ignore rules for untracking.
3. Generate a public inventory from the curated layout, not this raw archive inventory.
4. Stage **explicit approved paths** with `git add -- <paths>`, not `git add .`.
5. Inspect `git diff --cached --stat` and `git diff --cached --name-only`.
6. Confirm no excluded private directory, logs, raw audit manifest or unrelated shortcut is staged.
7. Commit the curated state; no history rewrite is needed for material that was only staged and never committed.

Do not create a "raw archive dump" commit and delete the junk in the next commit: that leaves the private/unwanted content permanently in ordinary reachable history. Unstaging leaves unreachable previously staged blobs locally until normal Git cleanup, but ordinary push transfers reachable history, not all loose objects.

If a prior raw commit had actually been pushed, the remedy would be different: removing files in a later commit is insufficient. At inspection, local history contained only the initial README commit; remote history was not independently audited or changed.

## Git attributes and binary offsets

Do not apply broad line-ending normalization to `.FIL`, `.TIE`, `.ELB`, `.H*`, `.P`, `.S`, fonts or other unknown binary-like files: that would invalidate byte offsets/checksums. Use explicit binary/no-text attributes when curating those originals. Define text attributes separately for **new** UTF-8 exports and modern code.

Keep raw-byte identity separate from semantic/pixel identity:

- SHA-256: exact content equality.
- Parsed articles: title/body/links/style equality.
- Decoded images: dimensions, palette and pixel equality.
- Rendered UI: appearance, hotspots, navigation and search behavior.
- Executables: build/version and structural differences; MZ padding-only variants aren't interesting editions.

## Restoration order

1. Start with one classic loose-article corpus and strict `.FIL` parser plus index/alias resolution.
2. Render text and PCX, preserving links, screen graphics, offsets and encoding evidence.
3. Build format fixtures and a reference screenshot/navigation plan using optional isolated DOS runtimes.
4. Add text `.STL` / `.GRB` parsing, graphical links and layout.
5. Decode packed-only HHO/other `.TIE` corpora.
6. Export `.HDT`/`.ELB` families, compare editions semantically, collapse boring variants.
7. Add authoring/search, fonts, multilingual content, animations and printer output only where worthwhile.

This prioritizes a working reincarnation. It does not require reconstructing every historical installer, obsolete printer connection, local drive path or family-database browsing session.
