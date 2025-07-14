# NewProjectCard

A dedicated, accessible tile to trigger the creation of a new project.

## Features

- Click or `Enter` / `Space` to activate
- Uses Ant Design's Card
- Optional label and custom icon
- Fully keyboard- and screen-reader-accessible

## Props

| Name          | Type                 | Description                         |
|---------------|----------------------|-------------------------------------|
| `onClick`     | `() => void`         | Triggered when user activates card  |
| `label`       | `string?`            | Display text (default: "New Project") |
| `icon`        | `React.ReactNode?`   | Optional custom icon (default: plus) |
| `className`   | `string?`            | Custom styling                      |
| `style`       | `React.CSSProperties?`| Inline styles                      |
| `data-testid` | `string?`            | For testing                         |

## Example

```tsx
<NewProjectCard
  onClick={() => console.log('Create!')}
/>

<NewProjectCard
  label="Start New Site"
  icon={<span style={{ fontSize: 32 }}>🚀</span>}
  onClick={() => console.log('Launching!')}
/>
```

## Notes

- `icon` and `label` are optional
- Ideal for dashboard or grid layouts