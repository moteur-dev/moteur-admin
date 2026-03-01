// src/hooks/useMoteurSocket.ts
/**
 * Low-level Socket.IO hook that matches the presence server contract.
 * Use this when you need to emit custom events or join/leave project rooms.
 * For presence UI (online users list), prefer useProjectPresence instead.
 *
 * Server expects: emit('join', { projectId, screenId? }) and emit('leave', { projectId }).
 */
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { getToken } from '@/utils/token';
import { api } from '@/utils/apiClient';

interface MoteurSocket {
  socket: Socket | null;
  joinProject: (projectId: string, screenId?: string) => void;
  leaveProject: (projectId: string) => void;
  emit: (event: string, payload: unknown) => void;
  on: (event: string, callback: (...args: unknown[]) => void) => void;
  off: (event: string, callback?: (...args: unknown[]) => void) => void;
}

export function useMoteurSocket(projectId: string): MoteurSocket {
  const socketRef = useRef<Socket | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!projectId) return;

    const token = getToken();
    if (!token) return;

    const apiOrigin = api.defaults.baseURL ?? window.location.origin;
    const s = io(apiOrigin, {
      auth: { token },
      path: '/socket.io',
      transports: ['websocket'],
    });

    socketRef.current = s;
    setSocket(s);

    s.on('connect', () => {
      s.emit('join', { projectId });
    });

    return () => {
      s.disconnect();
      socketRef.current = null;
      setSocket(null);
    };
  }, [projectId]);

  const joinProject = (pid: string, screenId?: string) => {
    socketRef.current?.emit('join', { projectId: pid, screenId });
  };

  const leaveProject = (pid: string) => {
    socketRef.current?.emit('leave', { projectId: pid });
  };

  const emit = (event: string, payload: unknown) => {
    socketRef.current?.emit(event, payload);
  };

  const on = (event: string, callback: (...args: unknown[]) => void) => {
    socketRef.current?.on(event, callback);
  };

  const off = (event: string, callback?: (...args: unknown[]) => void) => {
    if (callback) socketRef.current?.off(event, callback);
    else socketRef.current?.off(event);
  };

  return {
    socket,
    joinProject,
    leaveProject,
    emit,
    on,
    off,
  };
}
