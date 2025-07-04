import { TableRowData } from ".";

export interface MessagesState {
  activeMessage: ActiveMessage;
  events: TableRowData[];
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
