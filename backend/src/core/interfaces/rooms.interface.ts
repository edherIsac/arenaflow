/**
 * Estructura de los mensajes dentro de la sala de chat
 */
export interface Payload {
  idConversation: string;
  room: string;
  originalMessage: string;
  languageMessageOriginal: string;
  languageMessageTraslates: string;
  type: string;
  sender: string;
  userId: string;
  userToId: string;
  messageTraslates?: string;
  playerId: string;
  userToSocketId: string;
  socketId: string;
  createdAt?: string;
  idMessage?: string;
}

export interface TextTraslates {
  language: string;
  text: string;
}

export interface MessageOther {
  message: string;
  messageType: string;
}
