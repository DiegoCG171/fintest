export interface Message {
  uuid:        string;
  interfaceId: string;
  userId:      string;
  schemaId:    string;
  errorAt:     string;
  date:   number;
  typeMsg: string;
  typeTx: string;
  incremental: number;
  value: string;
  fields: MessageField[];
  createdAt?: number;
}

export interface RequestMessage {
  value: string;
  fields: MessageField[];
}

export interface MessageField {
  id?:       string;
  idBitmap?: string;
  value?:    string;
  displayName?: string;
  header?: string;
  error?: unknown;
  fields?:  MessageField[];
}

export interface FieldField {
  idBitmap?: string;
  header?: string;
  value:     ValueElement[] | string;
  id?:       string;
}

export interface ValueElement {
  id:    string;
  value: string;
  displayName: string;
}

export interface MessagesList {
  messageData: MessageData,
  message: Message
}

export interface MessageData {
  incremental: number;
  typeMessage: string;
  status: string;
  createAt: number;
  typeTransaction: ValueElement[] | string;
  plot: string;
  plotResponse: string;
}