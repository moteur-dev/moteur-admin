import { useContext } from "react";
import { ModelContext } from "@/providers/ModelContext";

export const useCurrentModel = () => {
  const context = useContext(ModelContext);
  if (!context) {
    throw new Error('useCurrentModel must be used within a ModelProvider');
  }
  return context;
};
