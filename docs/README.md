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
Enable **Read link definitions aloud on single click** to hear that same
description, or use **Read article aloud** beside the title to hear the article
itself. **Stop reading** stops either kind of speech. Definition-only records
are read using their original short description.
The single-click option reads that same
description through your browser's speech synthesis. It is off by default;
another selection or navigation stops the previous speech. It uses no microphone,
and unsupported browsers retain the text-only interaction. Voice processing
depends on the browser and operating system. Speech recognition is still a
future enhancement, not part of this control.
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
The touchscreen is an important example: letting someone point directly at a
visible choice can make an exhibit approachable without requiring familiarity
with a mouse, keyboard commands or computer conventions. But the touchscreen
alone is not the accomplishment. The research behind it matters: how choices
were presented, how contact and selection worked, how feedback supported
confidence, and how the interface accommodated visitors' abilities and
experience. The lift-off work belongs in that larger story, with its precise
relationship to this installation documented rather than assumed.

We want to preserve **the research that made the exhibit accessible**, not
just reproduce its equipment. Papers, prototypes, observations, usability
studies, design revisions and collaborators' accounts can explain why the
installation took the form it did. Ben, your account of that work can connect
the surviving database to the questions, experiments and people behind it.

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
and optional rather than mandatory animation. **Speech synthesis and speech
recognition should be part of that access layer**, following the PDP-7 console's
example: it can speak output and accept dictated input even though the original
machine offered neither. The reading room now offers opt-in speech synthesis
for a link's definition when it is single-clicked. Beyond that, we could offer spoken articles and link
descriptions, dictated searches, and voice-operated navigation, alongside touch
and keyboard controls. Beyond the implemented definition speech, these are
proposed modern enhancements, not claims about
the historical museum interface. Speech should be opt-in, with visible feedback,
clear microphone consent and non-speech alternatives; recognition availability
and any external processing should be explicit.

Embodied demonstrations should
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

### Philosophy, Turing machines, and living courseware

There is another Maryland connection I would love to bring into this work:
the Philosophy department. Christopher Cherniak's course on the philosophy of
computers was one of my favorite courses. It laid the groundwork for my career,
and I still think about it frequently. Restoring these teaching materials is
also a personal tribute to that lasting influence.

Cherniak developed a Turing-machine simulator. I have recovered his emulator and all
its data files, along with other programs he used to teach philosophy of
computers. **I would like permission to use those materials with my own universal
Turing-machine emulator.** Recovery is not permission to republish or adapt;
we should establish the appropriate permissions and attribution before doing so.
I have also recovered Marvin Minsky's TECO universal Turing machine, another
related historical artifact whose provenance and reuse terms need to be preserved.

The design I want to explore is a **virtual hardware device in the emulated
cabinet**, not an isolated animation. The TypeScript emulator layer could
support different renderers, editors, debuggers and live-coding tools around
the same running Turing machine. Its execution and state could also participate
in a shared-memory parallel-computing environment, analogous in architectural
spirit to the PDP-7 working with the Type 340 display processor: separate
execution engines with connected state, not merely pictures of machines.
This is a proposed architecture, not functionality we claim is complete.

All of this belongs in educational courseware: read an explanation, operate
the machine within the page, inspect its state, edit its rules and see the
consequences. HyperTIES is a natural home for that combination of authored
explanation and interactive exploration. It continues the direction we were
exploring with NeWS in 1987—interactive applets integrated with the document,
rather than sending the reader away to a disconnected application.

Ben, could you help identify the right people in Philosophy and elsewhere at
Maryland to discuss permissions, historical context and collaboration?
The teaching materials, their authors' intentions and their educational use
matter as much as the emulator. This could connect philosophy, computer science,
HCI, libraries and museums through a common set of reusable interactive exhibits.

### A reusable preservation pipeline: PIXIE, UNIX, Lisp and beyond

**Cellular automata belong here too.** Norm Margolus has given me permission
and encouragement to make interactive courseware based on chapters of his
CAM6 book. That is a specific collaboration and permission for this educational
work, not a blanket claim about republishing every related artifact.
I want to bring those explanations and experiments into the same environment:
a cellular-automata device alongside the PDP-7, Type 340 display, proposed
Turing-machine device and tiny-titan network/mainframe environment, with
interactive chapters that let readers inspect, change and run the systems.
The integrated courseware is a direction to develop, not an exhibit we claim
is already complete.

I was embedding cellular automata in HyperTIES and NeWS ages ago. This is a
continuation of that work, not a newly invented agenda. The difference is how
much more leverage and capability we have now: portable browser tools,
connected emulators, reusable publishing infrastructure and help doing the
implementation and recovery work.

