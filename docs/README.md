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
follow them; hover or focus a link to see its short description first, as
HyperTIES did. Search and the article list are on the left.

- **[Tell the hypertext joke](https://hyperties.org/archive/reading-room/#book:EXAMPLFP)**
  and choose a response.
- **[Explore the book's concepts](https://hyperties.org/archive/reading-room/#book:CONCEPTS)**,
  with the original 1988 screen layout.
- Browse the earlier Holocaust museum encyclopedia's 402 articles.

The text comes straight from the original records. It is not yet a faithful
recreation of historical fonts, graphics or page timing.

## A five-minute tour of what we found

1. **[The hypertext joke](discoveries.md#the-hypertext-joke):** six recovered
   records, four alternate responses, and further links. The interaction is part
   of the joke. [Try it](https://hyperties.org/archive/reading-room/#book:EXAMPLFP).
2. **[The book](discoveries.md#hypertext-on-hypertext):** 218 of 248 indexed
   records decoded; 30 remain explicit recovery tasks.
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
  could explain the second codec and the later museum format?
- Which other unusual experiments deserve their own restoration?

## What is verified

| Result | Evidence |
|---|---|
| 218 book records recovered by the classic LZW decoder | Valid article section boundaries and delimiters |
| 49 comparable ACM packed records recovered exactly | Byte-for-byte equality with original loose article files |
| 402 earlier museum articles structurally parsed | Byte-offset checks and preserved source records |
| Node and browser use the same TypeScript decoding core | Browser decoding tested with no Node `Buffer` API |
| 2,919 redundant files removed with permission | Original hashes, retained counterparts and a local removal journal |

## What is not claimed

We have not recreated exact historical screens, fonts, page breaks, graphics or
reveal timing. The remaining codec, later museum stores and some target mappings
are unresolved. Historical text is not silently rewritten and missing content
is not invented.

The [reading room](https://hyperties.org/archive/reading-room/) permits linked
exploration and previews today. It is generated from the originals in this
repository by `analysis/build-reading-room.mjs` and published on hyperties.org.
