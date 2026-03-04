import { describe, it, expect, vi } from 'vitest';
import { generateTableOptions } from './generateTableOptions';

describe('generateTableOptions', () => {
  it('returns TableOptions with columns from model.fields', () => {
    const model = {
      fields: {
        title: { name: 'title', type: 'string', label: 'Title' },
        body: { name: 'body', type: 'text', label: 'Body' },
      },
    };
    const result = generateTableOptions(model);
    expect(result.columns).toHaveLength(2);
    expect(result.columns.map((c) => c.key)).toEqual(['title', 'body']);
    expect(result.columns.every((c) => c.label === c.key && c.sortable === true)).toBe(true);
  });

  it('handles missing or null fields', () => {
    const result = generateTableOptions({ fields: undefined });
    expect(result.columns).toEqual([]);
    expect(result.includeId).toBe(true);
    expect(result.includeCreatedAt).toBe(true);
    expect(result.emptyText).toBe('No entries found for this model.');
  });

  it('sets includeId and includeCreatedAt to true', () => {
    const result = generateTableOptions({ fields: {} });
    expect(result.includeId).toBe(true);
    expect(result.includeCreatedAt).toBe(true);
  });

  it('includes actions function when onEdit is provided', () => {
    const onEdit = vi.fn();
    const result = generateTableOptions({ fields: { name: {} } }, onEdit);
    expect(result.actions).toBeDefined();
    expect(typeof result.actions).toBe('function');
    // Actions renderer receives entry and should call onEdit(entry.id) when clicked
    const entry = { id: 'e1', data: {} };
    const node = result.actions!(entry);
    expect(node).toBeDefined();
  });

  it('omits actions when onEdit is not provided', () => {
    const result = generateTableOptions({ fields: {} });
    expect(result.actions).toBeUndefined();
  });
});
