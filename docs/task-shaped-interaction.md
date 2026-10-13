# Task-shaped interaction

[Webtop integration](future-integration.md) · [Design overview](README.md)

Interaction should be shaped around the work people are doing, the objects
they are working with, the people they work alongside, and the channels that
let them keep the work flowing. The webtop should not make every task fit one
universal gesture, window arrangement, or conversational interface.

## What the research contributes

Bill Buxton's [“The Natural Language of Interaction”](https://www.billbuxton.com/natural.html)
(1988; revised from a 1987 paper) argues that non-verbal interaction can be
expressive and natural to a task. “Natural” does not mean innate or universal:
Buxton explicitly notes that interaction languages are learned and
domain-specific. His examples make a practical point. Proofreaders already
use marks to specify edits; two-handed input can let one hand navigate while
the other selects; a separate navigation control can let a painter keep
painting while moving the page. The target is continuity and a compact
expression of intent, not gesture for gesture's sake.

This distinction also changes how to assess Buxton's comparison of verbal and
non-verbal dialogue. A voice interface is not necessarily a verbal-language
interface. Don's **VoyStick** uses voice as a continuous, non-lexical
gestural control stream—pitch and vowel/formant position can steer a
two-dimensional space—while speech recognition handles words in parallel.
The voice is an instrument, not just a command microphone. A homomorphic
feedback loop can synthesize the gesture being tracked, so the person hears
and blends with it to confirm or correct the target. That is a symmetric,
continuous input/output relationship, not a one-way speech-recognition
pipeline. It can coexist with speech, hands, pointer, keyboard or other
controls; the task can move between channels or combine them without forcing
one modality to replace the others.

