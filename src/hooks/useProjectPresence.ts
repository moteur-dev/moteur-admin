// src/hooks/useProjectPresence.ts
import { useState, useEffect, useCallback } from 'react'

export interface OnlineUser {
  id: string
  name: string
  avatarUrl?: string
}

export type PresenceStatus = 'connecting' | 'connected' | 'error'

// Mock data for development
const MOCK_USERS: OnlineUser[] = [
  { id: 'u1', name: 'Alice Doe',   avatarUrl: '/avatars/64/lion.png' },
  { id: 'u2', name: 'Bob Smith',   avatarUrl: '/avatars/64/tv-person.png' },
  { id: 'u3', name: 'Carol Jones', avatarUrl: '/avatars/64/nurse.png' },
]

export function useProjectPresence(projectId: string) {
  const [users, setUsers] = useState<OnlineUser[]>([])
  const [status, setStatus] = useState<PresenceStatus>('connecting')
  const [socket, setSocket] = useState<WebSocket | null>(null)

  const connect = useCallback(() => {
    if (import.meta.env.DEV) {
      // DEV: skip real WebSocket, use mock immediately
      setStatus('connected')
      setUsers(MOCK_USERS)
      return
    }

    setStatus('connecting')
    const ws = new WebSocket(
      `${window.location.origin.replace(/^http/, 'ws')}/ws/projects/${projectId}`
    )

    ws.onopen = () => setStatus('connected')
    ws.onmessage = (evt) => {
      try {
        const data = JSON.parse(evt.data) as OnlineUser[]
        setUsers(data)
      } catch {
        console.error('Invalid presence message')
      }
    }
    ws.onerror = () => setStatus('error')
    ws.onclose = () => setStatus('error')

    setSocket(ws)
  }, [projectId])

  const reconnect = useCallback(() => {
    if (import.meta.env.DEV) {
      // DEV: reapply mock
      setStatus('connected')
      setUsers(MOCK_USERS)
      return
    }
    socket?.close()
    connect()
  }, [socket, connect])

  useEffect(() => {
    connect()
    return () => {
      socket?.close()
    }
  }, [connect, socket])

  return { users, status, reconnect }
}
