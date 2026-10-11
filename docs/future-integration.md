# Future NeWS edition and webtop integration

[Current layout](layout.md) · [Repository index](../INDEX.md)

## Owner's direction, October 11, 2026

Don Hopkins's own Hyperties NeWS edition, including its content, code and reader,
belongs in this project alongside the other historical material. His new
Hyperties is the foundation for his webtop, which he is publishing at
hyperties.org. Moving the webtop/Hyperties stack here may eventually make this
repository the single source of truth for code and data.

**This is a future direction, not an instruction to import or migrate now.**
No NeWS or webtop sources, dependencies, deployments or repository histories
have been moved as part of the current corpus reorganization.

## Publishing at hyperties.org: standalone nuggets

The [Cabinet manifesto](https://github.com/SimHacker/WillWrightShowForFood/blob/main/packages/cabinet/MANIFESTO.md)
is a companion statement of intent: tribute, accessibility and fun take priority
over realism for its own sake. Preserve the historical evidence and identify
departures, but let modern readers do better than the old hardware and software
allowed. Reincarnation is not restricted to emulating yesterday's limitations.

hyperties.org can host static content as it becomes ready, alongside the new
Hyperties engine Don is developing, with transclusion informed by his analysis
of gwern.net. GitHub remains the source; the site is a publication target.

Publish recovered material as **discrete nuggets** that stand on their own:

- Each nugget is a self-contained HTML or Markdown unit: a recovered article,
  the hyper-joke, a museum theme, a format explainer, or an interactive tool.
- A nugget must work when opened directly, when transcluded into another
  document, and when wrapped in an iframe. The PDP-7 emulator is the model.
- Nuggets carry their own provenance: source collection, original path,
  SHA-256 and recovery status. Gaps stay labeled rather than silently filled.
- Prefer stable, meaningful URLs and fragment IDs so other documents can
  transclude or link precise parts.
- Generate nuggets from the originals with the shared TypeScript core, at build
  time in Node. The same code can render them live in the browser.

The current reading room (`analysis/reading-room.html`, generated and
Git-ignored) is a first self-contained example. It has no network dependencies
and embeds the browser bundle. Splitting it into per-article and per-collection
nuggets is a natural next step.

## Keep the layout open

Historical material is a **forcing function**, not merely a showcase for tools
designed independently of it. The
[discussion for Ben](README.md#historical-content-as-a-forcing-function)
connects the 128-page PIXIE listing, the HyperTIES corpus and Don's simultaneous
SimCity/HyperLook development. Substantial programs, documents, demos and apps
should shape and test the preservation pipeline and modern general-purpose
HyperTIES/webtop. Inspirations include gwern.net, pie menus, tabbed windows,
HyperLook, HyperCard and HyperTIES; their practical demands should guide reusable
capabilities rather than justify a speculative feature inventory.

Don reports permission and encouragement from Norm Margolus to develop
interactive courseware based on chapters of his CAM6 book. A cellular-automata
device and its educational pages could join the PDP-7, Type 340, proposed
Turing-machine device and tiny-titan network/mainframe environment. This
continues Don's earlier cellular-automata embedding in HyperTIES and NeWS;
the integrated courseware is not claimed complete. Preserve the scope of
permission and attribution for contributed material.
The [discussion for Ben](README.md#a-reusable-preservation-pipeline-pixie-unix-lisp-and-beyond)
also explains [the role of modern assistance](README.md#more-leverage-not-outsourced-intentions):
people set the intentions and exercise design judgment; tools supply additional
capacity for recovery and implementation, with review and verification.

The broader mission is a reusable preservation pipeline spanning PIXIE,
PDP-7 UNIX, Turing-machine teaching materials and a proposed PDP-1 emulator
for L. Peter Deutsch's Lisp interpreter. The
[pipeline discussion for Ben](README.md#a-reusable-preservation-pipeline-pixie-unix-lisp-and-beyond)
describes linking core addresses, disassembly, recovered assembly and scanned
listings, following the PIXIE OCR/source-map work. Historical publications and
interactive courseware should share this provenance chain. The proposed PDP-1
work and other systems have not been imported here; shared tooling should not
blur project boundaries or imply permissions that have not been established.

The educational direction also includes a proposed universal Turing-machine
cabinet device, with TypeScript renderers, editors, debuggers and live-coding
tools sharing its running state. It could participate in a shared-memory
multi-processor environment, taking architectural inspiration from the PDP-7
and Type 340's connected execution engines. Don reports recovering Christopher
Cherniak's teaching simulator, its data files and other philosophy-of-computers
programs, as well as Marvin Minsky's TECO universal Turing machine. Permissions
and attribution must be established before publishing or adapting those
materials; they have not been imported into this repository.
The [courseware discussion for Ben](README.md#philosophy-turing-machines-and-living-courseware)
connects this to Maryland's Philosophy department and the 1987 NeWS approach of
interactive applets integrated with authored pages.

A proposed embodied-interaction exhibit would demonstrate touchscreen lift-off
selection with Sims-style portrayals of Ben Shneiderman, Catherine Plaisant and
Rich Potter at a touchscreen IBM PC. The
[proposal in Ben's welcome page](README.md#a-possible-next-demonstration-touchscreen-lift-off)
calls for historical evidence and collaborator guidance before choosing the
exact setup. Touch, movement, feedback and release should share one interaction
model with the animated hand, with accessible alternatives and labeled modern
enhancements. This is a future exhibit idea, not implemented functionality.

- `corpus/` holds intact historical collections. The NeWS edition's content can
  join it without being forced into a DOS version category.
- Its original reader/source should stay a coherent edition, not be scattered
  into suffix buckets or mistaken for modern shared parser code.
- `tools/` currently holds browser/Node byte-format tooling; it should not become
  an undifferentiated home for a complete webtop application.
- A future `apps/` layer is a possible home for modern readers, the webtop and
  deployment entry points. No empty placeholder application tree is created now.
- Edition/platform, content subject, format and recovery status remain
  overlapping catalog facets. DOS, NeWS and modern web implementations need
  not share one release numbering system.
- `docs/`, `analysis/`, `reference/` and source manifests remain separate from
  both corpus and application layers.

Before integration, inspect the actual stack, preserve its attribution and
history, map shared modules/assets and validate its build/deployment behavior.
Choose application/package boundaries from that evidence rather than committing
to a speculative monorepo structure today. A single source of truth should
remove accidental duplication without erasing meaningful historical editions.
