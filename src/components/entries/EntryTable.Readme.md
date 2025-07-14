# EntryTable

Renders a dynamic, schema-driven table of entries for a given model.

## Features

- Configurable via `TableOptions`
- Supports custom renderers, actions, and sorting
- Displays created date and ID
- Accessible, Ant Design-powered

## Props

| Name     | Type         | Description                                |
|----------|--------------|--------------------------------------------|
| entries  | `Entry[]`    | List of entries to render                  |
| table    | `TableOptions` | Declarative config for column layout and actions |

## 💡 TableOptions

The `table` prop configures the entire table structure:

```ts
type TableOptions = {
  columns: TableColumnConfig[];
  includeId?: boolean;         // default true
  includeCreatedAt?: boolean;  // default true
  actions?: (entry: Entry) => React.ReactNode;
  emptyText?: string;
};

type TableColumnConfig = {
  key: string;                        // field key in entry.data
  label?: string;                     // column label (defaults to key)
  visible?: boolean;                  // default: true
  width?: number;                     // optional fixed width in px
  align?: 'left' | 'center' | 'right';// optional alignment
  sortable?: boolean;                 // enables column sorting
  render?: (value: any, entry: Entry) => React.ReactNode; // custom cell renderer
};
```

### Example

```ts
const table = {
  columns: [
    { key: 'title', label: 'Title', sortable: true },
    { key: 'price', label: 'Price', sortable: true },
    {
      key: 'published',
      label: 'Published',
      render: (val) => val ? '✅' : '—',
    },
  ],
  actions: (entry) => <Button onClick={() => edit(entry.id)}>Edit</Button>,
  emptyText: 'No entries available',
};
```

### Notes

- `key` should match the field inside `entry.data`
- `render` is optional and used for custom formatting (e.g., booleans, nested objects)
- You can hide fields using `visible: false`
- Sorting only works for scalar values (strings, numbers)


## 🔧 Utility

You can generate TableOptions dynamically from a model schema using:

```ts
generateTableOptions(model, onEdit)
```

This pulls labels from field definitions and sets sane defaults.
