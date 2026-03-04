import { createContext } from 'react';
import type { ProjectSchema } from '@/types/Project';

export type { ProjectSchema };

interface ProjectContextType {
  projectId: string | null;
  projectLabel: string | null;
  project?: ProjectSchema | null;
  setProject: (id: string, label: string, project?: ProjectSchema) => void;
}

export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);