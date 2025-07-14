
import { Avatar, Dropdown, Menu, Typography } from 'antd'
import { FiUser, FiSettings, FiLogOut } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import styles from './UserFooter.module.css'

import { useAuth } from '@/hooks/useAuth';



export function UserFooter() {
  const { user, logout } = useAuth();
  const navigate = useNavigate()

  const menu = (
    <Menu selectable={false}>
      <Menu.Item key="profile" icon={<FiUser />} onClick={() => navigate('/profile')}>
        <Typography.Text>Profile</Typography.Text>
      </Menu.Item>
      <Menu.Item key="account" icon={<FiSettings />} onClick={() => navigate('/account')}>
        <Typography.Text>Account Settings</Typography.Text>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="signout" icon={<FiLogOut />} onClick={logout}>
        <Typography.Text>Sign Out</Typography.Text>
      </Menu.Item>
    </Menu>
  )

  return (
    <div className={styles.footer}>
      <Dropdown
        overlay={menu}
        trigger={['click']}
        placement="topLeft"          // open the menu upwards, anchored at the left
        overlayClassName={styles.dropdownOverlay}
      >
        <div className={styles.userInfo} role="button" tabIndex={0}>
          <Avatar
            shape='square'
            size={'large'}
            src={user!.avatar}
            icon={!user!.avatar && <FiUser />}
          />
          <span className={styles.userName}>{user!.name}</span>
        </div>
      </Dropdown>
    </div>
  )
}
