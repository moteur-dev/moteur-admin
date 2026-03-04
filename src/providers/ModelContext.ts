// src/providers/ModelProvider.tsx
import { createContext } from 'react';
import type { ModelSchema } from '@/types/Model';

export type { ModelSchema };

interface ModelContextType {
  modelId: string | null;
  modelLabel: string | null;
  model?: ModelSchema | null;
  setModel: (id: string, label: string, model?: ModelSchema) => void;
}

export const ModelContext = createContext<ModelContextType | undefined>(undefined);