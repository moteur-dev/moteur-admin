# FieldHtml

Renders a rich text field using the [Tiptap](https://tiptap.dev) editor in editable mode, or as a secure HTML preview when read-only.

Used in Moteur for fields of type `core/rich-text`.

---

## ✅ Features

- Fully featured WYSIWYG editor with Tiptap
- Rich formatting: bold, italic, lists, etc.
- Customizable toolbar, height, and layout
- Read-only mode renders safe HTML
- Integration with Ant Design layout
- Controlled via `meta` options

---

## 🛠 Props

Inherits from `BaseFieldRendererProps<string>`, with the following:

### `value: string`

HTML string to display or edit

### `readOnly?: boolean`

If `true`, renders as static HTML preview

### `onChange?: (html: string) => void`

Called when content changes (returns HTML)

### `meta?: { ... }`

| Key             | Type                          | Description                                               |
|------------------|-------------------------------|-----------------------------------------------------------|
| `displayMode`    | `'editor'` | `'preview'`        | Controls rendering (default: `'editor'`)                 |
| `toolbar`        | `boolean`                     | Whether to show the formatting toolbar (default: `true`) |
| `height`         | `number`                      | Editor/preview height in pixels (default: `240`)         |
| `compact`        | `boolean`                     | Enables smaller visual layout (`<Card size="small" />`)  |
| `label`          | `string`                      | Optional label shown in read-only preview                |

