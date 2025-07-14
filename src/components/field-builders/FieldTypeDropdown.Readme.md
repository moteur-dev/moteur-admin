# FieldTypeDropdown

Custom field type selector for Moteur schema models.  
Replaces `<Select>` with icon + description-based visual options.

## Props

- `value: string` – the selected type
- `onChange(type: string)` – handler for selection
- `compact?: boolean` – hide descriptions for denser layout

## Usage

```tsx
<FieldTypeDropdown
  value="core/text"
  onChange={setType}
/>
```