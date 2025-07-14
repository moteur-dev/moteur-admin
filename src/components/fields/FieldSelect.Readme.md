# FieldSelect

Displays a selection field using a dropdown, tag selector, or inline badge display.

Used in Moteur for fields of type `core/select`.

---

## ✅ Features

- Single or multiple selection
- Dropdown, tag-style, or inline badge rendering
- Read-only preview mode
- Custom labels and colors per option
- Optional placeholder and clearing
- Fully integrated with Ant Design

---

## 🛠 Props

Inherits from `BaseFieldRendererProps<string | string[]>`, with the following:

### `value: string | string[]`

Current selection — string for single, array for multiple.

### `readOnly?: boolean`

If `true`, renders as inline text or colored badges.

### `onChange?: (value: string | string[]) => void`

Triggered when selection changes.

### `meta?: { ... }`

| Key            | Type                                  | Description                                               |
|----------------|---------------------------------------|-----------------------------------------------------------|
| `mode`         | `'select' | 'tags' | 'inline' | 'readonly'` | UI display mode (default: `'select'`)              |
| `multiple`     | `boolean`                             | Allows multi-select (automatically inferred from value)   |
| `allowClear`   | `boolean`                             | Shows clear button (default: `true`)                      |
| `size`         | `'small' | 'default' | 'large'`       | Ant Design size variant                                   |
| `placeholder`  | `string`                              | Placeholder text                                          |
| `showSearch`   | `boolean`                             | Enables filtering search (default: `true`)                |
| `label`        | `string`                              | Optional label (used in preview mode)                     |
| `options`      | `string[]` or `{ value, label?, color? }[]` | Options to choose from; can be plain or labeled/colorized |

---

## 🎨 Option Format

You can pass options as strings:

```ts
['draft', 'published']
```
Or with labels and colors:

```ts
[
  'draft',
  { value: 'published', label: 'Published ✅', color: 'green' },
  { value: 'archived', label: 'Archived (old)', color: 'red' },
]
```