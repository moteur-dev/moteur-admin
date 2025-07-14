import { Button } from 'antd';
import type { TableOptions } from '@/components/entries/EntryTable';

export function generateTableOptions(model: any, onEdit?: (id: string) => void): TableOptions {
  return {
    columns: Object.entries(model.fields ?? {}).map(([key, _field]) => ({
      key,
      label: key,
      sortable: true,
    })),
    includeId: true,
    includeCreatedAt: true,
    actions: onEdit
      ? (entry) => (
          <Button size="small" onClick={() => onEdit(entry.id)} aria-label="Edit entry">
            Edit
          </Button>
        )
      : undefined,
    emptyText: 'No entries found for this model.',
  };
}