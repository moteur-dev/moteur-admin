import { type CSSProperties, type ReactNode } from 'react'

interface ContentWrapperProps {
  children: ReactNode
  style?: CSSProperties
}

export function ContentWrapper({ children, style }: ContentWrapperProps) {
  return (
    <div style={{ flex: 1, padding: 0, overflow: 'auto', ...style }}>
      {children}
    </div>
  )
}
