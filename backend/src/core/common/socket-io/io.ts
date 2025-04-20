import { Server } from 'socket.io';

let io: Server = null;

export const setSocket = (value: Server) => {
  io = value;
};

export const getIo = (): Server => {
  return io;
};
