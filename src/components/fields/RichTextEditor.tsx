// components/fields/RichTextEditor.tsx
import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Card, Space, Button } from 'antd';

interface RichTextEditorProps {
  value: string;
  onChange?: (html: string) => void;
  toolbar?: boolean;
  height?: number;
  compact?: boolean;
  placeholder?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  toolbar = true,
  height = 200,
  compact = false,
}) => {
  const editor = useEditor({
    content: value,
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: 'tiptap-editor',
      },
    },
    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <Card size={compact ? 'small' : 'default'} style={{ padding: 0 }}>
      {toolbar && editor && (
        <Space style={{ padding: '8px 12px', borderBottom: '1px solid #eee' }}>
          <Button size="small" onClick={() => editor.chain().focus().toggleBold().run()} type={editor.isActive('bold') ? 'primary' : 'default'}>
            Bold
          </Button>
          <Button size="small" onClick={() => editor.chain().focus().toggleItalic().run()} type={editor.isActive('italic') ? 'primary' : 'default'}>
            Italic
          </Button>
          <Button size="small" onClick={() => editor.chain().focus().toggleBulletList().run()} type={editor.isActive('bulletList') ? 'primary' : 'default'}>
            List
          </Button>
        </Space>
      )}

      <div style={{ minHeight: height, padding: 12 }}>
        <EditorContent editor={editor}  />
      </div>
    </Card>
  );
};
