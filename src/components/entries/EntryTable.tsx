// components/entries/EntryTable.tsx
import { Table, Typography } from 'antd';
import { useMemo } from 'react';

export type TableColumnConfig = {
  key: string;
  label?: string;
  visible?: boolean;
  width?: number;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  render?: (value: any, entry: any) => React.ReactNode;
};

export type TableOptions = {
  columns: TableColumnConfig[];
  includeId?: boolean;
  includeCreatedAt?: boolean;
  actions?: (entry: any) => React.ReactNode;
  emptyText?: string;
};

interface EntryTableProps {
  entries: any[];
  table: TableOptions;
}

export function EntryTable({ entries, table }: EntryTableProps) {
  const columns = useMemo(() => {
    const visibleColumns = table?.columns?.filter(col => col.visible !== false);

    const dynamicColumns = visibleColumns?.map(col => ({
      title: col.label ?? col.key,
      dataIndex: ['data', col.key],
      width: col.width,
      align: col.align,
      sorter: col.sortable
        ? (a: any, b: any) => {
            const va = a.data[col.key];
            const vb = b.data[col.key];
            return typeof va === 'string' && typeof vb === 'string'
              ? va.localeCompare(vb)
              : (va ?? 0) - (vb ?? 0);
          }
        : undefined,
      render: (val: any, record: any) =>
        col.render?.(val, record) ??
        (Array.isArray(val)
          ? val.join(', ')
          : val ?? <Typography.Text type="secondary">–</Typography.Text>),
    }));

    const base: any[] = [];

    if (table.includeId !== false) {
      base.push({
        title: 'ID',
        dataIndex: 'id',
        width: 100,
      });
    }

    const created = table.includeCreatedAt !== false
      ? [{
          title: 'Created',
          dataIndex: 'createdAt',
          width: 160,
          render: (val: string) => new Date(val).toLocaleString(),
        }]
      : [];

    const actionsCol = table.actions
      ? [{
          title: 'Actions',
          key: 'actions',
          width: 140,
          render: (_: any, entry: any) => table.actions?.(entry),
        }]
      : [];

    return [...base, ...dynamicColumns, ...created, ...actionsCol];
  }, [table]);

  return (
    <Table
      rowKey="id"
      dataSource={entries}
      columns={columns}
      pagination={{ pageSize: 10 }}
      locale={{ emptyText: table.emptyText ?? 'No entries found.' }}
    />
  );
}
