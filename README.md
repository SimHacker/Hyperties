# HyperTIES: following the links again

Documenting and reincarnating the pioneering hypertext system developed at the
University of Maryland and distributed by Cognetics Corporation, using historical
software, databases, media and documents supplied by Ben Shneiderman.

## Start here

**[Read the recovered book and museum online: the HyperTIES reading room](https://hyperties.org/archive/reading-room/)**
— follow the links in *Hypertext on Hypertext* and the Holocaust museum
encyclopedia in your browser. Begin with
[the hypertext joke](https://hyperties.org/archive/reading-room/#book:EXAMPLFP).

**[Ben, welcome back — a five-minute tour](docs/README.md)**

**[Ben: preservation, reincarnation and the plans behind the work](docs/README.md#preservation-and-reincarnation-the-thinking-behind-the-work)**
— not just a technical report: why we preserve paths, previews and authored
relationships, how the archive is mapped, and how recovered material can become
standalone publications and part of a living HyperTIES. Your historical and
design perspective should help shape this work.

The [Cabinet manifesto](https://github.com/SimHacker/WillWrightShowForFood/blob/main/packages/cabinet/MANIFESTO.md)
expresses a shared intention: honor the originals while making access,
interaction and possibilities better than the old technology allowed.
Historical fidelity does not require perpetuating historical limitations.

**[Heinz, museums, and bringing the people back into the picture](docs/README.md#heinz-museums-and-bringing-the-people-back-into-the-picture)**
— Don's related PIXIE/PDP-7 restoration, the free-use invitation to museums,
and plans to recreate machines, sounds and embodied interaction with animated
operators. HyperTIES belongs to the same mission: tribute, accessibility and fun.

Top-level layers: [corpus](corpus/README.md), [reference](reference/README.md),
[docs](docs/README.md), [analysis](analysis/README.md) and [tools](tools/README.md).
Use the [repository index](INDEX.md), [layout/path map](docs/layout.md),
[version view](docs/by-version.md) or [storage view](docs/by-storage.md) to
follow overlapping classifications without fragmenting historical databases.
The [future NeWS/webtop integration notes](docs/future-integration.md) keep room
for Don's edition and modern application stack without migrating them now.

| Guide | What you will find |
|---|---|
| [Two crown jewels and a hypertext joke](docs/discoveries.md) | Recovered branching structure, the book, and historical museum navigation |
| [Formats and verified recovery](docs/formats.md) | Byte-level definitions, shared TypeScript readers, and explicit unknowns |
| [Complete file-type registry](docs/file-types/README.md) | All surveyed types: standards, bespoke formats, unknowns and tool work items |
| [Dropbox-to-GitHub import process](docs/import-process.md) | Provenance, backup policy, approved cleanup, mapping and organization philosophy |
| [Architecture and conversion philosophy](docs/architecture.md) | One reusable core for conversion and readers; originals remain the source of truth |
| [Publication and future integration plans](docs/future-integration.md) | Standalone nuggets, transclusion, and future NeWS/webtop connections |
| [Crown-jewel restoration intentions](analysis/crown-jewels.md) | Preserve authored interactions, historical framing and meaningful editions |
| [Source collection catalog](docs/collections.md) | Every retained collection, with layered summaries and file-level indexes |
| [Detailed technical survey](analysis/README.md) | Format research, recovery scripts, source evidence and verification |
| [Shared TypeScript tools](tools/README.md) | Browser/Node byte readers, LZW decoder, build and tests |

These Markdown pages render directly on GitHub. The repository includes selected
historical originals, reference documents and modern restoration tools.
Each source collection provides `GLANCE.yml`, `README.md` and `INDEX.md` layers:
quick relevance, human context and file-level navigation. The
[family-history database](corpus/personal-history/family/README.md) is included for Ben's review at the
owner's request; [provenance and privacy questions](analysis/family-review.md)
remain open. Raw logs, local audit manifests and generated reading-room exports
are excluded.

## Current recovery

- **All 248 book records decoded**: 218 LZW and 30 adaptive arithmetic,
  including the six hyper-joke records and their branching links.
- **402 earlier museum articles parsed**, preserving thematic and chronological
  navigation evidence.
- **49 comparable ACM records decoded byte-for-byte** against original sources.
- Shared **TypeScript** parsers and both packed codecs work in Node and browsers.
- **16 tests pass**, covering source equality, malformed inputs, catalog coverage
  and browser compatibility.
- **113 CACM arithmetic records match loose originals byte-for-byte**.
  See the [recovered arithmetic format](analysis/arithmetic-format.md).

A local reading-room prototype already supports linked reading, search and
previews. It is not yet a faithful recreation of historical layouts, graphics,
fonts or reveal timing. We are preserving original text and uncertainty, not
filling recovery gaps with invented content.

Build and test the shared tools with `npm --prefix tools ci` followed by
`npm --prefix tools test`. See the [tools guide](tools/README.md) for creating the
local reading room from the retained originals.

## Why this work matters

HyperTIES grew from The Interactive Encyclopedia System, with development
underway in fall 1983 according to the supplied material. Its highlighted links,
short-description previews and graphical navigation were ways of organizing
knowledge—not merely software features.

The 1988 book and the Encyclopedia of Jewish Heritage and the Holocaust deserve
special restoration treatment. So do the hyper-joke and other experiments whose
meaning depends on choices, previews and paths through information.

## Provenance and curation

The original backup remains on Dropbox; its private sharing URL and access key
are deliberately omitted. The repository owner has confirmed that Ben owns the
Cognetics rights. Historical author and publisher attributions remain important;
private subject matter and third-party publications are separate considerations.

Approved first-phase cleanup removed **2,919 redundant files / 34.26 MiB** while
retaining distinct source material, meaningful variants and research binaries.
The retained historical collection has **2,528 files / approximately 31.23 MiB**,
every one verified byte-identical to the original archive.
Ordinary Git is sufficient; no LFS is needed.

The first hierarchical reorganization is complete. The
[import-process guide](docs/import-process.md) explains what was removed, how
retained counterparts were verified, and how future path/asset maps will preserve
provenance without another undifferentiated archive dump.
