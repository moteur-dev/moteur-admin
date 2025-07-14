# NumberFieldEditor

Visual configuration panel for a `core/number` field in Moteur.

---

## 🧭 Tabs

| Tab       | Fields                    |
|------------|----------------------------|
| **Main**     | `label`, `default`          |
| **Options**  | `min`, `max`, `step`        |

---

## 🧪 Usage

```tsx
<NumberFieldEditor field={field} onChange={setField} />
```

- `field`: The field definition object
- `onChange`: Callback when any property changes

## 💡 Notes

- This field editor will support dynamic rendering of options from schema later via `FieldOptionsForm`.
- Only numeric values are allowed and fully validated by Ant Design's `<InputNumber />`.