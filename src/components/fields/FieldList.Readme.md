# FieldList (`core/list`)

A flexible list field (repeater) that can render a repeatable set of values or subfields, driven by a schema.

## Features

- Render any field type (primitive or structured) in a list
- Add, remove, reorder items dynamically
- Honors `minItems`, `maxItems`, `allowEmpty`, and `sortable` from schema options
- Optional accessibility and test support (`aria-label`, `data-testid`)
- Works with Ant Design styling and layout

## Props

| Name           | Type                      | Description                             |
|----------------|---------------------------|-----------------------------------------|
| `value`        | `any[]`                   | Current list of values                  |
| `onChange`     | `(v: any[]) => void`      | Called when the list changes            |
| `schema`       | `FieldSchema`             | Must include `items` field definition   |
| `readOnly`     | `boolean?`                | Disable editing controls                |
| `itemLabel`    | `string?`                 | Optional label for each item block      |
| `addLabel`     | `string?`                 | Custom label for "Add item" button      |
| `aria-label`   | `string?`                 | Accessible label for screen readers     |
| `className`    | `string?`                 | Optional CSS class                      |
| `style`        | `React.CSSProperties?`    | Inline style                            |
| `data-testid`  | `string?`                 | Used for test targeting                 |

## Schema Options

```ts
optionsSchema: {
  allowEmpty?: boolean;
  minItems?: number;
  maxItems?: number;
  sortable?: boolean;
  uniqueItems?: boolean;
}
```

## Example

```tsx
<FieldList
  value={['a', 'b']}
  onChange={(v) => console.log(v)}
  schema={{
    type: 'core/list',
    items: { type: 'core/text' },
    options: { minItems: 1, maxItems: 5, sortable: true },
  }}
  itemLabel="Tag"
  addLabel="Add tag"
/>
```

## Notes

- You can use any field type for `items`: text, number, object, etc.
- Use `minItems`/`maxItems` to enforce constraints
- `sortable` gives up/down buttons (future: drag support)
- Will render an error message if empty when `allowEmpty: false`
- Optional props make it reusable in complex forms
