// src/components/layout/sidebar/Sidebar.tsx
import { Layout, Divider } from 'antd'
import { Logo } from './Logo'
import { MainMenu } from './MainMenu'
import { SystemMenu } from './SystemMenu'
import { BackToProjects } from './BackToProjects'
import { UserFooter } from './UserFooter'
import styles from './Sidebar.module.css'

const { Sider } = Layout

export function Sidebar() {
  return (
    <Sider
      width={240}
      className={styles.container}
      breakpoint="lg"
      collapsedWidth="0"
    >
      {/* Scrollable content area */}
      <div className={styles.content}>
        <div className={styles.logoSection}>
          <Logo />
        </div>

        <div className={styles.menuSection}>
          <MainMenu />
        </div>

        <Divider className={styles.divider} />

        <div className={styles.systemSection}>
          <SystemMenu />
        </div>
      </div>

      {/* Sticky bottom area */}
      <div className={styles.bottomSection}>
        <BackToProjects />
        <Divider className={styles.divider} />
        <UserFooter />
      </div>
    </Sider>
  )
}
