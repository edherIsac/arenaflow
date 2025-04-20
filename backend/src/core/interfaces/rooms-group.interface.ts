/**
 * Estructura de los mensajes dentro de la sala de chat
 */
export interface PayloadGroup {
  idConversation: string;
  room: string;
  originalMessage: string;
  languageMessageOriginal: string;
  type: string;
  sender: string;
  userId: string;
  messageTraslates?: string;
  createdAt?: string;
  idMessage?: string;
}

export interface NewMessageGroup {
  idConversation: string;
  room: string;
  originalMessage: string;
  languageMessageOriginal: string;
  type: string;
  sender: string;
  userId: string;
  messageTraslates?: TextTraslates[];
  messageTraslatesTmp?: string;
  createdAt?: string;
  idMessage?: string;
}

export interface TextTraslates {
  language: string;
  text: string;
}
