# DynamicEntryForm

A flexible schema-driven form renderer using Ant Design. It maps a field definition map to AntD `Form.Item`s and dynamic components from the FieldRendererRegistry.

## Features

- Renders any field dynamically via registry
- Supports initial values, live updates, read-only mode
- Automatically wires `value`, `onChange`, and labels
- Adds validation and help from schema metadata
- Ideal for admin interfaces, entry editors, settings panels

## Props

| Name             | Type                                  | Description                                  |
|------------------|----------------------------------------|----------------------------------------------|
| `fields`         | `Record<string, Field>`               | Map of field definitions (type, label, etc.) |
| `form`           | `FormInstance` (from AntD)            | Controlled Ant Design form instance          |
| `initialValues`  | `Record<string, any>?`                | Values to preload into the form              |
| `readOnly`       | `boolean?`                            | Disables all fields and actions              |
| `onValuesChange` | `(values: Record<string, any>) => void` | Fires on every field update               |

## Field Schema Shape

```ts
{
  title: {
    type: 'core/text',
    label: 'Title',
    description: 'Main entry title',
    required: true,
  },
  price: {
    type: 'core/number',
    label: 'Price',
    required: false,
  },
}
```

##Example

```tsx
<DynamicEntryForm
  form={form}
  fields={{
    title: { type: 'core/text', label: 'Title', required: true },
    price: { type: 'core/number', label: 'Price' },
  }}
  initialValues={{ title: 'Demo', price: 10 }}
  onValuesChange={(v) => console.log(v)}
/>
```

## Notes

- You can register additional field types via FieldRendererRegistry.register(...)
- Use readOnly for archived views or permission enforcement
- Supports validation via required, and future enhancements for minLength, max, etc.

