# FieldNumber

A numeric input field using Ant Design's `InputNumber`, designed for use inside structured field renderers.

## Features

- Controlled numeric input
- Supports `min`, `max`, `step`
- Works with `null` or zero
- `readOnly` mode supported
- Customizable with `placeholder`, `className`, and `style`
- Supports `data-testid` for testing
- Keyboard and screen-reader accessible

## Props

| Name           | Type                   | Description                                |
|----------------|------------------------|--------------------------------------------|
| `value`        | `number \| null`       | Current value                              |
| `onChange`     | `(value: number) => void` | Callback on change                      |
| `readOnly`     | `boolean?`             | Prevents editing when true                |
| `min`          | `number?`              | Minimum value allowed                      |
| `max`          | `number?`              | Maximum value allowed                      |
| `step`         | `number?`              | Increment step                             |
| `placeholder`  | `string?`              | Placeholder text when value is null       |
| `className`    | `string?`              | Custom CSS class                           |
| `style`        | `React.CSSProperties?` | Inline styles                              |
| `aria-label`   | `string?`              | For accessibility & screen readers         |
| `data-testid`  | `string?`              | For testing frameworks                     |

## Example

```tsx
<FieldNumber
  value={10}
  min={0}
  max={100}
  step={5}
  onChange={(v) => console.log(v)}
  placeholder="Enter price"
  aria-label="Price field"
/>
```

## Notes

- If `value` is `null`, it behaves like an empty input
- `readOnly` disables keyboard entry but allows selection
- Wrap in form layout or pass a label externally for accessibility