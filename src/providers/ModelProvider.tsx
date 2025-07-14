// src/providers/ModelProvider.tsx
import { useState } from 'react';
import type { ReactNode } from 'react';
import type { ModelSchema } from '@/providers/ModelContext';
import { ModelContext } from '@/providers/ModelContext';


export const ModelProvider = ({ children }: { children: ReactNode }) => {
  const [modelId, setModelId] = useState<string | null>(null);
  const [modelLabel, setModelLabel] = useState<string | null>(null);
  const [model, setModelState] = useState<ModelSchema | null>(null);

  const setModel = (id: string, label: string, fullModel?: ModelSchema) => {
    setModelId(id);
    setModelLabel(label);
    if (fullModel) setModelState(fullModel);
  };

  return (
    <ModelContext.Provider value={{ modelId, modelLabel, model, setModel }}>
      {children}
    </ModelContext.Provider>
  );
};

