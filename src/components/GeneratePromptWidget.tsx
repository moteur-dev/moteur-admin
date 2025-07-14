import { useState, useRef } from 'react'
import {
  Button,
  Input,
  Typography,
  Image,
  Space,
  Spin,
  Alert,
  Segmented,
  Tooltip,
} from 'antd'
import { TbSquare, TbRectangle, TbRectangleVertical } from 'react-icons/tb'
import { api } from '@/utils/apiClient'

const { TextArea } = Input
const { Title } = Typography

export function GeneratePromptWidget() {
  const [prompt, setPrompt] = useState('')
  const [size, setSize] = useState<'1024x1024' | '1792x1024' | '1024x1792'>('1024x1024')
  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    setLoading(true)
    setImage(null)
    setError(null)

    try {
      const res = await api.post<{ image: string }>('/ai/generate-image', {
        prompt,
        size,
      })
      setImage(res.data.image)
      setTimeout(() => {
        imageRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 50)
    } catch (err: any) {
      console.error(err)
      setError(err.response?.data?.error || 'Image generation failed')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!image) return
    const link = document.createElement('a')
    link.href = image
    link.download = 'generated.png'
    link.click()
  }

  return (
    <div style={{ maxWidth: 720, margin: '2rem auto' }}>
      <Title level={4}>🖼️ Generate Image</Title>

      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        {/*<label htmlFor="imagePrompt" style={{ display: 'none' }}>
          Describe your image
        </label>*/}
        <TextArea
          id="imagePrompt"
          aria-label="Image description"
          aria-describedby="imagePromptHelp"
          rows={5}
          style={{ fontSize: 16, padding: 12 }}
          placeholder="e.g. A robot surfing a spreadsheet on a 1970s poster"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
        />

        {/*<Paragraph id="imagePromptHelp" type="secondary" style={{ display: 'none'}}>
          Describe the image you want to generate. Use natural language. Be as detailed as possible.
        </Paragraph>

        <label htmlFor="aspectRatio" style={{ display: 'none' }}>
          Choose aspect ratio
        </label>*/}

        <Segmented
          id="aspectRatio"
          aria-label="Image aspect ratio"
          options={[
            {
              label: <Tooltip title="Square (1024 x 1024)"><TbSquare /></Tooltip>,
              value: '1024x1024',
            },
            {
              label: <Tooltip title="Wide (1792 x 1024)"><TbRectangle /></Tooltip>,
              value: '1792x1024',
            },
            {
              label: <Tooltip title="Tall (1024 x 1792)"><TbRectangleVertical /></Tooltip>,
              value: '1024x1792',
            },
          ]}
          value={size}
          onChange={setSize}
        />

        <Button
          type="primary"
          onClick={handleGenerate}
          disabled={!prompt.trim()}
          loading={loading}
          aria-label="Generate image"
        >
          Generate Image
        </Button>

        {error && <Alert type="error" message={error} role="alert" />}

        {image && (
          <>
            <Typography.Text strong>Result:</Typography.Text>
            <Image
              /*ref={imageRef}*/
              src={image}
              alt="Generated result"
              width="100%"
            />
            <Button onClick={handleDownload} aria-label="Download image">
              Download Image
            </Button>
          </>
        )}

        {loading && !image && (
          <div aria-live="polite">
            <Spin tip="Generating image..." />
          </div>
        )}
      </Space>
    </div>
  )
}
