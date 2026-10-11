# Crown jewels: restore experiences, not just files

Two collections deserve dedicated, faithful restoration:
**Hypertext on Hypertext** and the **historical museum/Holocaust material**.
The hypertext joke is a particularly delightful thread connecting the book to
the interface-research demos.

## Hypertext on Hypertext

Source: [1988 book database](../corpus/books-and-literature/HHO-Hypertext%20on%20Hypertext%20book-1988).
The supplied folder title calls it *Hypertext on Hypertext*; the
[HTUIS humor article](../corpus/hyperties-demos/htuis/humorwar.fil) refers to a “Hypertext Hands-On!”
hyperbook. Retain both descriptions as evidence; confirm the precise title,
edition, authorship and publication story with Ben rather than silently treating
every label as bibliographically identical.

### What is recovered now

- 248 titles, original basenames, flags and aliases from
  [index.new](../corpus/books-and-literature/HHO-Hypertext%20on%20Hypertext%20book-1988/index.new).
- Offset/length boundaries exactly partition the
  [206,205-byte packed article store](../corpus/books-and-literature/HHO-Hypertext%20on%20Hypertext%20book-1988/bigfile.tie).
- Chapter/overview navigation covers concepts, applications, system design,
  implementation, authoring, systems, personalities, possibilities and future
  developments.
- The source retains graphical stores/indexes and screen-text graphics.
  Those screen graphics are not a substitute for decoded book articles.
- A distinct [classic browser](../corpus/books-and-literature/HHO-Hypertext%20on%20Hypertext%20book-1988/browser.exe)
  remains for optional format/behavior research.
- **218 articles now decoded** by the [verified LZW reader](packed-format.md);
  30 indexed records use an unresolved second codec and remain explicit gaps.

### Hypertext joke: a concrete restoration target

The index contains these six records:

| Indexed title | Original basename | Packed offset | Stored bytes |
|---|---|---:|---:|
| EXAMPLE OF A HYPER JOKE | EXAMPLFP | 67858 | 246 |
| HOT DOG JOKE (FRANK) | HOTDOGJO | 90982 | 239 |
| HOT DOG JOKE (PICKLE) | HOTDOGJP | 91221 | 329 |
| HOT DOG JOKE (RELISH) | HOTDOGKP | 91550 | 249 |
| HOT DOG JOKE (WIENERS) | HOTDOHKP | 91799 | 337 |
| JOKES | JOKES | 134116 | 508 |

These comprise the introduction/example, four named hot-dog variants and the
general jokes entry. Their aliases include alternate
approaches and responses, suggesting the navigation is part of the joke.
All six records, their text and stored branching targets have now been decoded.
The local reading room lets readers follow the four choices and follow-on links.
Exact historical layout and reveal timing remain to be validated.

The owner recalls Ben making the first hypertext joke. The archive establishes
that hyper-joke examples are present; authorship and historical priority are
recorded as recollection pending confirmation, not inferred from filenames.

A great first public experience would preserve the setup, preview behavior,
choices and timing of reveals—not turn the nodes into one flattened text page.
The exact record ranges and LZW compression have been recovered; next validate
the reconstructed interaction against a reference session.

## Historical museum and Holocaust collections

Sources: [oldmjh](../corpus/museum/oldmjh), [newmjh](../corpus/museum/newmjh), and the
[later provenance/text document](../reference/museum/oldmjh-Texts%20from%20Austria%20and%20the%20Holocaust.docx).
These are historical public-information collections, **not** the separate
personal genealogy database.

### What is recovered now

- **402 parsed loose article records** in the earlier museum collection.
- **478 index entries**, including aliases, in
  [INDEX.TIE](../corpus/museum/oldmjh/INDEX.TIE). Some indexed targets have no loose file.
- **3,548 body-link occurrences** recognized by the current scanner.
- 2,814 link occurrences have candidate destinations supplied by aligned stored
  reference basenames; 480 more have title/basename/alias candidates.
- 218 aligned stored targets have no matching loose file; 18 other links remain
  unresolved and 18 ambiguous. These are recovery leads, not proof all content
  is missing or the historical system was broken.
- Entry points include introduction, four major themes, Holocaust outlines and
  lists, Austrian history, maps, Jewish history and culture.
- The later collection preserves `.HDT` and companion indexes, still graphics,
  animation media and a distinct [3.0.5.100 browser](../corpus/museum/newmjh/BROWSER.EXE).

### Special treatment

1. Preserve the historical vocabulary, author attribution and edition context.
   Present new commentary separately from original authored text.
2. Recover narrative, chronological and thematic navigation. Lists, outlines,
   map links, aliases and short descriptions are interpretive structure.
3. Create accessible modern rendering: keyboard navigation, readable text,
   labeled image/map links and optional motion.
4. Keep explicit content/source provenance. Do not merge old and later editions
   into an unattributed composite merely because topics overlap.
5. Audit absent reference targets against later packed content and indexes before
   proposing invented replacements. Mark unresolved destinations visibly.
6. Use appropriate historical framing for Holocaust material and imagery.
   A restored document is historical evidence, not a contemporary endorsement
   of every original statement.

The later DOCX attributes project texts to Marsha Rozenblit and a student in a
late-1980s project led by Ben. Its internal body/metadata date discrepancy is
already noted in the [timeline](timeline.md). Precise institutional/project
identity should be confirmed before claiming a particular deployed museum
installation.

## Useful questions for Ben's oral history

These are future interview prompts, not a request to block current work:

- What was the book's exact title/edition, and who authored its hyper-joke?
- Was it demonstrated publicly, and what makes “first” the right description?
- Which joke choices, previews and timing were essential to its effect?
- How were the museum articles, maps and four themes developed and deployed?
- Which apparent missing index entries were placeholders versus working content?
- Are there source code, format notes, screenshots, recordings or later exports
  that would rescue the packed-only book and museum data?
- Which other experiments should be highlighted: previewing, graphical links,
  dynamic layouts, multilingual articles, external actions or visitor navigation?

## Next tangible milestones

1. Refine the local navigable museum article map, with explicit recovery gaps.
2. Compare the decoded, linked hyper-joke with original interaction behavior.
3. Complete the 30 remaining book records and graphic assets.
4. An old/new museum edition comparison rather than another duplicate dump.
5. A small public historical showcase backed by tested format readers and
   original-to-modern provenance maps.
