const SOCKET_BASE = import.meta.env.VITE_SOCKET_URL || window.location.origin;

export const SOCKETS = {
  messages: SOCKET_BASE,
} as const;

export type SocketKey = keyof typeof SOCKETS;
