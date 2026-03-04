import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { Spin, Alert } from 'antd';
import { useProject } from '@/hooks/useProject';
import { useCurrentProject } from '@/hooks/useCurrentProject';
import { useCurrentModel } from '@/hooks/useCurrentModel';
import { useModel } from '@/hooks/useModel';
import { useModelEntries } from '@/hooks/useModelEntries';
import { CreateEntryButton } from '@/components/entries/CreateEntryButton';
import { EntryTable } from '@/components/entries/EntryTable';
import { MoteurPageLayout } from '@/components/layout/MoteurPageLayout';
import type { TableOptions } from '@/components/entries/EntryTable';
import { generateTableOptions } from '@/utils/generateTableOptions';

export function EntriesListPage() {
  const navigate = useNavigate();
  const { projectId, modelId } = useParams<{ projectId: string; modelId: string }>();

  const { setProject } = useCurrentProject();
  const { setModel } = useCurrentModel();
  const { data: project } = useProject(projectId!);
  const { data: model, loading, error } = useModel(projectId, modelId);
  const {
    data: entries,
    loading: entriesLoading,
    error: entriesError,
  } = useModelEntries(projectId, modelId);

  useEffect(() => {
    if (project) setProject(project.id, project.label);
  }, [project, setProject]);

  useEffect(() => {
    if (model) setModel(model.id, model.label, model);
  }, [model, setModel]);

  const table = useMemo(() => {
    if (!model || !projectId || !modelId) return undefined;
    return generateTableOptions(model, (id) =>
      navigate(`/projects/${projectId}/models/${modelId}/entries/${id}`)
    );
  }, [model, projectId, modelId, navigate]);

  // ⛔️ Defer layout rendering until model is ready
  if (!model || loading) {
    return (
      <MoteurPageLayout title="Loading entries...">
        <Spin />
      </MoteurPageLayout>
    );
  }

  return (
    <MoteurPageLayout title={`Entries for Model ${model.label}`}>
        <CreateEntryButton projectId={projectId!} model={model} />

        {error && (
          <Alert
            message="Error loading model"
            description={error}
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        {entriesError && (
          <Alert
            message="Error loading entries"
            description={entriesError}
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        {entriesLoading ? (
          <Spin />
        ) : (
          <EntryTable entries={entries} table={table as TableOptions} />
        )}
    </MoteurPageLayout>
  );
}
