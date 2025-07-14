# SaveBox

`SaveBox` is a UI widget for managing draft revisions of content entries.  
It handles saving, annotating, auto-merging, and viewing recent revisions — all with accessibility and workflow safety in mind.

## 🧠 When to Use

Use `SaveBox` in any editing context where:

- Users can save **drafts** or **publish entries**.
- You need a **change summary** (commit message-style).
- You want to **auto-merge** (publish on save), or enforce draft-only editing.
- You want to provide lightweight access to **recent revisions** inline.



## 🧩 Key Features

- Auto-merge toggle (or forced draft-only mode)
- Accessible text area for change notes
- Dynamic button labels based on mode/state
- Dropdown for recent revision history (up to 10)
- Fully customizable labels for localization or workflow-specific wording


## ⚠️ Design Constraints

- The component is **uncontrolled** for `message` and `autoMerge`. Use `initialMessage` and `initialAutoMerge` to prefill values.
- Use `forceDraftOnly` when only drafts are allowed (e.g., editors can't publish).
- `revisions` requires both `revision` and `updatedAt` to be shown.


## 🔌 Integration Notes

- `onSave` should trigger a save+persist operation and handle draft vs. final publish depending on `autoMerge`.
- Combine with `RevisionTimeline` for deeper version history.
- To prevent submission without a message, validate `message` state externally before calling `onSave`.



## 🧪 Story Variants (in Storybook)

- **Default** – basic usage
- **WithRevisions** – shows dropdown
- **ForceDraftMode** – hides merge toggle
- **CustomLabels** – localized UI
- **ManualSaveLoading** – simulates async save


## 🧭 Suggested Improvements

- Support validation errors (e.g. required message)
- Add keyboard shortcut (e.g. `Cmd+Enter` to save)
- Optional diff preview before auto-merge
