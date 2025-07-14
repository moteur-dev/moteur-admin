# ModelCard

A dashboard-style card for browsing and managing models within a project. It displays model metadata, field labels, and action buttons for navigation.

## Features

- Shows model label and field preview
- View entries or edit model via router navigation
- Responsive tag preview with `+X more` tooltip
- Optional metadata: entry count, last updated, thumbnail image
- Minimal layout with hoverable UX
- Fully customizable via props
- Accessible and testable

## Props

| Name            | Type                                 | Description                                 |
|------------------|--------------------------------------|---------------------------------------------|
| `projectId`     | `string`                             | Current project ID                          |
| `id`            | `string`                             | Model ID (used in links)                    |
| `label`         | `string`                             | Model label for display                     |
| `fields`        | `Record<string, { label?: string }>` | Model fields definition (for tags)          |
| `entryCount`    | `number?`                            | Optional number of entries                  |
| `updatedAt`     | `string?`                            | Optional ISO timestamp                      |
| `imageUrl`      | `string?`                            | Optional image/banner                       |
| `data-testid`   | `string?`                            | For test automation                         |

## Example

```tsx
<ModelCard
  projectId=\"demo\"
  id=\"article\"
  label=\"Article\"
  fields={{
    title: { label: 'Title' },
    body: { label: 'Content' },
    author: { label: 'Author' },
    published: { label: 'Published' },
  }}
  imageUrl=\"/img/article.png\"
  entryCount={15}
  updatedAt=\"2025-07-01T12:00:00Z\"
/>
```

## Behavior

- Fields beyond 5 are hidden behind a `+X more` tag
- Clicking "View Entries" navigates to `/projects/:projectId/models/:id/entries`
- Gear icon opens model editor at `/projects/:projectId/models/:id`
- Automatically formats `updatedAt` as a readable date

## Notes

- Use `imageUrl` to add a visual cue for model type
- Add `entryCount` and `updatedAt` for analytics UX
- Best used in grid views or dashboards