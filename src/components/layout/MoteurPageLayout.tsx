// src/components/layout/MoteurPageLayout.tsx

import { Layout } from 'antd';
import { Sidebar } from './sidebar/Sidebar';
import { Header as AppHeader } from './header/Header';

interface MoteurPageLayoutProps {
  title?: React.ReactNode;
  children: React.ReactNode;
  extra?: React.ReactNode;
}

export function MoteurPageLayout({ title, children, extra }: MoteurPageLayoutProps) {
  return (
    <Layout style={{ minHeight: 'calc(100vh - 10px)' }}>
      <Sidebar />
      <Layout style={{ marginLeft: 10, minHeight: 'calc(100vh - 64px)', minWidth: 'calc(100vw - 270px)' }}>
        <Layout style={{ minHeight: '64px', background: '#f0f2f5', minWidth: 'calc(100% - 250px)' }}>
          <AppHeader />
        </Layout>

        <Layout style={{ padding: '1rem 1rem 1rem 0', minWidth: 'calc(100% - 250px)', minHeight: 'calc(100vh - 64px)' }}>
          <div style={{ padding: '1rem', background: '#fff', borderRadius: '8px', color: '#333' }}>
            {title && <h1>{title}</h1>}
            {extra}
            {children}
          </div>
        </Layout>
      </Layout>
    </Layout>
  );
}
