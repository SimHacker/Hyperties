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

**Honor the history without inheriting every limitation.** The
[Cabinet manifesto](https://github.com/SimHacker/WillWrightShowForFood/blob/main/packages/cabinet/MANIFESTO.md)
captures the attitude: tribute, accessibility and fun matter more than realism
for its own sake. The historical evidence stays honest, while the surrounding
experience is ours to improve. A modern HyperTIES can offer better accessibility,
richer connections, new forms of interaction and reuse that the original
technology could not support. We should distinguish those enhancements from
historical behavior and keep the originals available, not mistake fidelity to
old constraints for fidelity to the ideas.

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
| [The Cabinet manifesto](https://github.com/SimHacker/WillWrightShowForFood/blob/main/packages/cabinet/MANIFESTO.md) | The guiding attitude: preserve what makes the work itself, but improve access and possibilities beyond the old technology's limits |
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

## Heinz, museums, and bringing the people back into the picture

*A note from Don about the larger mission.*

Ben, this is part of the same work I am doing with Heinz Lemke and his early
interactive graphics code. We have brought his PIXIE system back into a
browser-based PDP-7 and Type 340 environment, working from the surviving listing
and using his feedback to understand how it was actually used. The
[PIXIE restoration story](https://github.com/SimHacker/WillWrightShowForFood/blob/main/packages/cabinet/PIXIE-RESTORATION.md)
connects the code, historical sources and recovery work. You can
[try the machine in your browser](https://hyperties.org/cabinet/symelec/).

I want to work with museums so this can become a freely usable companion to
their physical collections: a machine visitors can operate online, an exhibit
they can host, and a way to explore software while the real hardware rests or
is being restored. **Museums can use the software for free.** In return, I am
asking for help with the evidence: photographs, measurements, recordings,
disk images, tapes, listings and code we have permission to use. This is an
invitation, not a claim that museum partnerships are already arranged. The
[open letter to museums](https://github.com/SimHacker/WillWrightShowForFood/blob/main/packages/cabinet/FOR-MUSEUMS.md)
sets out the offer and the kinds of material that would help.

The ambition is a high-fidelity audiovisual recreation of the *computing
environment*, not just a rectangle containing an emulator: the cabinets and
devices, the CRT's curved glass and phosphor persistence, the keyboard and light
pen, the Teletype and mechanical sounds, and even the AM radio through which
the machine's activity can become audible. The
[physical portrait plan](https://github.com/SimHacker/WillWrightShowForFood/blob/main/packages/cabinet/PORTRAIT.md)
and [AM radio project](https://github.com/SimHacker/WillWrightShowForFood/blob/main/packages/cabinet/AM-RADIO.md)
describe that direction. The complete physical scene is a goal, not something
we are claiming to have finished.

I also want animated Sims 1 characters, using
[VitaMoo](https://vitamoo.space), my open-source TypeScript reimplementation of
the Sims 1 animation system, to demonstrate the machines. A portrayal of Heinz
can lean toward the screen, put the light pen against the glass, turn to the
keyboard, and show how the hands and devices work together. These should be
meaningful demonstrations driven by interaction with the running machine,
not decorative characters gesturing beside an unrelated recording. The
portrayals should be identified as portrayals, with historical sources and
reconstructed behavior distinguished.

**The physical arrangement is part of the interface.** Heinz has emphasized
the draftsman's drawing board as a shared center of attention for collaborators.
The CRT's size, position and tilt, where people stood or sat, and how they
reached it with a pen all affect what collaboration and interaction mean.
That makes me think of Mark Weiser's ubiquitous computing boards: the shared
surface belongs in the social and physical setting, not only in a screenshot.
This is a connection I want to explore, not a claim of direct historical lineage.

Recreating the objects *and the humans* has real historical and educational
value. It can explain an arm's reach, the effort of holding a pen, why controls
were placed near the work, and how several people gathered around one drawing.
Those are design facts a disembodied software simulation can easily lose.
It is not gimmickry: the physical scene can make the ideas legible.

### A possible next demonstration: touchscreen lift-off

One especially fitting demonstration would put Sims-style portrayals of you,
Catherine Plaisant and Rich Potter in front of a touchscreen IBM PC, explaining
and demonstrating the **lift-off selection strategy**. Visitors could see the
finger touch the screen, move to refine the target, and lift to commit the
selection, with the hand, feedback and selected target all driven by the same
interaction.

Rather than a generic animation of someone tapping a screen, the demonstration
could make the research question visible: what happens on contact, how a person
corrects their aim, what their finger obscures, and why the moment of selection
matters. A visitor could try it, replay it slowly, or compare it with a
contact-to-select strategy. Accessible alternatives could expose the same
interaction stages without requiring precise touch.

This is a proposal, not a completed exhibit or a claim about a particular
historical experiment. We would want your guidance on the hardware, software,
feedback, terminology, each collaborator's contribution and appropriate
portrayals. Surviving papers, photographs, code and demonstrations should guide
the reconstruction; modern explanatory additions should be labeled.

### Why stylized people in a realistic place?

The low-resolution Sims 1 people and photorealistic machines are a deliberate
combination, not a compromise we need to hide. Scott McCloud describes a related
principle in *Understanding Comics*, often called the **masking effect**:
simplified characters can invite identification within a richly detailed world.
The person is an approachable figure a viewer can imaginatively inhabit; the
setting gives that person something concrete to inhabit and act upon.

That is the intention here, not a guarantee that every viewer will respond in
the same way. We do not need a photorealistic digital double to convey someone's
attention, effort, uncertainty or discovery. A stylized operator can invite
empathy without pretending to be documentary footage. Meanwhile, accurately
modeled hardware anchors the demonstration: the height of the keyboard, the
angle of the glass, the distance a hand travels, and the space people share
remain specific and inspectable. The contrast lets us say both **"imagine
yourself here"** and **"this is how the equipment and environment worked."**

### Restore the museum installation, not only the database

These principles also suggest a richer restoration of the Encyclopedia of
Jewish Heritage and the Holocaust. The surviving articles and links are only
part of the exhibit. We want to recover the thought and work behind its physical
installation, information structure, interface and interactivity: how a visitor
approached it, understood the choices, reached the controls, read the screen,
and found a way forward or back.

**Making it usable for older visitors belongs at the center of that work.**
Rather than treat older people as one uniform group, we should investigate the
range of visual, motor, hearing and cognitive needs the installation addressed.
Screen size and angle, seating and reach, text size and contrast, target sizes,
selection feedback, pacing, clear navigation and recovery from mistakes are
all questions for the restoration. Photographs, plans, design notes, visitor
studies and the memories of designers and museum staff could tell us what was
actually tried and learned. These are research questions, not claims that we
have established the original installation's specifications.

A reconstructed setting with stylized visitor figures could demonstrate those
choices and help people understand the experience of using the exhibit.
The figures would illustrate **visitors and interaction**, not dramatize victims
or historical suffering. Holocaust material requires dignity, careful attribution
and historical framing; empathy is not a license to turn it into entertainment.

The new access version should also be usable itself: adjustable readable text,
keyboard and alternative input, screen-reader access, understandable controls,
and optional rather than mandatory animation. Embodied demonstrations should
have equivalent textual explanations and should not stand between a reader
and the historical material. We can document original constraints while removing
barriers today, testing the result with older people and people with disabilities
rather than assuming that realism or a large font alone makes it accessible.

Ben, we would especially value your account of the physical installation and
the work to make it approachable for elderly visitors: who contributed, which
design decisions mattered, and what evidence survives. That knowledge is part
of the history we want to preserve alongside the source records.

**HyperTIES restoration and documentation belong to this same mission.**
Recovering your records, previews, maps and paths is one part; understanding the
authors, readers, installations and collaborations is another. We want to
preserve the evidence, bring the people and ideas back into view, and offer
possibilities the original technology could not. As the
[Cabinet manifesto](https://github.com/SimHacker/WillWrightShowForFood/blob/main/packages/cabinet/MANIFESTO.md)
puts it, **tribute, accessibility and fun belong in the front seat.**

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
- Would a touchscreen lift-off demonstration with you, Catherine Plaisant and
  Rich Potter be a useful next exhibit? What original setup and material should
  guide it?
- What physical and interface design work made the museum installation usable
  for elderly visitors, and are there plans, photographs, evaluations or people
  whose accounts we should preserve?

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
