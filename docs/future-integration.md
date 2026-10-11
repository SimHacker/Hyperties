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

## Keep the layout open

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
