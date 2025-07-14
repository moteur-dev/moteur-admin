// components/models/ModelFieldEditor.tsx
import { useState } from 'react';
import { Button } from 'antd';
import { FieldBuilder } from '@/components/field-builders/FieldBuilder';
import { JsonFieldEditor } from '@/components/field-builders/JsonFieldEditor'

interface ModelFieldEditorProps {
  fields: Record<string, any>;
  onChange: (fields: Record<string, any>) => void;
  readOnly?: boolean;
}

export function ModelFieldEditor({ fields, onChange, readOnly = false }: ModelFieldEditorProps) {
  const [viewMode, setViewMode] = useState<'visual' | 'json'>('visual');

  return (
    <>
      {!readOnly && (
        <div style={{ marginBottom: 16 }}>
          <Button onClick={() => setViewMode(viewMode === 'visual' ? 'json' : 'visual')}>
            Switch to {viewMode === 'visual' ? 'Raw JSON' : 'Visual Editor'}
          </Button>
        </div>
      )}

      {viewMode === 'visual' ? (
        <FieldBuilder fields={fields} onChange={onChange} readOnly={readOnly} />
      ) : (
        <JsonFieldEditor value={fields} onChange={onChange} readOnly={readOnly} />
      )}
    </>
  );
}
