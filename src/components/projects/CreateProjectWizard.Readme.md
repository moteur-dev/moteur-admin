# CreateProjectWizard

A modal-based wizard for setting up new Moteur projects. Includes multiple steps like blueprint selection, content editing, and validation.

## Features

- Accessible modal with keyboard and ARIA support
- Internal step tracking using Ant Design `Steps`
- Three customizable phases:
  - Blueprint selection
  - AI content editing
  - Final review
- Can be triggered programmatically
- Accepts props for title, width, and test ID

## Props

| Name           | Type              | Description                                 |
|----------------|-------------------|---------------------------------------------|
| `visible`      | `boolean`         | Whether the modal is open                   |
| `onClose`      | `() => void`      | Triggered when modal is cancelled or done   |
| `title`        | `string?`         | Custom modal title                          |
| `width`        | `number?`         | Optional modal width (default: 600)         |
| `data-testid`  | `string?`         | For integration testing                     |

## Example

```tsx
<CreateProjectWizard
  visible={show}
  onClose={() => setShow(false)}
  title="Start New Site"
  width={500}
  data-testid="wizard-create"
/>
```

## Notes

- Each step has its own internal navigation (`onNext`, `onBack`)
- `onClose` is called on cancel or completion
- Replace internal steps with your own to generalize this as a Wizard pattern