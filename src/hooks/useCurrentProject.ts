import { useContext } from "react";
import { ProjectContext } from "@/providers/ProjectContext";

export const useCurrentProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useCurrentProject must be used within a ProjectProvider');
  }
  return context;
};