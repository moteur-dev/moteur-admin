# FieldDateTime

Renders a date/time field using Ant Design’s `<DatePicker />` with support for read-only rendering, custom formats, and multiple modes.

Used in Moteur for fields of type `core/datetime`.

---

## ✅ Features

- Fully interactive date-time picker with time support
- Custom formats for both input and display
- Optional date-only or time-only modes
- Localized formatting for read-only
- Accessible label support
- Safe handling of `null` and empty values

---

## 🛠 Props

Inherits from `BaseFieldRendererProps<string | null>`, with the following:

### `value: string | null`

ISO string (e.g. `"2023-08-01T14:30:00Z"`) or `null`

### `readOnly?: boolean`

If `true`, renders formatted string instead of picker

### `onChange?: (value: string | null) => void`

Called with an ISO string or `null` when changed

### `meta?: { ... }`

| Key             | Type                         | Description                                           |
|------------------|------------------------------|-------------------------------------------------------|
| `mode`           | `'datetime' | 'date' | 'time'` | Picker mode (default: `'datetime'`)                  |
| `format`         | `string`                     | Input format string (e.g. `'YYYY-MM-DD HH:mm'`)      |
| `displayFormat`  | `string`                     | Read-only display format (e.g. `'LLL'`, `'h:mm A'`)   |
| `placeholder`    | `string`                     | Input placeholder                                     |
| `locale`         | `string`                     | Locale code (e.g. `'en'`, `'fr'`, `'de'`)             |
| `showNow`        | `boolean`                    | Show “Now” button in picker (default: `true`)        |
| `label`          | `string`                     | Optional label (shown next to read-only output)      |
