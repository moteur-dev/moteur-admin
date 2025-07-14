# TextFieldEditor

Visual configuration panel for a `core/text` field in Moteur.

---

## 🧭 Tabs

| Tab         | Fields                                                       |
|-------------|--------------------------------------------------------------|
| **Main**     | `label`, `description`, `default`, `multilingual`            |
| **Options**  | `placeholder`, `autocomplete`, `allowEmpty`                  |
| **Validation** | `minLength`, `maxLength`, `pattern`, `message`             |

---

## 🧪 Usage

```tsx
<TextFieldEditor field={field} onChange={setField} />
```

`field`: The schema object for the field

`onChange`: Called when any field property changes

## 💡 Notes
Fields shown are based on the static schema for now

Will later be rendered dynamically from optionsSchema

