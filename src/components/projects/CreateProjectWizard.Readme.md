# CreateProjectWizard

A modal-based wizard for creating new Moteur projects. Three steps: **Type** (blueprint), **Basic info**, and **Settings**.

## Features

- Accessible modal with keyboard and ARIA support
- Internal step tracking using Ant Design `Steps`
- **Step 1 – Type:** Choose a project template (blueprint) or start from an empty project
- **Step 2 – Basic info:** Project ID, name, description
- **Step 3 – Settings:** Default language, supported languages, review workflow options
- **Step 4 – Recap:** Review project title, description, and what will be created from the template (if any); then Create
- Creator is automatically added as a project member; new projects are created active
- Optional `onCreated` callback to refetch the project list after creation

## Props

| Name           | Type              | Description                                      |
|----------------|-------------------|--------------------------------------------------|
| `visible`      | `boolean`         | Whether the modal is open                       |
| `onClose`      | `() => void`      | Called when modal is cancelled or closed        |
| `onCreated`    | `() => void`?     | Called after a project is successfully created   |
| `title`        | `string?`         | Custom modal title (default: "Create New Project") |
| `width`        | `number?`         | Modal width (default: 600)                      |
| `data-testid`  | `string?`         | For integration testing                         |

## Example

```tsx
<CreateProjectWizard
  visible={show}
  onClose={() => setShow(false)}
  onCreated={refetchProjects}
  title="Start New Site"
  width={500}
  data-testid="wizard-create"
/>
```

## Notes

- Each step handles its own Next / Back / Create buttons
- `onClose` is called on cancel or after successful creation
- Project is created with the current user as a member; backend sets `isActive: true` by default