We already have [PDP-7 UNIX running in the browser](https://hyperties.org/cabinet/unix/),
alongside Heinz's graphics system. Another project I want to pursue is a PDP-1
emulator running **L. Peter Deutsch's Lisp interpreter**, with links back to
scans of the PDP-1 assembly listing in his published papers.

The model is the mapping we built for Heinz's OCR-recovered PIXIE listing:
connect a running core address to its disassembly, recovered assembly source,
and the corresponding place on the scanned listing. A reader can move between
the machine doing the work and the historical document explaining it, inspect
an OCR uncertainty against the scan, and understand where the reconstructed
program came from. The PDP-1/Lisp extension is proposed, not already implemented.

**I am developing a reusable historical preservation pipeline**, not a series
of unrelated emulators. Its stages include preserving and identifying originals,
recovering text and structured data, checking transcription against scans and
machine words, assembling or converting reproducibly, linking execution back
to sources, and publishing accessible interactive explanations. Each project
keeps its own attribution, permissions, variants and uncertainties; shared tools
make the next restoration easier without erasing what makes it distinct.
The [PIXIE restoration account](https://github.com/SimHacker/WillWrightShowForFood/blob/main/packages/cabinet/PIXIE-RESTORATION.md)
shows this approach in practice.

HyperTIES belongs on both sides of that pipeline: it is historical material
we are restoring, and a model for the educational publications through which
people can explore other restored systems. The payoff is not just executing
old code, but connecting code, papers, people, machines and ideas in a form
others can study, teach with and extend.

### Historical content as a forcing function

There are two contributions here: **the tools we develop and give back to the
community, and the historical content that forces us to design and develop
those tools properly**. The content is not decoration added after the platform
is finished. It supplies requirements, exposes missing capabilities and gives
us something concrete to measure against.

Having 128 pages of PIXIE source code makes a very different demand on a PDP-7
and Type 340 emulator than a handful of synthetic examples. A real program
exercises the processors, devices, data structures and interaction together.
Its listing anchors the recovery and source maps; its behavior tests whether
the machine is useful for the work it was built to do.

The vast HyperTIES collection serves the same purpose for the preservation
pipeline and the new, general-purpose HyperTIES and webtop interface we are
building on top of it. Actual articles, previews, links, graphics, editions,
documents and applications force us to handle more than an idealized format.
Original bytes, comparable source records and recovered relationships give us
measurable checks; historical interaction and author feedback give us questions
that byte equality alone cannot answer.

The modern direction draws on gwern.net, pie menus, tabbed windows, HyperLook,
HyperCard and HyperTIES. Their content, demos and applications are forcing
functions too: transclusion, embedded tools, navigation and window management
should earn their place by supporting real work, rather than remain a list of
features in a speculative framework.

This is how I worked with **SimCity and HyperLook**: SimCity was a forcing
function for HyperLook, and I developed them together, alongside the multimedia
infrastructure they needed, including an audio mixer server and a shared-memory
animation library. The application and the tools shaped one another.

That is the approach here as well. Preserve and use substantial historical
material; build the capabilities it demands; test against it; return reusable
tools and documented restorations to the community. The full modern
HyperTIES/webtop is an ongoing development direction, not something the current
archive reading room claims to have completed.

### More leverage, not outsourced intentions

The role of the LLM in this work is not to plan, design or think on our behalf.
The goals, historical relationships and design intentions come from people:
the original authors and researchers, the collaborators helping us now, and
decades of my own work with these systems. Their judgment and experience are
not interchangeable with generated suggestions.

What the tools offer is bandwidth for work we could not get to ourselves
over those decades—**things we had already planned and designed, but were
frustrated before we could finish implementing them**. This is not just help
generating new possibilities; it is a chance to complete work whose intentions
and designs were already ours. That includes transcription, conversion, implementation, cross-referencing,
testing and documentation. That assistance can turn long-held ideas into
working, inspectable artifacts, but its output still needs evidence, review
and verification. People remain responsible for the interpretation, priorities,
permissions and design decisions. We have more ability to carry the work
through—not a reason to surrender its meaning or direction.

This also connects to the convergence between you and **Pattie Maes** in the
1997 direct-manipulation/interface-agents debate: automation can amplify people's
capabilities while preserving understanding, control and responsibility; agents
complement well-designed interfaces rather than replace them. The
[discussion of the published debate](https://github.com/SimHacker/WillWrightShowForFood/blob/main/characters/ben-shneiderman/agents-debate-1997.md)
links to the primary transcript and examines that agreement, rather than treating
the debate as a permanent opposition.

My manifesto,
**[An interface to agency, not agents instead of an interface](https://github.com/SimHacker/moollm/blob/main/designs/INTERFACE-TO-AGENCY.md)**,
develops that direction. The phrase is mine, not a quotation from you, and this
connection is not a claim that you have endorsed my manifesto. People should
be able to see, operate, inspect and correct the same systems that automation
can act upon. Speech and chat add ways to interact; they should not hide the
object of work or become the only route to a capability.

For these restorations, that means keeping the document, running machine,
source, controls and consequences available to the learner. An assistant can
help recover a listing or operate a demonstration, but it should not replace
the interface through which someone explores, understands and takes control.
That is **agency for the person**, not an agent standing between the person
and the historical system.

### Support and collaboration across the restoration projects

**This is a stone soup the community can contribute to.** I think of OLPC and
the way we convinced EA to donate SimCity source code for that educational
mission. A shared purpose and something tangible to build on can invite
contributions no single person could supply alone.

There is a wonderful recent example: I told Mitch Bradley how great it would
be to have a PDP-7 Forth with turtle graphics for the emulator, and convinced
him to make one. He did it in one day. You can
[try the Forth in the cabinet](https://hyperties.org/cabinet/forth/).
That is the spirit I want to foster: an invitation that lets someone bring
their own expertise, authorship and enthusiasm to the shared project.

Not every contribution needs to be money or a whole new program. A photograph,
a tape, a recovered source file, a correction, a remembered design decision,
a teaching example or an introduction can become the ingredient that makes
another part possible. We should credit those contributions and keep the
results useful to the people and institutions who help create them.

Ben, could you help me think about **support and collaboration for this whole
family of historical restoration projects**—HyperTIES and the museum database,
Heinz's PIXIE and the PDP-7 environment, Turing machines and philosophy courseware,
CAM6 cellular-automata courseware, UNIX, the proposed PDP-1 Lisp restoration,
touchscreen interaction demonstrations,
and the shared tools for accessible, embodied historical exhibits?
These are connected efforts, not separate requests to fund individual ports.
I would value your advice on institutions, grants, collaborators and introductions
that could help sustain the broader mission, through both financial support
and exchanges of material and expertise.

**I am not asking you for a personal financial contribution.** The
[PIXIE restoration story's cost and support discussion](https://github.com/SimHacker/WillWrightShowForFood/blob/main/packages/cabinet/PIXIE-RESTORATION.md#what-it-cost)
explains the resources behind the work and how support helps keep the resulting
software freely available.

Do you think there are grants or sponsorship opportunities through ACM,
SIGCHI or related CHI programs, the Holocaust museum, or computer history museums
you know and work with? The University of Maryland could be a natural
collaborator too: the Computer Science and Philosophy departments, university libraries and HCIL
may have interests in preserving and extending this research history.
Beyond Maryland, MIT, The Unix Heritage Society (TUHS), the Game Developers
Conference (GDC), and other research, preservation and educational organizations
may be worth approaching for collaboration or support. We would need to
investigate appropriate contacts and actual programs rather than assume that
any particular organization offers grants.
Your guidance on suitable programs, institutional
contacts or introductions would be enormously helpful. We would want to shape
a proposal around real institutional needs: preserving software and research
history, accessible exhibits, educational demonstrations and reusable public
resources. These are possible avenues to investigate, not funding commitments
or partnerships already in place.

**Collaboration need not be only financial.** Departments, libraries, labs and
museums could share and exchange content, expertise and archival material:
papers, design notes, oral histories, photographs, recordings, source or binary
code, and disk images. We can contribute restored software, documented formats,
accessible readers and reusable exhibits in return. Permissions, attribution,
privacy and publication terms should be agreed for each contribution.

This is the same reciprocal approach I am proposing to computer museums with
PDP-7s: take and share photographs and measurements so we can build accurate
3D models, and help recover any surviving software, binaries or disk and tape
images. The resulting digital models and tools can serve the contributing
institutions as well as the wider public. For Maryland and HCIL, the equivalent
could be recovering the people, research, content and physical installations
behind HyperTIES and the touchscreen work—not simply funding a software port.

### Museum lookup and content

For the museum specifically, see the
[structure, name inventory and lookup evidence](../analysis/museum-structure.md)
and [detailed questions](../analysis/museum-structure.md#questions-for-ben).
We have identified 102 person-focused articles plus three family entries in
the earlier encyclopedia, not a comprehensive victim-name registry.

### Format and recovery questions

- Do authoring sources or exports survive for the later museum's `ENC.HDT`?
  We still need record boundaries, compression details and numeric article IDs.
- What are the roles and schemas of its `HIN`, `HFF`, `HNC`, `HOL`, `HSD` and
  `HUC` companions? `HLN` has readable title evidence, but its full rules also
  need validation. We should not guess expansions of the suffixes.
- Are there specifications or source for classic `BIGRAPH.TIE` and
  `GINDEX.TIE` graphics, and later styles, hotspots and graphic-region commands?
- What are the museum's `PCC` files, and which video or image resources were
  external? PCX, GIF and FLI are recognized standards, but we still need to
  render and connect them correctly, including palettes and animation timing.
- Was visitor name lookup the encyclopedia index/search, a separate registry,
  or another component? Which original program or dataset should we inspect?

The book's two text codecs and earlier museum article/index readers are
working; these questions concern the remaining stores and interactions, not
missing book text. The [file-type registry](file-types/README.md) links current
definitions, evidence and unknowns.

### Historical and design questions

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
