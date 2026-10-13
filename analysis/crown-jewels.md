# Crown jewels: restore experiences, not just files

Two collections deserve dedicated, faithful restoration:
***Hypertext Hands-On! / Hypertext on Hypertext*** and the
**historical museum/Holocaust material**.
The hypertext joke is a particularly delightful thread connecting the book to
the interface-research demos.

## *Hypertext on Hypertext* and *Hypertext Hands-On!*

There are two similarly named but distinct publications in this archive.
The recovered [248-record book corpus](../corpus/books-and-literature/HHO-Hypertext%20on%20Hypertext%20book-1988)
is strongly identified as the IBM-PC software companion to Ben Shneiderman
and Greg Kearsley's *Hypertext Hands-On!* (Addison-Wesley, 1989, ISBN
0-201-15171-5): it contains an epilog “The Making of Hypertext Hands-On!”,
and the official [HCIL book page](https://www.cs.umd.edu/hcil/pubs/books/hypertext-hands-on.shtml)
describes the 192-page book/software package with IBM-PC diskettes and largely
similar book/software contents. The [HCIL-89-06 report listing](https://www.cs.umd.edu/hcil/trs/index.shtml#tr-89-06)
specifies two PC disks. Its directory name “HHO” is therefore a legacy label,
not a secure bibliographic identification.

ACM's *Hypertext on Hypertext* is a different 1988 publication: an interactive
edition of the July 1988 *Communications of the ACM* hypertext special section.
A primary account in the Hypertext '89 proceedings says ACM released this first
hypertext product in Fall 1988, with three independently authored platform
versions: Hyperties for IBM PC (Ben Shneiderman), HyperCard for Macintosh
(Nicole Yankelovich), and KMS for Sun/Apollo workstations (Elise Yoder and
Robert Akscyn). See Rous, Shneiderman, Yankelovich and Yoder,
[“Lessons Learned From the ACM Hypertext on Hypertext Project”](https://doi.org/10.1145/74224.74255),
pp. 385–386. Thus the ACM Macintosh version was **HyperCard**, and its
Sun/Apollo version was **KMS**, not HyperTIES/NeWS. The catalog record for
the Sun/Apollo KMS edition (ISBN 0-89791-288-8) reports January 2000, but
that is not its original release date.

The ACM Hyperties PC database is represented by the separate
[CACM July 1988 corpus](../corpus/books-and-literature/CACM-Hypertext%20Conference%20issue%20July%201988):
its introduction names the special section, and its articles are the conference
papers. Do not identify that eight-paper database with the 248-record
*Hypertext Hands-On!* book corpus. The archive's `ACM` folder is yet another,
unrelated computing-literature/index database.

Jakob Nielsen's [Hypertext '89 trip report](https://www.nngroup.com/articles/trip-report-hypertext-89/)
adds a useful contemporary account of the Hyperties edition. Nielsen says it
contained 307 nodes, including material beyond the original CACM papers: the
full IRIS hypertext bibliography and excerpts from his Hypertext '87 trip
report about talks later rewritten for *Communications*. The retained tree has
307 parsed `.FIL` articles, matching that node count, while `index.new` lists
306 entries. This suggests one of the nodes was not indexed, but it still
needs identification rather than assumption.

Nielsen also records why the edition used CGA: broad IBM-PC compatibility was
prioritized over image fidelity. Figures were redrawn for CGA, but some looked
poor enough that the database warned readers the printed figure was better.
His estimate was two people working half-time for six weeks. In their
retrospective answers, Shneiderman wanted stronger content-oriented links;
Yankelovich wanted more supplemental information and a better HyperCard
navigation aid; Yoder wanted another round of feedback from original authors.
These details set good context for the restoration: preserve the CGA
illustrations as historical artifacts, but don't reproduce their limitations
as the only way to read the figures.

When mapping the 40 retained `.PCX` files, distinguish the original CGA
renditions from any reconstructed or print-quality source image. Nielsen's
account says the figures were redrawn for CGA and sometimes carried an
explicit warning that the printed figure was better; identify those captions
and warnings before making modern access images or silently substituting
higher-resolution artwork.

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
- **All 248 articles decoded**: 218 by the [verified LZW reader](packed-format.md)
  and 30 by the [recovered adaptive arithmetic coder](arithmetic-format.md).
- The recovered records are the **IBM-PC *Hypertext Hands-On!* database**: the article
  “About Hyperties on the IBM PC” explicitly contrasts the book with the disk
  and describes selecting a highlighted term and pressing Enter on an IBM PC.
  The DOS `BROWSER.EXE`, `SETUP.COM`, batch/PIF launcher files and keyboard
  help corroborate the platform. The exact Hyperties product release number
  for this database is not established.
- The recovered structure begins with an overview and introduction, then
  sections 1–9: Essential Concepts, Applications, System Design Issues,
  Implementation Issues, Authoring, Systems, Personalities, Possibilities,
  and Future Developments. Front/back matter includes acknowledgements,
  appendix/about Hyperties, bibliography, epigraph, epilog, and hyper glossary;
  the remaining records are linked terms and articles. The index carries
  aliases as well as titles, so the edition is not just a numbered book
  outline.
- The recovered HHO-named corpus is the IBM-PC hypertext database strongly
  associated with Shneiderman and Kearsley's *Hypertext Hands-On!* (1989,
  ISBN 0-201-15171-5). It is not the ACM *Hypertext on Hypertext* database.
- The *Hypertext on Hypertext: Apple Macintosh/Book and 2 Disks* catalog
  record (ACM, ISBN 0-89791-281-0, June 1988) corresponds to the Macintosh
  HyperCard implementation identified by the 1989 panel; the Sun/Apollo
  implementation was a separate KMS edition.
- ACM's Hyperties PC *Hypertext on Hypertext* version is the best match for
  the separate [CACM collection](../corpus/books-and-literature/CACM-Hypertext%20Conference%20issue%20July%201988/README.md):
  it contains the July issue's article files and the introduction explicitly
  describes the Hyperties disk. The screen demonstration identifies it as the
  widely circulated ACM disk containing the eight papers.
- **No raw DOS floppy image is present in this archive.** The CACM directory is
  an extracted data tree (`.FIL`, `.PCX`, `.TIE`, `CACM.BAT`, and support
  files), not a sector-for-sector disk image. The separate HHO book directory
  retains `BROWSER.EXE`, `SETUP.COM`, and DOS launch/support files, but that
  executable is not a floppy image and is not proven to be the exact browser
  distributed with the CACM issue disk.
- Ben described a hardcover book with two disks and separately reported that
  ACM sold more than 4,000 copies of disks. Until the correspondence is checked
  against this product history, do not assign the sales figure specifically
  to the book package, the CACM conference disk, or the surviving extracted
  trees.

### Editions and distribution: what is known

Keep distinct: (1) *Hypertext Hands-On!* (Shneiderman and Kearsley,
Addison-Wesley, 1989), whose companion database is the 248-record IBM-PC
corpus; and (2) ACM's *Hypertext on Hypertext* (Fall 1988), a re-authored
hypertext edition of the conference papers with three platform versions:
Hyperties/IBM PC, HyperCard/Macintosh, and KMS/Sun-Apollo. The recovered CACM
directory holds the article files for the Hyperties version, not a raw floppy
image. The *Hands-On!* article itself explains that printed and PC-disk
illustrations differed, so recovering its text does not restore every book
figure.

The archive also contains a distinct **CHI '89 giveaway**:
[Human-Computer Interaction Dissertation Abstracts](../corpus/books-and-literature/sigchi/_ecover.txt),
edited by Ben Shneiderman and John Kohl, dated April 1989. Its cover says it
was produced with Hyperties at the University of Maryland and “Donated to
CHI'89 Attendees by Cognetics Corporation.” This is direct evidence for a
conference-distributed Hyperties database, but it is not the HHO book. The
1991 workstation-browser paper separately cites a CHI '88 paper on pie-menu
performance; that citation is not evidence that HHO was distributed there.
In a January 19, 1989 Usenet reply, Don Hopkins states that Cognetics
distributed the PC version, and that ACM distributed its PC “HyperText on
HyperText” database using Hyperties. He also says the NeWS version, `cties`,
was not yet finished. This is direct evidence for the commercial/distribution
split at that date; it does not identify the separately recovered
*Hypertext Hands-On!* files or their precise browser build. Don's subsequent first-person
comments about the workstation window-system lineage are by Don Hopkins
(Hacker News user `DonHopkins`), not an unrelated commenter:
[HN comment](https://news.ycombinator.com/item?id=40617894).

### Hyperties variants relevant to HHO

| Variant | Evidence and date | What it establishes |
|---|---|---|
| Commercial IBM PC version | *Designing to Facilitate Browsing* (1991) says Cognetics had sold a PC version since 1987. The undated Cognetics manual documents Hyperties 2.3 for IBM PC-family machines. | PC product line and a documented 2.3 manual; not proof that the HHO disk itself runs exactly 2.3. |
| ACM *Hypertext on Hypertext*, Hyperties / IBM PC | The CACM corpus introduction describes the Hyperties disk and its articles are the July 1988 special-section papers. The 1989 panel identifies the ACM PC version as Hyperties, edited by Ben Shneiderman. | One of three platform-specific implementations of the Fall 1988 ACM publication. This is distinct from the separately recovered 248-record *Hypertext Hands-On!* corpus. The archive has extracted files, not a raw floppy image. |
| ACM *Hypertext on Hypertext*, HyperCard / Macintosh | The 1989 panel identifies the Apple Macintosh version as HyperCard, edited by Nicole Yankelovich. The ACM retail record for *Apple Macintosh/Book and 2 Disks* gives ISBN 0-89791-281-0 and June 1988. | Identifies the Macintosh implementation and its editor; not a Hyperties port. |
| ACM *Hypertext on Hypertext*, KMS / Sun and Apollo | The 1989 panel identifies the KMS version and editors Elise Yoder and Robert Akscyn. The ACM catalog record gives ISBN 0-89791-288-8. | Establishes the original platform/version relationship. The record's January 2000 date is catalog metadata, not the Fall 1988 product's creation date. This is not the later NeWS workstation browser. |
| *Hypertext Hands-On!* package | Official HCIL page: Ben Shneiderman and Greg Kearsley, Addison-Wesley, 1989, ISBN 0-201-15171-5, 192 pages, book/software package with IBM-PC diskettes. | Strong product match for the recovered 248-record PC book corpus; exact disk provenance is not confirmed. |
| ACM computing-literature database | The separate [`ACM` directory](../corpus/books-and-literature/ACM) has author/general-terms indexes and 8604-series identifiers. | A different ACM-related corpus, not an edition of *Hypertext on Hypertext*. |
| Unix/SunView research version | Shneiderman's 1987 Hypertext '87 panel paper describes both PC and Unix/SunView versions. | A distinct early Unix workstation version, not the later NeWS browser. |
| EGA / Sun 3 research configurations | Jeff Conklin's 1987 survey says research versions ran on EGA to provide more lines and multiple windows, and on a Sun 3 to show two full pages at once. | Further contemporaneous platform/display evidence; this does not by itself establish the window system used on the Sun 3. |
| NeWS `cties` development | Don Hopkins's January 19, 1989 Usenet reply identifies `cties` as the unfinished NeWS version. | Separate from ACM's KMS/Sun-Apollo edition; NeWS was an active research implementation, but no public release is established. |
| SunView four-window research browser | The 1991 paper's comparison, as identified in the user's correction, describes user-placed “piles-of-tiles” versus automatic Z-pattern panning. Participants preferred user placement, without a speed advantage. | Retain the SunView attribution for the earlier four-window interface, distinct from the later two-window NeWS browser. HCIL-90-02's index entry uses the generic “SUN version” for the study and also mentions NeWS; see the caveat below. |
| Sun 4/NeWS research version | The 1991 paper documents the subsequent HCIL version on a Sun 4 using NeWS and describes its two large side-by-side windows. | A research browser distinct from KMS/Sun-Apollo and from the four-window SunView browser. C/PostScript/Forth and UniPress Emacs MockLisp details are Don Hopkins's first-person recollections shared during this project; the previously cited HN item does not substantiate those implementation details. |
| CHI '89 SIGCHI abstracts | April 1989 cover explicitly says Cognetics donated the database to CHI attendees. | A separate conference distribution, not another HHO edition. |

Jeff Conklin's “Hypertext: An Introduction and Survey,” *Computer* 20(9),
1987, pp. 17–41, DOI
[10.1109/MC.1987.1663693](https://doi.org/10.1109/MC.1987.1663693), provides
a contemporaneous illustrated account of the IBM PC interface and the EGA
and Sun 3 research configurations. Its Figure 6 is a reproduced photograph
of the PC browser, not a recovered original screen capture.

The earlier paper is Ben Shneiderman, “User interface design for the Hyperties
electronic encyclopedia” (panel session), *Proceedings of the ACM Conference
on Hypertext '87*, pp. 189–194, DOI
[10.1145/317426.317441](https://doi.org/10.1145/317426.317441). The paper
describes the PC and Unix/SunView versions. The later workstation paper is by
Shneiderman, Plaisant, Botafogo, Hopkins and Weiland, *Hypermedia* 3(2), pp.
101–117, DOI
[10.1080/09558543.1991.12031193](https://doi.org/10.1080/09558543.1991.12031193).
It describes the subsequent Sun 4/NeWS reimplementation.
It cites William Weiland and Ben Shneiderman's 1989 “Interactive Graphics
Interfaces for Hypertext Systems,” ACM DC Technical Symposium, Washington,
DC. That citation's full proceedings record remains to be independently
verified.

The [HCIL technical-report index](https://www.cs.umd.edu/hcil/trs/index.shtml#tr-90-02)
also exposes HCIL-90-02, an early version of the workstation paper, revised in
May 1991 ([early PDF](https://www.cs.umd.edu/hcil/trs/90-02/90-02-early.pdf)).
Its abstract describes the four-window comparison in the “SUN version”; the
index entry also mentions a NeWS 1/1 environment on Sun 4/110.
Treat it as a valuable cross-check, but reconcile its version terminology and
figures with the published paper and the user's SunView/NeWS distinction.

Simon Rowberry's 2025 article, “The early ACM Hypertext Conference’s role in
developing pre-Web reading on-screen,” *New Review of Hypermedia and
Multimedia* 31(3), pp. 175–190, DOI
[10.1080/13614568.2025.2477123](https://doi.org/10.1080/13614568.2025.2477123),
adds useful context. It reports Cognetics licensing Hyperties in summer 1985,
citing Shneiderman (1989a, p. 2), and dates the TIES-to-Hyperties transition
to 1987; the 1991 paper instead says the new name was chosen in 1986. These
may refer to the naming decision versus public/commercial emergence; preserve
the discrepancy until primary documentation resolves it. Rowberry describes
the ACM electronic HHO as a hypertext version of the first ACM Hypertext
Conference proceedings, consistent with the CACM issue/database distinction
above. The article further suggests a possible influence on Berners-Lee's use
of blue links, citing Blanchard (2023); treat that as a secondary-source
hypothesis, not established direct influence.

Rowberry also reports a May 1987 Cognetics advertisement and cites a 1998
archival item titled “Hyperties: Brings it all together,” described as a
letter to Ben Shneiderman (Ben Shneiderman Papers, Box 3, Folder 4). That
archival item has not been examined here, so the advertisement's wording and
exact provenance remain based on Rowberry's account.

### Link previews as browsing semantics

Hyperties' definition-before-navigation interaction was noticed and analyzed
by Richard Furuta and P. David Stotts in “Programmable Browsing Semantics in
Trellis,” *Proceedings of the Second Annual ACM Conference on Hypertext*
(Hypertext '89), pp. 27–42, DOI
[10.1145/74224.74227](https://doi.org/10.1145/74224.74227). Their “Link
summaries” discussion explicitly describes the Hyperties sequence: first
select an arc to display a short summary of the destination, select again for
the full entry, or make another selection to cancel. Their Petri-net examples
model the summary and entry as a constrained browsing interaction. This is
independent contemporary evidence for a defining interaction to preserve in
the modern `htonht` edition; it does not identify an HHO runtime version.

The ACM Digital Library separately catalogs **[Hypertext on hypertext: Sun and
Apollo version](https://dl.acm.org/doi/book/10.1145/51120)**, DOI
10.1145/51120, ISBN 0-89791-288-8. ACM and Crossref report a January 2000
publication date and editors Robert Akscyn and Elise Yoder. This is evidence
that a Sun/Apollo-labelled edition or catalog record exists; the date should
not be treated as its creation date without corroboration. We have not located
its disk image, software, contents, release history, or direct relationship
to the 1988 IBM PC and Apple Macintosh editions. The title page, ACM production
records, surviving disks and Ben's recollection are the next sources to
compare. The ACM page has no abstract.

### Illustrations: content recovered, artwork not yet restored

The article text is complete as text, but the graphics are not decoded or
matched to the articles. The retained [BIGRAPH.TIE](../corpus/books-and-literature/HHO-Hypertext%20on%20Hypertext%20book-1988/bigraph.tie)
is a 224,179-byte opaque binary store. Its companion
[GINDEX.TIE](../corpus/books-and-literature/HHO-Hypertext%20on%20Hypertext%20book-1988/gindex.tie)
is readable and begins with a declared count of 51; it contains 51 named
graphic entries followed by a trailing blank line. The declared count therefore
matches the named entries; it does not establish that every entry is a book
illustration or that its image has been decoded.

The retained `_C*.TXT` files are CP437-style screen-text pages, not the
illustration pixels. Several explicitly say “This page normally contains an
illustration.” The decoded `ABOUT HYPERTIES ON THE IBM PC` article itself says
that the print and disk versions use different types of illustration. We have
therefore not recovered either the actual disk artwork from BIGRAPH.TIE or the
printed book's figures. Do not fill these gaps with the screen-text placeholders
or substitute unrelated images.

Recovery work should parse the graphics index and store, establish each
record's boundaries and image encoding, render test samples with dimensions
and palette checks, then link verified images to article references and any
available print scans. Preserve the raw stores; make lossless modern access
copies and separately authored, accessible image descriptions.

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
- The [structure and name inventory](museum-structure.md) identifies 102
  person-focused entries and three family entries under explicit reviewed
  title rules, not a victim census or count of all name mentions.
  Original help documents an article index and word/phrase search; a separate
  name registry is not established. Of 478 index rows, 400 have loose files,
  78 do not; two other article files are unindexed.
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

### Platform changes must not erase historical responsibility

Preservation should not require starting over with each new platform. Original
records, edition identities, attribution, link structures and recovery evidence
should remain independently available through open representations and explicit
dependencies. Modern access copies must be reproducible without silently
replacing the source or flattening different editions into one account.

The [portrait's first-class perspectives design](https://github.com/SimHacker/WillWrightShowForFood/blob/main/packages/cabinet/PORTRAIT.md#a-camera-you-can-inhabit-steer-and-record)
has particular consequences here. A new tour, camera viewpoint or reconstructed
installation is **an authored interpretation**, not recovered testimony.
Give it its own author, sources, date, version and declared reconstruction
choices. Preserve the distinction between original exhibit navigation and a
modern guide's selected path. Let readers reach the underlying articles and
their context without accepting the tour's framing.

Technical control over a representation is not authority to speak for the
people represented. Do not invent survivor testimony, victims' dialogue,
inner lives or historical actions to populate an interactive scene. Stylized
figures may explain visitors operating the exhibit; they must not blur into
purported reenactments of suffering. Any use of real people's likenesses,
recordings or testimony needs appropriate permissions, attribution and review
with relevant custodians and communities.

First-class perspectives are valuable, but not every transformation is an
appropriate presentation of this material. Playful or accelerated demonstrations
of interface mechanics must remain distinct from the treatment of Holocaust
history and testimony. Accessibility and learner control should bring people
closer to the evidence, not turn it into spectacle.

The literary warning in *The Wedding Album* is an analogy, not a claim about
simulated consciousness: owning the software does not settle responsibility
for the human history it presents. Historical and curatorial judgment remain
necessary even when conversion, animation and publication become easy.

### Reviewed pronunciation is part of respectful access

Names from different languages should not all be read through an unexamined
English speech voice. Preserve original spellings while recording reviewed
language and pronunciation annotations in the access layer, with evidence,
attribution and a correction path. A suitable voice must be auditioned:
language matching alone does not establish a correct pronunciation.

ML can suggest candidates for review, but must not determine a person's
language, identity or preferred pronunciation from their name alone. Relevant
language specialists, custodians and, where appropriate, people or families
represented should guide disputed or uncertain cases. Missing voice support
and unresolved pronunciations must be exposed rather than hidden by a default.

This is a planned workflow, not a capability of the current reader.
The [multilingual speech design](../docs/architecture.md#planned-multilingual-speech-and-pronunciation-review)
describes portable annotations, device-specific voice selection and human
listening review. Correctly speaking a name is part of the restoration's
responsibility toward people, not merely an audio-polish task.

## Useful questions for Ben's oral history

The [museum-specific questions](museum-structure.md#questions-for-ben) cover
name lookup versus a separate registry, missing content and the unresolved
HDT/companion/media formats.

These are future interview prompts, not a request to block current work:

- Can the precise disk/package provenance of the 248-record *Hypertext
  Hands-On!* PC corpus be confirmed, and who authored its hyper-joke?
- Which ACM *Hypertext on Hypertext* platform edition and release package do
  the retained CACM files represent?
- Was it demonstrated publicly, and what makes “first” the right description?
- Which joke choices, previews and timing were essential to its effect?
- How were the museum articles, maps and four themes developed and deployed?
- Which apparent missing index entries were placeholders versus working content?
- Are there source code, format notes, screenshots, recordings or later exports
  that would rescue the packed-only book and museum data?
- Which other experiments should be highlighted: previewing, graphical links,
  dynamic layouts, multilingual articles, external actions or visitor navigation?

## Next tangible milestones

1. Design and build a polished modern edition of ACM's *Hypertext on
   Hypertext*, based on the Hyperties/IBM-PC version of the eight CACM
   conference papers, preserving authored links and definition previews
   without attempting pixel-by-pixel or click-by-click reproduction.
2. Curate interactive ideas from across HyperTIES editions into that
   publication: embedded applications, the NeWS pie-menu interactions and
   demonstrations such as the spinning earth, with modern examples such as the
   PDP-10 emulator clearly distinguished from historical originals.
3. Inventory the ACM corpus's article, index, link, and figure assets and place
   them in context. Keep its sources distinct from the separate 248-record
   *Hypertext Hands-On!* corpus.
4. Preserve the *Hands-On!* hyper-joke as a separate authored experience;
   compare its recovered interaction with original evidence without silently
   inserting it into ACM's conference publication.
5. Continue the museum article map and old/new edition comparison as subsequent
   collection work, maintaining explicit recovery gaps and provenance.

## First publication target: `htonht`

Build the polished edition as its own database in the existing Hyperties
application, alongside the [Space Telescope example](https://github.com/SimHacker/WillWrightShowForFood/tree/main/apps/ties/examples/space-telescope).
The natural source directory is
`apps/ties/examples/htonht/`, with `articles/`, `images/`, `shapes/`, and
`index.json`; the app already discovers example databases from that layout.
The corresponding database route is
`https://hyperties.org/databases/htonht/`, with stable article routes beneath
it. Add a clear door to it from the main Hyperties database and ensure it is
included in the production build/prerender.

The source of truth is the preserved extracted CACM corpus in
`corpus/books-and-literature/CACM-Hypertext Conference issue July 1988/`,
which represents the ACM Hyperties/IBM-PC publication; it is not the packed
248-record *Hypertext Hands-On!* corpus. Generate the modern database
reproducibly from the source articles, index and recovered links rather than
hand-copying text. The Space Telescope example's
26 articles, aliases, pictures, SVG hotspots and spinning-earth interaction
show how this Hyperties app can combine authored text, images and embedded
interactive targets.

### Steps to a polished edition

1. **Use the bibliographic boundary now established.** The ACM platform
   versions are Hyperties/PC, HyperCard/Mac and KMS/Sun-Apollo, as identified
   in the Hypertext '89 panel. Confirm with Ben which surviving CACM files
   represent the shipped PC database and whether any missing assets or
   companion disks survive.
2. **Design the ACM publication as a HyperTIES database.** Translate its
   source papers, titles, aliases, summaries and links into generated articles
   and an index. Preserve source order and article boundaries; retain original
   IDs and offsets in provenance metadata. Verify destinations and report
   ambiguities rather than guessing.
3. **Recover and integrate the CACM figures.** Decode and map the 40 retained
   PCX images to papers, screen context, original captions and any CGA-quality
   warning; locate the full IRIS bibliography and Hypertext '87 trip-report
   excerpt nodes Nielsen describes. Identify missing/print-quality
   illustrations and seek scans where appropriate. Preserve the CGA source
   pixels and provide any improved access image and editorial accessibility
   description as separately labeled derivatives.
4. **Build the reading experience in the existing app.** Create
   `apps/ties/examples/htonht/` using the application's database contract.
   Reuse the modern HyperTIES navigation and definition-preview behavior, but
   design typography, responsive layouts, search, table of contents and
   progress for this publication rather than simulating old screens.
5. **Make interactive examples part of the authored publication.** Integrate
   appropriate examples—such as the existing Space Telescope spinning globe,
   a new pie-menu implementation, and the PDP-10 emulator—where chapters
   introduce them. Each should have a clear explanatory article, accessible
   controls, source/credit, and a distinction between historical applet and
   modern reconstruction. Avoid making the reading experience depend on every
   optional emulator.
6. **Validate before launch.** Check the eight papers and navigation records,
   aliases, every resolvable link, image coverage, keyboard/screen-reader/mobile
   use, reduced motion, stable direct URLs and prerendering. Compare
   representative passages and figures against the CACM and disk sources, then
   have Ben review bibliographic and historical framing.
