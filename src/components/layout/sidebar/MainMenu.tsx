// src/components/layout/sidebar/MainMenu.tsx
import { Menu } from 'antd';
import { useLocation, Link } from 'react-router-dom';
import {
  FiFileText,
  FiDatabase,
  FiLayout,
  FiLayers,
} from 'react-icons/fi';

import { useCurrentProject } from '@/hooks/useCurrentProject';
import { useModels } from '@/hooks/useModels';

export function MainMenu() {
  const { pathname } = useLocation();
  const { projectId } = useCurrentProject();
  const { data: models, loading: modelsLoading, error: modelsError } = useModels(projectId ?? '');

  const modelSubItems =
    models?.length > 0
      ? models.map((model) => ({
          key: `/projects/${projectId}/models/${model.id}`,
          icon: null,
          label: (
            <Link to={`/projects/${projectId}/models/${model.id}/entries`}>
              {model.label}
            </Link>
          ),
        }))
      : [
          {
            key: 'models-empty',
            disabled: true,
            label: modelsLoading
              ? 'Loading models…'
              : modelsError
              ? 'Failed to load models'
              : 'No models found',
          },
        ];

  const items = [
    {
      key: `/projects/${projectId}/pages`,
      icon: <FiFileText />,
      label: <Link to={`/projects/${projectId}/pages`}>Pages</Link>,
    },
    {
      key: `/projects/${projectId}/models`,
      icon: <FiDatabase />,
      label: <Link to={`/projects/${projectId}/models`}>Entries</Link>,
      children: modelSubItems,
    },
    {
      key: `/projects/${projectId}/layouts`,
      icon: <FiLayout />,
      label: <Link to={`/projects/${projectId}/layouts`}>Layouts</Link>,
    },
    {
      key: `/projects/${projectId}/structures`,
      icon: <FiLayers />,
      label: <Link to={`/projects/${projectId}/structures`}>Structures</Link>,
    },
  ];

  return <Menu mode="inline" selectedKeys={[pathname]} items={items} />;
}
