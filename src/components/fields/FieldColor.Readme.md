# FieldColor

Renders a color field using Ant Design’s `<ColorPicker />`, or a static swatch when in read-only mode.

Used in Moteur for fields of type `core/color`.

---

## ✅ Features

- Interactive color picker with text label support
- Customizable format: `hex`, `rgb`, or `hsl`
- Read-only mode renders static color swatch
- Supports compact mode and size variations
- Accessible via `aria-label`
- Configurable via the `meta` field

---

## 🛠 Props

Inherits from `BaseFieldRendererProps<string>`, with the following:

### `value: string`

Color string (e.g. `#ff0000`, `rgb(255,0,0)`)

### `readOnly?: boolean`

If `true`, disables the picker or switches to swatch-only mode

### `onChange?: (value: string) => void`

Triggered when color changes

### `meta?: { ... }`

| Key           | Type                        | Description                                      |
|---------------|-----------------------------|--------------------------------------------------|
| `format`      | `'hex' | 'rgb' | 'hsl'`      | Format of the returned value from `onChange`     |
| `displayMode` | `'picker' | 'swatch'`        | `'picker'` (default) shows the color picker; `'swatch'` shows a static color block |
| `showText`    | `boolean`                   | Whether to show the text representation of the color |
| `compact`     | `boolean`                   | Enables a smaller visual layout of the picker   |
| `size`        | `'small' | 'default'`        | Controls size of swatch in read-only mode       |
| `label`       | `string`                    | Optional text label shown next to swatch        |

