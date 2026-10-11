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
