# ProjectCard

Displays a project tile with optional cover image, metadata, and action handlers.

## Features

- Clickable and keyboard-activatable (Enter, Space)
- Optional cover image or custom icon
- Shows optional metadata (models, entries, pages)
- Accessible with ARIA roles
- Integrates with dashboards, project lists, or overview screens

## Props

| Name           | Type                            | Description                                      |
|----------------|----------------------------------|--------------------------------------------------|
| `id`           | `string`                        | Project ID                                       |
| `name`         | `string`                        | Project name to display                          |
| `description`  | `string?`                       | Optional short project summary                   |
| `coverImage`   | `string?`                       | URL for the project's preview/thumbnail image    |
| `icon`         | `React.ReactNode?`              | Optional icon (used if no image)                 |
| `stats`        | `{ models?, entries?, pages? }`| Object with numeric metadata to display          |
| `onSelect`     | `(id: string) => void`          | Fired when clicked or keyboard-selected          |
| `className`    | `string?`                       | Custom class name for styling                    |
| `style`        | `React.CSSProperties?`          | Inline styles                                    |
| `data-testid`  | `string?`                       | For testing                                      |

## Example

```tsx
<ProjectCard
  id="alpha"
  name="Marketing Website"
  description="Landing pages and brand site"
  stats={{ models: 3, entries: 12, pages: 4 }}
  onSelect={(id) => console.log('Open project', id)}
/>
```

## Notes

- `coverImage` will override the icon if provided
- `stats` can display any subset of model/entry/page counts
- Make sure to pass meaningful `aria-label` if customizing