The idea is documented in Don's
[VoyStick design notes](https://github.com/SimHacker/moollm/blob/main/skills/speech/voystick.yml)
and the [Urban Safari steering design](https://github.com/SimHacker/WillWrightShowForFood/blob/main/characters/don-hopkins/sources/urban-safari-steering-voystick-pie-network.md),
with a correspondence lineage back to 1991. These are a design and research
direction, not a claim that a complete, robust VoyStick implementation is
already available. The notes describe a pitch-Y, vowel-X mapping, pie-wedge
navigation, optional synthesized feedback and parallel word recognition.
They also identify real design issues: pitch/formant tracking and
calibration, noisy conditions, different vocal abilities, privacy, and
alternatives for people who do not want to sing. A quiet phonetic mode or
another input channel should remain possible.

The evidence is useful but bounded. In [Buxton and Myers's two-handed input
study](https://doi.org/10.1145/22339.22390) (CHI '86), two experiments found
benefits for particular selection/positioning and navigation/selection tasks.
Subjects did not all spontaneously use both hands in the second experiment.
Buxton also acknowledges the need for evaluation, appropriate hardware and
care in moving from a demonstration to a robust system. [Guiard's account of
skilled bimanual action](https://doi.org/10.1080/00222895.1987.10735426)
offers a broader model: the hands can have asymmetrical, coordinated roles,
rather than acting as interchangeable pointers. These sources motivate
task-specific experiments, not a requirement that a webtop be two-handed.

### Separate the device from the interaction technique

Buxton's [“Lexical and Pragmatic Considerations of Input Structures”](https://doi.org/10.1145/988584.988586)
(1983) gives a useful way to reason about a voice instrument, a mouse and a
pie menu without conflating them. Using Foley and Van Dam's layers, he
distinguishes **lexical** choices—the spelling or form of tokens—from
**pragmatic** choices about gesture, space and physical devices. His examples
include what a device senses (position, motion or pressure), its dimensions,
and the movement it affords. He argues that pragmatics are often neglected,
even though they strongly shape the interaction a person experiences.

For webtop design, make at least these parts explicit:

1. **Physical transducer:** microphone, mouse, touch surface, keyboard,
   handlebars, light pen, or another sensor; what it measures, continuously
   or discretely, and the bodily action it affords.
2. **Signal interpretation:** software extracts or tracks events and values
   such as pitch, vowel/formant coordinates, pointer motion, clicks or keys.
   This is interpretation of device data, not yet the application's meaning.
3. **Interaction technique:** software maps those values into a control
   structure: a pie menu, widget, drag gesture, keyboard sequence, voice
   phrase, or a coordinated combination. This layer establishes selection,
   timing, mode, thresholds and feedback.
4. **Application meaning:** the chosen operation, such as previewing a link,
   moving a pane, navigating to a node, or setting a destination.

These are analytical distinctions, not isolated modules or a claim that
widgets belong to only one theoretical layer. Buxton warns that the strata
interact: changing a device can alter the gesture, syntax and even which
operations feel expressible. A mouse and a touch surface may both be called
“pointing” devices but support different movements and rhythms. Likewise, a
microphone is hardware; VoyStick is not a special microphone but a continuous
signal interpretation and interaction technique that can map vocal gesture
to pie-menu navigation. Speech recognition maps a different aspect of the
same acoustic stream—words—to a lexical command channel. The webtop should
not mistake the device for the widget, or either for the action's meaning.

This separation also improves evaluation and portability. Compare techniques
while holding the physical device constant; compare devices only when their
pragmatic properties are sufficiently alike; and document which capabilities
are lost when substituting hardware. For a saved workspace, a shareable view
can name a logical interaction mapping (for example, a vocal gesture navigates
pie wedges) while each person supplies or chooses the device, calibration and
accessible alternative that works for them.

This is compatible with direct manipulation, not a rejection of it. [Hutchins,
Hollan and Norman](https://doi.org/10.1207/s15327051hci0104_2) discuss
direct-manipulation interfaces in terms of visible objects and actions that
are easier to perceive and understand. [Shneiderman's formulation](https://doi.org/10.1109/MC.1983.1654471)
emphasizes continuous representation, rapid incremental actions, visible
results and reversibility. Buxton asks whether the interaction channels fit
the task and preserve its flow; direct manipulation asks whether people can
see and control what the system is doing. Those are complementary design
questions.

The principles also have a workspace lineage independent of Buxton.
[Card, Robertson and York's WebBook and Web Forager](https://doi.org/10.1145/238386.238446)
(CHI '96) treated Web pages and collections as an information workspace,
including spatial and book-like ways to organize them. The [W3C Web
Annotation Data Model](https://www.w3.org/TR/annotation-model/) specifies a
portable structure for annotations that can be shared and reused across
different platforms. Neither prescribes this webtop; each offers relevant
precedent for making a person's organized view more than temporary screen
state.

## Persistent, shareable views are first-class work

A user's view is not disposable chrome around the “real” content. The chosen
articles, panes, overlays, scale, order, focus, paths, filters and annotations
can embody research, teaching, comparison or a working method. Arranging
several HyperTIES records beside an emulator or a facsimile is intellectual
work: it externalizes what the reader is comparing and keeps that relationship
available for the next session or another reader.

Treat such a view as a saved, linkable artifact—a **view overlay**—over
preserved content and applications:

- **Keep layers distinct.** The historical source remains canonical and
  unchanged. The view describes how to look at or work with it; annotations
  and interpretations remain attributed overlays, not edits silently merged
  into source material.
- **Save intent, not pixels.** Store stable resource identities, anchors,
  pane relationships, navigation position, scale, selected layers, filters,
  and relevant application state. Prefer declarative, inspectable state over
  opaque screenshots or transient browser memory. A screenshot can accompany
  a view, but cannot substitute for its structure.
- **Make it persistent and addressable.** A named view should survive reload,
  be revisitable by a stable URL or saved document, and reopen as nearly as
  possible in the same meaningful arrangement. Session-only state can still
  be useful, but should not masquerade as a durable view.
- **Make sharing deliberate and useful.** Let a reader share, publish, or
  fork a view while retaining its author, title, provenance and source
  references. Private workspaces should remain private by default; a stable
  identifier must not imply public permission to read them.
- **Make overlays composable.** A reader can layer a personal route or notes
  over a published exhibit, and a teacher can share a course view without
  copying the underlying articles. Recipients should be able to inspect,
  adapt, cite and separate each layer.
- **Survive change honestly.** Anchors can drift as an edition is corrected or
  a site changes. Keep the target URI, edition/version identity and robust
  selectors where possible; report a missing or ambiguous target instead of
  silently attaching an annotation to the wrong passage.
- **Keep agency visible.** Direct manipulation and automation should operate
  on the same visible objects and saved view. Show proposed changes, support
  undo and comparison, and make it possible to edit the view directly rather
  than requiring an agent to reconstruct it. An assistant may assemble a
  multi-pane comparison or restore a named workspace, but the result should
  be an inspectable view the person can manipulate and share through the same
  interface. This is the practical webtop connection to [the interface-to-agency
  argument](https://github.com/SimHacker/moollm/blob/main/designs/INTERFACE-TO-AGENCY.md),
  not a capability hidden behind a conversational agent.

The W3C annotation model is a useful format-level precedent for separating a
body from its target and for representing selectors and metadata. It is not a
complete workspace or window-layout standard. The webtop should use the
smallest interoperable pieces that fit, and keep its own view schema
versioned, documented and exportable.

## What this means for the webtop

The design unit is not “a browser tab with more controls.” It is a task
workspace that can open into a personal view and, when the owner chooses,
become a shareable view for others.

1. **Begin with real tasks and content.** Test designs against reading a
   linked article, following a curated path, comparing editions, teaching
   from a set of records, or pairing a publication with an interactive
   demonstration. Use the HyperTIES archive and real recovered applications
   as forcing functions; do not build a speculative feature inventory first.
2. **Preserve continuity across navigation and manipulation.** Keep a
   document's link preview in context; allow related material to open beside
   it; avoid making users repeatedly leave the primary object to operate
   navigation, tools or notes. Offer alternative input channels when they
   genuinely reduce interruption, with keyboard, touch and assistive
   technology paths as well as pointer and multi-device approaches.
3. **Make the user's arrangement meaningful.** A window or pane should stay
   attached to its content and task as the view changes. Allow useful
   arrangements to be named, saved, linked and shared—not just remembered in
   local layout preferences. Preserve a shareable arrangement when its
   component resources are transcluded, embedded or opened directly.
4. **Separate view from content and execution.** A view can point to an
   article, scanned page, recovered program, emulator or modern tool without
   copying or rewriting any of them. Interactive components should expose
   their state and controls, and distinguish original behavior from
   reconstruction.
5. **Make the overlay itself readable.** A recipient should be able to tell
   who made a view, what it contains, which sources and versions it targets,
   what is private, and what will happen when it is opened. Broken anchors,
   unavailable applications and permission boundaries should be visible.

This makes persistence and sharing part of the interface, not a later export
feature. The webtop should help people make a view, return to it, hand it to
someone else, and continue from the same visible context. A saved view is a
portable piece of thinking: a way to preserve not just information, but the
reader's relationship among the information.

## Further reading

- Buxton, W. (1988). “The Natural Language of Interaction: A Perspective on
  Non-Verbal Dialogues.” *INFOR*, 26(4), 428–438. Also revised from a 1987
  CIPS paper and reprinted in Brenda Laurel, ed., *The Art of Human-Computer
  Interface Design* (1990), pp. 405–416.
- Buxton, W. and Myers, B. (1986). “A Study in Two-Handed Input.” *Proceedings
  of CHI '86*, 321–326. [DOI](https://doi.org/10.1145/22339.22390).
- Buxton, W. (1983). “Lexical and Pragmatic Considerations of Input
  Structures.” *Computer Graphics*, 17(1), 31–37.
  [DOI](https://doi.org/10.1145/988584.988586).
- Guiard, Y. (1987). “Asymmetric Division of Labor in Human Skilled Bimanual
  Action.” *Journal of Motor Behavior*, 19(4), 486–517.
  [DOI](https://doi.org/10.1080/00222895.1987.10735426).
- Hutchins, E. L., Hollan, J. D. and Norman, D. A. (1985). “Direct
  Manipulation Interfaces.” *Human–Computer Interaction*, 1(4), 311–338.
  [DOI](https://doi.org/10.1207/s15327051hci0104_2).
- Card, S. K., Robertson, G. G. and York, W. (1996). “The WebBook and the Web
  Forager: An Information Workspace for the World-Wide Web.” *CHI '96*,
  111 ff. [DOI](https://doi.org/10.1145/238386.238446).
- Shneiderman, B. (1983). “Direct Manipulation: A Step Beyond Programming
  Languages.” *Computer*, 16(8), 57–69.
  [DOI](https://doi.org/10.1109/MC.1983.1654471).
- Sanderson, R., Ciccarese, P. and Young, B., eds. (2017). [Web Annotation
  Data Model](https://www.w3.org/TR/annotation-model/). W3C Recommendation.
