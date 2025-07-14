// components/fields/FieldRendererRegistry.ts
import type { FieldRendererProps } from './FieldRendererProps';

const registry = new Map<string, React.FC<FieldRendererProps>>();

export const FieldRendererRegistry = {
  register(type: string, renderer: React.FC<FieldRendererProps>) {
    registry.set(type, renderer);
  },
  get(type: string): React.FC<FieldRendererProps> {
    return registry.get(type) || fallback;
  },
  all(): Map<string, React.FC<FieldRendererProps>> {
    return registry;
  }
};

const fallback: React.FC<FieldRendererProps> = (props) => (
  <div style={{ color: 'red' }}>
    Unknown field type: {props?.schema?.type ?? 'undefined'}
  </div>
);
