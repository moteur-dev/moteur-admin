import { useNavigate } from 'react-router-dom';
import { Button, Table, Spin, Alert, Empty, Space, Typography, Modal, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { useBlueprints } from '@/hooks/useBlueprints';
import { MoteurPageLayout } from '@/components/layout/MoteurPageLayout';
import { api } from '@/utils/apiClient';
import type { BlueprintSchema } from '@/hooks/useBlueprints';

export function BlueprintsListPage() {
  const navigate = useNavigate();
  const { data: blueprints, loading, error, refetch } = useBlueprints();

  const handleCreate = () => navigate('/blueprints/new');
  const handleEdit = (id: string) => navigate(`/blueprints/${id}`);

  const handleDelete = (bp: BlueprintSchema) => {
    Modal.confirm({
      title: 'Delete blueprint?',
      content: `"${bp.name}" will be removed. Projects created from it are not affected.`,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await api.delete(`/blueprints/${encodeURIComponent(bp.id)}`);
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
            onClick={() => handleEdit(record.id)}
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
