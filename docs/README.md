# Ben, welcome back to HyperTIES

**The links are coming back to life.**

Your archive has given us more than old programs: it preserves authored
knowledge, navigation, short descriptions, graphical ideas, and experiments in
what hypertext could be. We are recovering those structures so they can be
read, studied and reimagined today.

This is an October 2026 work-in-progress, not a claim of complete restoration.

## Read it yourself

**[Open the HyperTIES reading room](https://hyperties.org/archive/reading-room/)**
in any browser — no account or installation needed. Click highlighted links to
see their short descriptions; double-click to follow. Hover does nothing.
Back and Forward retrace your browsing history. Previous/Next article browse
the original index order. All book records are decoded; unresolved destinations
remain labeled. Index focuses the
searchable article catalog on the left. Two museum articles absent from the
original index are explicitly labeled and appended alphabetically.

- **[Tell the hypertext joke](https://hyperties.org/archive/reading-room/#book:EXAMPLFP)**
  and choose a response.
- **[Explore the book's concepts](https://hyperties.org/archive/reading-room/#book:CONCEPTS)**,
  with the original screen-text diagrams and links.
- Browse the earlier Holocaust museum encyclopedia's 402 articles.

The text comes straight from the original records. It is not yet a faithful
recreation of historical fonts, graphics or page timing.

## A five-minute tour of what we found

1. **[The hypertext joke](discoveries.md#the-hypertext-joke):** six recovered
   records, four alternate responses, and further links. The interaction is part
   of the joke. [Try it](https://hyperties.org/archive/reading-room/#book:EXAMPLFP).
2. **[The book](discoveries.md#hypertext-on-hypertext):** all 248 indexed
   records decoded, using LZW and the newly recovered adaptive arithmetic codec.
3. **[The museum](discoveries.md#jewish-heritage-and-the-holocaust):** 402 earlier
   articles, with thematic and chronological navigation preserved as evidence.
4. **[The formats](formats.md):** tested byte-level definitions, including the
   packed codec, rather than guesses based on extensions.
5. **[The import story](import-process.md):** where the material came from, what
   we removed, what we kept, and how we intend to organize it.

For deeper exploration, use the [source collection catalog](collections.md).
Each collection has a compact GLANCE, contextual README and linked file INDEX.
The [TypeScript tools](../tools/README.md) and [technical survey](../analysis/README.md)
connect the source bytes to tested recovery methods.

## Preservation and reincarnation: the thinking behind the work

Ben, your perspective belongs in the architecture and planning, not just in a
final fact-check. The archive can tell us what bytes survived; you can help us
understand why things were designed that way, what mattered to authors and
readers, and which ideas deserve to live again. These pages record our current
intentions and proposals, not a finished design or decisions made on your behalf.

**Preserve the authored experience, not merely the words.** A short description,
a choice of paths, a thematic outline, a map and a joke's branching structure
are part of the work. Conversion should make those relationships accessible
without flattening everything into disconnected paragraphs. The book and the
Holocaust museum material deserve their own historical framing and careful
treatment; different editions should not become an unattributed composite.

**Keep evidence separate from interpretation.** Original files remain unchanged.
Readable versions are reproducible derivatives, with source identities and
checksums. A modern reader may improve access, but it should say where it differs
from the historical interface. Unknowns stay visible, and missing material is
not supplied by invented prose or graphics.

**Make the collection understandable without forcing it into one tree.** Intact
collections have a physical home, while subject, edition, platform, format and
recovery status provide overlapping ways in. We remove accidental duplication,
not meaningful variation. The map should support historians, readers and future
implementers, not only the person who knows the original filenames.

**Give the ideas a life beyond this repository.** The reading room is the first
access layer. We also want individual articles, jokes, themes and interactive
demonstrations to stand alone, link to one another, or be embedded and transcluded
into other documents. The same conversion knowledge should serve offline tools
and browser readers. Don's NeWS edition and modern Hyperties/webtop work are
future connections, not migrations already performed.

### Discussions and plans worth exploring

| Discussion | Why it may interest you |
|---|---|
| [The preservation and import story](import-process.md) | What was kept, what was removed with permission, and why source, access copies and interpretation remain separate |
| [The archive map and organization](layout.md), [edition/version view](by-version.md) and [storage view](by-storage.md) | Multiple ways to understand the collection without erasing the context of individual databases |
| [Restoration priorities for the crown jewels](../analysis/crown-jewels.md) | The book, hyper-joke and museum as authored experiences; historical framing, oral-history questions and next milestones |
| [One reusable core, many ways to read](architecture.md) | The architectural intention: conversions and modern readers share knowledge rather than grow incompatible implementations |
| [Standalone nuggets, transclusion and future NeWS/webtop connections](future-integration.md) | How recovered history can become reusable web publications and inform a living HyperTIES |
| [Discoveries and open questions](discoveries.md) | What we can demonstrate now, what remains uncertain, and where your memories can change our understanding |
| [The historical timeline](../analysis/timeline.md) | Evidence for the sequence of editions, projects and surviving documents, with uncertainty retained |

The immediate priorities are graphics and their placement, later museum
formats, and checking recovered navigation against the intended experience.
Then come smaller independently readable publications and comparisons between
editions. Successful decompression is a milestone, not the completion of
historical restoration.

## What we would love to hear from you

- What was the exact book title, edition and authorship?
- Who created the hyper-joke, and when and where was it first demonstrated?
  Don recalls it as the first hypertext joke; we want to preserve the story with
  your confirmation rather than make an unsupported priority claim.
- How did the museum's themes, chronology, map navigation and previews work in
  the intended installation?
- Which apparently absent targets were placeholders, and which were working
  content we should search for?
- Are there source files, compression notes, screenshots or recordings that
  could help with later museum formats or confirm the recovered arithmetic coder?
- Which other unusual experiments deserve their own restoration?
- Which aspects of the original interaction must a modern reincarnation preserve,
  and where would you welcome a different approach?
- Does this map reflect the relationships between the projects as you remember
  them, and which collaborators or institutions need fuller attribution?

## What is verified

| Result | Evidence |
|---|---|
| 218 book records recovered by the classic LZW decoder | Valid article section boundaries and delimiters |
| Remaining 30 book records recovered by adaptive arithmetic decoding | Valid sections; decoder also matches 113 CACM loose originals exactly |
| 49 comparable ACM packed records recovered exactly | Byte-for-byte equality with original loose article files |
| 402 earlier museum articles structurally parsed | Byte-offset checks and preserved source records |
| Node and browser use the same TypeScript decoding core | Browser decoding tested with no Node `Buffer` API |
| 2,919 redundant files removed with permission | Original hashes, retained counterparts and a local removal journal |

## What is not claimed

We have not recreated exact historical screens, fonts, page breaks, graphics or
reveal timing. Both book codecs are recovered; later museum stores and some target mappings
are unresolved. Historical text is not silently rewritten and missing content
is not invented.

The [reading room](https://hyperties.org/archive/reading-room/) permits linked
exploration and previews today. It is generated from the originals in this
repository by `analysis/build-reading-room.mjs` and published on hyperties.org.
