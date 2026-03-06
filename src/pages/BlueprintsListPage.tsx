import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Table, Spin, Alert, Empty, Space, Typography, Modal, message, Tabs } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { useBlueprints } from '@/hooks/useBlueprints';
import { MoteurPageLayout } from '@/components/layout/MoteurPageLayout';
import { api } from '@/utils/apiClient';
import type { BlueprintSchema, BlueprintKind } from '@/hooks/useBlueprints';

const KINDS: { key: BlueprintKind; label: string }[] = [
  { key: 'project', label: 'Projects' },
  { key: 'model', label: 'Models' },
  { key: 'structure', label: 'Structures' },
];

function kindFromParam(k: string | null): BlueprintKind {
  if (k === 'model' || k === 'structure') return k;
  return 'project';
}

export function BlueprintsListPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const kind = kindFromParam(searchParams.get('kind'));
  const { data: blueprints, loading, error, refetch } = useBlueprints(kind);

  const setKind = (k: BlueprintKind) => setSearchParams(k === 'project' ? {} : { kind: k });

  const handleCreate = () => navigate(`/blueprints/new?kind=${kind}`);
  const handleEdit = (id: string, recordKind?: BlueprintKind) =>
    navigate(`/blueprints/${id}?kind=${recordKind ?? kind}`);

  const pathForKind = (k: BlueprintKind) =>
    k === 'project' ? '/blueprints/projects' : k === 'model' ? '/blueprints/models' : '/blueprints/structures';

  const handleDelete = (bp: BlueprintSchema) => {
    const bpKind = bp.kind ?? kind;
    Modal.confirm({
      title: 'Delete blueprint?',
      content: `"${bp.name}" will be removed.${bpKind === 'project' ? ' Projects created from it are not affected.' : ''}`,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await api.delete(`${pathForKind(bpKind)}/${encodeURIComponent(bp.id)}`);
          message.success('Blueprint deleted');
          refetch();
        } catch (err: any) {
          message.error(err.response?.data?.error ?? err.message ?? 'Failed to delete');
        }
      },
    });
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => <Typography.Text code>{id}</Typography.Text>,
    },
    {
      title: 'Kind',
      dataIndex: 'kind',
      key: 'kind',
      render: (k: BlueprintKind) => KINDS.find((x) => x.key === k)?.label ?? k,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      render: (d: string) => d || '—',
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 140,
      render: (_: unknown, record: BlueprintSchema) => (
        <Space>
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.id, record.kind)}
          >
            Edit
          </Button>
          <Button
            type="link"
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <MoteurPageLayout
      title="Blueprints"
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          Create Blueprint
        </Button>
      }
    >
      <Tabs
        activeKey={kind}
        onChange={(k) => setKind(k as BlueprintKind)}
        items={KINDS.map(({ key, label }) => ({ key, label }))}
        style={{ marginBottom: 16 }}
      />
      {loading && <Spin />}
      {error && (
        <Alert
          type="error"
          message="Failed to load blueprints"
          description={error}
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}
      {!loading && !error && blueprints.length === 0 && (
        <Empty
          description="No blueprints yet"
          style={{ marginTop: 24 }}
        >
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
            Create your first blueprint
          </Button>
        </Empty>
      )}
      {!loading && blueprints.length > 0 && (
        <Table
          rowKey="id"
          columns={columns}
          dataSource={blueprints}
          pagination={false}
          size="middle"
        />
      )}
    </MoteurPageLayout>
  );
}
