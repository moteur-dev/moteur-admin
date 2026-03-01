// src/hooks/useProjectPresence.ts
import { useState, useEffect, useCallback, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { getToken } from '@/utils/token'
import { api } from '@/utils/apiClient'

export interface OnlineUser {
  id: string
  name: string
  avatarUrl?: string
}

export type PresenceStatus = 'connecting' | 'connected' | 'error'

// Mock data for development when no token (e.g. Storybook)
const MOCK_USERS: OnlineUser[] = [
  { id: 'u1', name: 'Alice Doe', avatarUrl: '/avatars/64/lion.png' },
  { id: 'u2', name: 'Bob Smith', avatarUrl: '/avatars/64/tv-person.png' },
  { id: 'u3', name: 'Carol Jones', avatarUrl: '/avatars/64/nurse.png' },
]

function presenceToOnlineUser(p: { userId: string; name: string; avatarUrl?: string }): OnlineUser {
  return { id: p.userId, name: p.name, avatarUrl: p.avatarUrl }
}

export function useProjectPresence(projectId: string) {
  const [users, setUsers] = useState<OnlineUser[]>([])
  const [status, setStatus] = useState<PresenceStatus>('connecting')
  const socketRef = useRef<Socket | null>(null)
  const presenceMapRef = useRef<Map<string, OnlineUser>>(new Map())

  const connect = useCallback(() => {
    if (!projectId) return

    const token = getToken()
    if (import.meta.env.DEV && !token) {
      setStatus('connected')
      setUsers(MOCK_USERS)
      return
    }

    if (!token) {
      setStatus('error')
      setUsers([])
      return
    }

    setStatus('connecting')
    const apiOrigin = api.defaults.baseURL ?? window.location.origin
    const socket = io(apiOrigin, {
      auth: { token },
      path: '/socket.io',
      transports: ['websocket'],
    })

    socketRef.current = socket
    presenceMapRef.current = new Map()

    socket.on('connect', () => {
      setStatus('connected')
      socket.emit('join', { projectId })
    })

    socket.on('connect_error', () => {
      setStatus('error')
      setUsers([])
    })

    socket.on('disconnect', () => {
      setStatus('error')
    })

    socket.on('presence:sync', ({ users: presenceUsers }: { users: Array<{ userId: string; name: string; avatarUrl?: string }> }) => {
      presenceMapRef.current = new Map(
        presenceUsers.map((p) => [p.userId, presenceToOnlineUser(p)])
      )
      setUsers(Array.from(presenceMapRef.current.values()))
    })

    socket.on('presence:change', ({ userId, changes }: { userId: string; changes: Record<string, unknown> | null }) => {
      const map = presenceMapRef.current
      if (changes === null) {
        map.delete(userId)
      } else {
        const prev = map.get(userId)
        // Server sends PresenceUpdate (no name/avatarUrl); keep existing or use placeholder for new user
        map.set(userId, {
          id: userId,
          name: (changes.name as string) ?? prev?.name ?? userId,
          avatarUrl: (changes.avatarUrl as string) ?? prev?.avatarUrl,
        })
      }
      setUsers(Array.from(map.values()))
    })
  }, [projectId])

  const reconnect = useCallback(() => {
    if (import.meta.env.DEV && !getToken()) {
      setStatus('connected')
      setUsers(MOCK_USERS)
      return
    }
    socketRef.current?.disconnect()
    connect()
  }, [connect])

  useEffect(() => {
    connect()
    return () => {
      socketRef.current?.disconnect()
      socketRef.current = null
    }
  }, [connect])

  return { users, status, reconnect }
}
