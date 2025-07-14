// components/entries/CreateEntryButton.tsx
import { Button } from 'antd';
import { useState } from 'react';
import { EntryWizard } from './EntryWizard';

export function CreateEntryButton({ projectId, model }: { projectId: string; model: any }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Create New Entry
      </Button>
      {open && (
        <EntryWizard
          projectId={projectId}
          modelId={model.id}
          model={model}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
