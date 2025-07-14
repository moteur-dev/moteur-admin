// src/hooks/useMoteurSocket.ts
import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

interface MoteurSocket {
  socket: Socket;
  joinRoom: (roomId: string) => void;
  leaveRoom: (roomId: string) => void;
  emit: (event: string, payload: any) => void;
  on: (event: string, callback: (...args: any[]) => void) => void;
  off: (event: string, callback?: (...args: any[]) => void) => void;
}

export function useMoteurSocket(projectId: string): MoteurSocket {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(`/ws/${projectId}`, {
      path: '/socket.io',
      transports: ['websocket'],
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, [projectId]);

  const socket = socketRef.current as Socket;

  return {
    socket,
    joinRoom: (roomId: string) => socket.emit('room:join', { roomId }),
    leaveRoom: (roomId: string) => socket.emit('room:leave', { roomId }),
    emit: (event, payload) => socket.emit(event, payload),
    on: (event, callback) => socket.on(event, callback),
    off: (event, callback) => callback ? socket.off(event, callback) : socket.off(event),
  };
}
