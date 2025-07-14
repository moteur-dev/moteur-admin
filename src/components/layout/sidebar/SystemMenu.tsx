// src/components/layout/sidebar/SystemMenu.tsx
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
  FiSettings,
  FiCreditCard,
  FiUsers,
  FiToggleLeft,
  FiBox,
  FiTool,
  FiList,
  FiGrid,
  FiDatabase,
  FiFileText,
  FiLayers,
} from 'react-icons/fi';

import { useCurrentProject } from '@/hooks/useCurrentProject';

export function SystemMenu() {
  const { pathname } = useLocation();
  const { projectId } = useCurrentProject();

  if (!projectId) return null; // prevent invalid URLs

  const base = `/projects/${projectId}`;

  const items = [
    {
      key: `${base}/customization`,
      icon: <FiTool />,
      label: <Link to={`${base}/customization`}>Customization</Link>,
      children: [
        {
          key: `${base}/customization/fields`,
          icon: <FiList />,
          label: <Link to={`${base}/customization/fields`}>Custom Fields</Link>,
        },
        {
          key: `${base}/customization/blocks`,
          icon: <FiGrid />,
          label: <Link to={`${base}/customization/blocks`}>Blocks Library</Link>,
        },
        {
          key: `${base}/customization/models`,
          icon: <FiDatabase />,
          label: <Link to={`${base}/customization/models`}>Models</Link>,
        },
        {
          key: `${base}/customization/templates`,
          icon: <FiFileText />,
          label: <Link to={`${base}/customization/templates`}>Templates</Link>,
        },
        {
          key: `${base}/customization/blueprints`,
          icon: <FiLayers />,
          label: <Link to={`${base}/customization/blueprints`}>Blueprints Manager</Link>,
        },
      ],
    },
    {
      key: `${base}/configuration`,
      icon: <FiSettings />,
      label: <Link to={`${base}/configuration`}>Configuration</Link>,
      children: [
        {
          key: `${base}/configuration/billing`,
          icon: <FiCreditCard />,
          label: <Link to={`${base}/configuration/billing`}>Billing &amp; Plan</Link>,
        },
        {
          key: `${base}/configuration/permissions`,
          icon: <FiUsers />,
          label: <Link to={`${base}/configuration/permissions`}>Users &amp; Permissions</Link>,
        },
        {
          key: `${base}/configuration/features`,
          icon: <FiToggleLeft />,
          label: <Link to={`${base}/configuration/features`}>Features list</Link>,
        },
        {
          key: `${base}/configuration/plugins`,
          icon: <FiBox />,
          label: <Link to={`${base}/configuration/plugins`}>Plugins</Link>,
        },
      ],
    },
  ];

  return <Menu mode="inline" selectedKeys={[pathname]} items={items} />;
}
