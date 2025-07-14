# FieldTags (`core/tags`)

Provides a flexible, schema-driven tag editor field using Ant Design. Allows users to add, remove, and optionally edit individual tags.

## Features

- Click-to-add or enter new tags inline
- Edit tags via double-click (optional)
- Supports truncation + tooltip for long tags
- Fully keyboard-accessible (`Enter`, `Esc`, `Tab`, `Blur`)
- Optional constraints: max number of tags, disallow duplicates
- Works in read-only mode with no interactive controls
- Testable with `data-testid` selectors

## Props

| Name               | Type                   | Description                                |
|--------------------|------------------------|--------------------------------------------|
| `value`            | `string[]`             | Current list of tags                       |
| `onChange`         | `(tags: string[]) => void` | Fired on add/remove/edit              |
| `readOnly`         | `boolean?`             | Disable all interaction                    |
| `schema`           | `FieldSchema?`         | Provides options via `schema.options`      |
| `placeholder`      | `string?`              | Hint text for the input                    |
| `maxTags`          | `number?`              | Maximum number of allowed tags             |
| `allowDuplicates`  | `boolean?`             | Whether repeated tags are allowed          |
| `allowEdit`        | `boolean?`             | Enable tag editing via double-click        |
| `aria-label`       | `string?`              | Accessible label for screen readers        |
| `className`        | `string?`              | CSS class for the outer container          |
| `style`            | `React.CSSProperties?` | Inline styles                              |
| `data-testid`      | `string?`              | For testing frameworks                     |

## Schema Options

```ts
optionsSchema: {
  placeholder?: string;
  maxTags?: number;
  allowDuplicates?: boolean;
  allowEdit?: boolean;
}
```

You can provide these options in your core/tags field schema via options.

Example

```tsx
<FieldTags
  value={['design', 'content']}
  onChange={(tags) => console.log(tags)}
  placeholder="Add topic"
  maxTags={5}
  allowEdit={true}
  allowDuplicates={false}
/>
```

## Notes

- Press Enter or blur input to confirm a new tag
- Press Esc to cancel editing or input
- Use allowEdit={false} to make tags fixed
- If value is undefined, will default to []
- Long tags are truncated with tooltip fallback
- Tags are stored as plain strings, not objects