# FieldBoolean

Renders a boolean field using a toggle switch or plain text label.

Used in Moteur for fields of type `core/boolean`.

---

## ✅ Features

- Renders as a toggle (`<Switch />`) or read-only text
- Accessible with `aria-label`
- Supports label next to the switch
- Customizable display text (e.g. "Yes"/"No", "Visible"/"Hidden")
- Optionally rendered in `text` mode for read-only table display

---

## 🛠 Props

Inherits from `BaseFieldRendererProps<boolean>`, with the following:

### `value: boolean`

Current field value (true/false)

### `readOnly?: boolean`

If `true`, disables the switch (or switches to text mode if `meta.displayMode === 'text'`)

### `onChange?: (value: boolean) => void`

Called when the switch is toggled

### `meta?: { ... }`

| Key              | Type                   | Description                                      |
|------------------|------------------------|--------------------------------------------------|
| `label`          | `string`               | Label shown next to the switch (optional)        |
| `onLabel`        | `string`               | Text shown when `true` (text mode only)          |
| `offLabel`       | `string`               | Text shown when `false` (text mode only)         |
| `size`           | `'small' | 'default'`  | Size of the switch                               |
| `displayMode`    | `'switch' | 'text'`     | Switch for interactive toggle vs static label    |


