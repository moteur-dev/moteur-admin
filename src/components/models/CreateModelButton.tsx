import { Button } from 'antd';
import { useState } from 'react';
import { ModelWizard } from './ModelWizard';

export function CreateModelButton({ projectId }: { projectId: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)} style={{ marginTop: '1rem' }}>
        Create New Model
      </Button>
      {open && <ModelWizard projectId={projectId} onClose={() => setOpen(false)} />}
    </>
  );
}
