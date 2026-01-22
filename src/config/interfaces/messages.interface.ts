import { TableRowData } from ".";

export interface MessagesState {
  activeMessage: ActiveMessage;
  eventsEmmisor: TableRowData[];
  eventsAcquirer: TableRowData[];
  route?: string
}


export interface ActiveMessage {
  id: number | string;
  detail: TableRowData[];
  errors: TableRowData[];
}

export interface IncomingSocketMessage {
  incremental: string;
  typeMsg: string;
  typeTx: string;
  date: string;
  errorAt: string;
  value: unknown;
  fields: TableRowData[];
}
