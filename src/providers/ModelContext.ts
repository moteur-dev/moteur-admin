// src/providers/ModelProvider.tsx
import { createContext } from 'react';

export interface ModelSchema {
  id: string;
  label: string;
  fields: any;
  description?: string;
}

interface ModelContextType {
  modelId: string | null;
  modelLabel: string | null;
  model?: ModelSchema | null;
  setModel: (id: string, label: string, model?: ModelSchema) => void;
}

export const ModelContext = createContext<ModelContextType | undefined>(undefined);