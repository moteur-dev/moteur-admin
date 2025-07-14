import { useState, useEffect } from 'react';
import {
  Input,
  Button,
  Switch,
  Typography,
  Space,
  Divider,
  Dropdown,
  Menu,
} from 'antd';
import { DownOutlined } from '@ant-design/icons';

type Revision = {
  id: string;
  number: number;
  message?: string;
  savedAt: string;
};

type SaveBoxProps = {
  isDraft: boolean;
  revision?: number;
  updatedAt?: string;
  onSave: (data: { message: string; autoMerge: boolean }) => void;
  onCancel: () => void;
  forceDraftOnly?: boolean;
  revisions?: Revision[];
  onSelectRevision?: (revisionId: string) => void;
  initialMessage?: string;
  initialAutoMerge?: boolean;
  loading?: any;
  labels?: {
    saveEntry?: string;
    createDraft?: string;
    updateDraft?: string;
    cancel?: string;
    toggleAutoMergeOn?: string;
    toggleAutoMergeOff?: string;
    changeSummary?: string;
    noDraft?: string;
  };
};

export function SaveBox({
  isDraft,
  revision,
  updatedAt,
  onSave,
  onCancel,
  forceDraftOnly = false,
  revisions = [],
  onSelectRevision,
  initialMessage = '',
  initialAutoMerge = false,
  labels = {},
}: SaveBoxProps) {
  const [message, setMessage] = useState(initialMessage);
  const [autoMerge, setAutoMerge] = useState(initialAutoMerge);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMessage(initialMessage);
  }, [initialMessage]);

  useEffect(() => {
    setAutoMerge(initialAutoMerge);
  }, [initialAutoMerge]);

  const handleSave = async () => {
    setLoading(true);
    await onSave({ message, autoMerge: forceDraftOnly ? false : autoMerge });
    setLoading(false);
  };

  const getButtonLabel = () => {
    if (!forceDraftOnly && autoMerge) return labels.saveEntry ?? 'Save entry';
    return isDraft
      ? labels.updateDraft ?? 'Save (update draft)'
      : labels.createDraft ?? 'Save (create draft)';
  };

  const renderRevisionDropdown = () => {
    if (!revisions.length || !revision || !updatedAt) return null;

    const menu = (
      <Menu>
        {revisions.map((rev) => (
          <Menu.Item
            key={rev.id}
            onClick={() => onSelectRevision?.(rev.id)}
          >
            Revision #{rev.number} — {new Date(rev.savedAt).toLocaleString()}
          </Menu.Item>
        ))}
      </Menu>
    );

    return (
      <Dropdown overlay={menu} placement="bottomRight">
        <Typography.Text
          type="secondary"
          style={{ cursor: 'pointer' }}
          aria-live="polite"
        >
          Draft #{revision} · Last updated {new Date(updatedAt).toLocaleString()}{' '}
          <DownOutlined />
        </Typography.Text>
      </Dropdown>
    );
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <label htmlFor="change-message">
          <Typography.Text strong>
            {labels.changeSummary ?? 'Change Summary'}
          </Typography.Text>
        </label>

        {renderRevisionDropdown() || (
          <Typography.Text type="secondary" aria-live="polite">
            {labels.noDraft ?? 'No draft available'}
          </Typography.Text>
        )}
      </div>

      <Input.TextArea
        id="change-message"
        aria-labelledby="change-message-label"
        rows={2}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Describe your changes..."
      />

      <div>
        <Space>
          {!forceDraftOnly && (
            <>
              <Switch
                aria-role="switch"
                aria-label="Toggle auto-merge"
                checked={autoMerge}
                onChange={setAutoMerge}
              />
              <Typography.Text>
                {autoMerge
                  ? labels.toggleAutoMergeOn ?? 'Auto-merge'
                  : labels.toggleAutoMergeOff ?? 'Keep draft'}
              </Typography.Text>
              <Divider type="vertical" />
            </>
          )}

          <Button
            onClick={onCancel}
            aria-label="Cancel and discard changes"
            style={{ marginRight: 8 }}
          >
            {labels.cancel ?? 'Cancel'}
          </Button>

          <Button
            type="primary"
            onClick={handleSave}
            loading={loading}
            aria-label="Save changes. This will create a new draft or update the current one. It will publish the entry if auto-merge is enabled."
          >
            {getButtonLabel()}
          </Button>
        </Space>
      </div>
    </Space>
  );
}
