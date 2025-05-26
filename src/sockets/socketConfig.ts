export const SOCKETS = {
  messages: "http://localhost:3000/",
} as const;

export type SocketKey = keyof typeof SOCKETS;
