
import { Layout } from 'antd'
import { Link } from 'react-router-dom';

export function PageNotFoundPage() {
   return (
    <Layout style={{ minHeight: 'calc(100vh - 10px)' }}>
      <Layout style={{ marginLeft: 10, minHeight: 'calc(100vh - 64px)', minWidth: 'calc(100vw - 220px)'}}>
        <Layout style={{ padding: '1rem 2rem', minWidth: 'calc(100% - px)', verticalAlign: 'top' }}>
          <h1>Page not found</h1>
          <p>Try going back or <Link to="/">navigate to our main menu</Link></p>
        </Layout>
      </Layout>
    </Layout>
  )
}