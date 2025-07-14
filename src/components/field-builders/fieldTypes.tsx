// components/field-builder/fieldTypes.ts

import {
  FontColorsOutlined,
  NumberOutlined,
  CheckSquareOutlined,
  AppstoreAddOutlined,
  FileTextOutlined,
  PictureOutlined,
  ClusterOutlined,
} from '@ant-design/icons';

export const FIELD_TYPES = [
  {
    type: 'core/text',
    icon: <FontColorsOutlined />,
    label: 'Text',
    description: 'A single-line or multi-language string.',
  },
  {
    type: 'core/number',
    icon: <NumberOutlined />,
    label: 'Number',
    description: 'Numeric values: price, quantity, score.',
  },
  {
    type: 'core/boolean',
    icon: <CheckSquareOutlined />,
    label: 'Boolean',
    description: 'A true/false toggle.',
  },
  {
    type: 'core/select',
    icon: <AppstoreAddOutlined />,
    label: 'Select',
    description: 'Choose one option from a predefined list.',
  },
  {
    type: 'core/html',
    icon: <FileTextOutlined />,
    label: 'HTML',
    description: 'Raw HTML content, multilingual.',
  },
  {
    type: 'core/image',
    icon: <PictureOutlined />,
    label: 'Image',
    description: 'Image upload with alt text.',
  },
  {
    type: 'core/structure',
    icon: <ClusterOutlined />,
    label: 'Structure',
    description: 'Nested reusable object or schema.',
  },
];

export const FIELD_TYPE_MAP = Object.fromEntries(
  FIELD_TYPES.map((def) => [def.type, def])
);