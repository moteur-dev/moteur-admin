# FieldBuilder

The main UI for creating and managing a model’s field schema.  
Used in model editors, structure builders, template editors, and blueprints.

---

## 🧩 Use Cases

- Creating a **model** ("Post", "Product", "Event", etc.)
- Editing a reusable **structure** ("Team Member", "SEO Meta", etc.)
- Building a **template** (Page schemas)
- Quickly scaffolding fields using natural language via AI

---

## 🎛 Features

- Visual and JSON editing toggle (`Segmented`)
- Add new fields with:
  - Unique key
  - Field type (via `FieldTypeDropdown`)
- Per-field editors powered by `FieldEditorRegistry`
- Supports deletion, reordering (future), and type changing
- AI Assistant via `/ai/generate-fields` (modal)
- Extensible: new types auto-discoverable via registry

---

## 🛠 API

| Prop       | Type                          | Description                              |
|------------|-------------------------------|------------------------------------------|
| `fields`   | `Record<string, Field>`       | Field schema object                      |
| `onChange` | `(fields: Record) => void`    | Called when fields change                |
| `readOnly` | `boolean` (optional)          | Disables interaction and AI              |

---

## 🧪 Example

```tsx
<FieldBuilder
  fields={{
    title: { type: 'core/text', label: 'Title' },
    tags: { type: 'core/select', label: 'Tags', options: ['a', 'b'] },
  }}
  onChange={(newFields) => console.log(newFields)}
/>
```

## 🔮 Tips

- Defaults to visual mode. You can start in JSON mode by setting mode in internal state.
- Readonly mode disables buttons and deletion.
- The AI assistant can be used to scaffold models: try prompts like "product with price, images and inventory".