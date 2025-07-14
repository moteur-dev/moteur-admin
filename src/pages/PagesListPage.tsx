import { useParams, Link } from 'react-router-dom';
import { Sidebar } from '@/components/layout/sidebar/Sidebar'
import { Header as AppHeader } from '@/components/layout/header/Header'
import { Layout } from 'antd'
import { useProject } from '@/hooks/useProject'
import { useCurrentProject } from '@/hooks/useCurrentProject';
import { useEffect } from 'react'


export function PagesListPage() {
  const { projectId } = useParams<{ projectId: string }>()
    const { setProject } = useCurrentProject();
    const { data: project } = useProject(projectId!)
  
  useEffect(() => {
    if (project) {
      setProject(project.id, project.label);
    }
  }, [project, setProject]);
  

   return (
    <Layout style={{ minHeight: 'calc(100vh - 64px)' }}>

      <Sidebar />
      <Layout style={{ marginLeft: 10, minHeight: 'calc(100vh - 64px)', minWidth: 'calc(100vw - 270px)'}}>

        <Layout style={{ minHeight: '64px', background: '#f0f2f5', minWidth: 'calc(100% - 250px)' }}>
          <AppHeader />
        </Layout>
        <Layout style={{ padding: '1rem 1rem 1rem 0', minWidth: 'calc(100% - 250px)', verticalAlign: 'top' }}>
          <div style={{ padding: '1rem', background: '#fff', borderRadius: '8px', color: '#333' }}>
            <h1>Pages List for {projectId}</h1>
            <p>This is where the pages list will be displayed.</p>

            <Link to={`/projects/${projectId}/pages/new`}>Create a new page</Link>
          </div>

        </Layout>

      </Layout>

    </Layout>
  )
}

