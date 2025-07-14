
import { useState } from 'react';
import type { ReactNode } from 'react';
import type { ProjectSchema } from '@/providers/ProjectContext';
import { ProjectContext } from '@/providers/ProjectContext';

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projectId, setProjectId] = useState<string | null>(null);
  const [projectLabel, setProjectLabel] = useState<string | null>(null);
  const [project, setProjectState] = useState<ProjectSchema | null>(null);

  const setProject = (id: string, label: string, fullProject?: ProjectSchema) => {
    setProjectId(id);
    setProjectLabel(label);
    if (fullProject) setProjectState(fullProject);
  };

  return (
    <ProjectContext.Provider value={{ projectId, projectLabel, project, setProject }}>
      {children}
    </ProjectContext.Provider>
  );
};


