// src/components/layout/sidebar/MainMenu.tsx
import { Menu } from 'antd';
import { useLocation, Link } from 'react-router-dom';
import { FiFileText, FiLayers, FiGrid, FiDatabase } from 'react-icons/fi';

import { useCurrentProject } from '@/hooks/useCurrentProject';
import { useModels } from '@/hooks/useModels';

export function MainMenu() {
  const { pathname } = useLocation();
  const { projectId } = useCurrentProject();
  const { data: models, loading: modelsLoading, error: modelsError } = useModels(projectId ?? '');

  if (!projectId) return null;

  const base = `/projects/${projectId}`;

  const modelSubItems =
    models?.length > 0
      ? models.map((model) => ({
          key: `${base}/models/${model.id}`,
          icon: null,
          label: (
            <Link to={`${base}/models/${model.id}/entries`}>
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
      key: 'pages-group',
      icon: <FiFileText />,
      label: 'Pages & Templates',
      children: [
        {
          key: `${base}/pages`,
          icon: <FiFileText />,
          label: <Link to={`${base}/pages`}>Pages</Link>,
        },
        {
          key: `${base}/customization/templates`,
          icon: <FiFileText />,
          label: <Link to={`${base}/customization/templates`}>Templates</Link>,
        },
      ],
    },
    {
      key: 'layouts-group',
      icon: <FiLayers />,
      label: 'Layouts & Blocks',
      children: [
        {
          key: `${base}/layouts`,
          icon: <FiLayers />,
          label: <Link to={`${base}/layouts`}>Layouts</Link>,
        },
        {
          key: `${base}/customization/blocks`,
          icon: <FiGrid />,
          label: <Link to={`${base}/customization/blocks`}>Blocks</Link>,
        },
      ],
    },
    {
      key: 'models-group',
      icon: <FiDatabase />,
      label: 'Models & Entries',
      children: [
        {
          key: `${base}/models`,
          icon: <FiDatabase />,
          label: <Link to={`${base}/models`}>Models</Link>,
        },
        ...modelSubItems,
      ],
    },
  ];

  return (
    <Menu
      mode="inline"
      selectedKeys={[pathname]}
      defaultOpenKeys={['pages-group', 'layouts-group', 'models-group']}
      items={items}
    />
  );
}
