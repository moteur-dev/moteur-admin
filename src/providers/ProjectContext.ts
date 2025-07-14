import { createContext } from 'react';

// @todo use from @moteur/types
export interface ProjectSchema {
  id: string;
  label: string;
  description?: string;
  defaultLocale: string;
  supportedLocales?: string[];
  users?: string[];
  // You can extend this as needed
}

interface ProjectContextType {
  projectId: string | null;
  projectLabel: string | null;
  project?: ProjectSchema | null;
  setProject: (id: string, label: string, project?: ProjectSchema) => void;
}

export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);