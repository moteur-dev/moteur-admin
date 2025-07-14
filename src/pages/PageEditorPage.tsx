import { useParams } from 'react-router-dom';
import { Sidebar } from '@/components/layout/sidebar/Sidebar'
import { Header as AppHeader } from '@/components/layout/header/Header'
import { Layout } from 'antd'

export function PageEditorPage() {
  const { projectId } = useParams<{ projectId: string }>()

   return (
    <Layout style={{ minHeight: 'calc(100vh - 10px)' }}>

      <Sidebar />
      <Layout style={{ marginLeft: 10, minHeight: 'calc(100vh - 64px)', minWidth: 'calc(100vw - 220px)'}}>

        <Layout style={{ minHeight: '64px', background: '#f0f2f5', minWidth: 'calc(100% - 220px)' }}>
          <AppHeader />
        </Layout>
        <Layout style={{ padding: '1rem 2rem', minWidth: 'calc(100% - px)', verticalAlign: 'top' }}>
            <div style={{ padding: '1rem', background: '#fff', borderRadius: '8px', color: '#333' }}>
                <h1>Page Editor for {projectId}</h1>
                <p>This is where the page editor will be displayed.</p>
            </div>
        </Layout>

      </Layout>

    </Layout>
  )
}