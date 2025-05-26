import { TableRowData } from "../interfaces";
import { IncomingSocketMessage } from "../interfaces/messages.interface";
import { findAllPropObjects } from "./findPropObject";

export function mapSocketMessageToTableRowData(msg: IncomingSocketMessage) {
  return {
    ID: msg.incremental,
    "Tipo de Mensaje": msg.typeMsg,
    "Tipo de Transacción": msg.typeTx,
    Fecha: msg.date,
    estado: msg.errorAt,
    fields: msg.fields,
  };
}

export function mapToErroredFields(data: TableRowData[]) {
  const fieldsError = data.flatMap((field) =>
    findAllPropObjects(field, "error") ?? []
  );

  const mapedFieldsError = fieldsError.map(mapToActiveErrorField);
  return mapedFieldsError
}


export function mapToActiveFields(data: TableRowData[]) {
  return data.map(mapToActiveField);
}

function mapToActiveField(field: TableRowData): TableRowData {
  const value = field.value;

  let content: string | number | boolean | null = null;
  let fields: TableRowData[] | undefined;

  if (Array.isArray(value)) {
    const isArrayOfObjects = value.every(
      (item) => typeof item === "object" && item !== null
    );

    if (isArrayOfObjects) {
      fields = (value as TableRowData[]).map(mapToActiveField);
    } else {
      content = JSON.stringify(value);
    }
  } else if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    content = value;
  }

  if (Array.isArray(field.fields)) {
    fields = field.fields.map(mapToActiveField);
  }

  return {
    campo: field.idBitmap,
    nombre: field.displayName,
    longitud: typeof content === "string" ? content.length : 0,
    estado: field.error ? "error" : "ok",
    contenido: content,
    fields,
  };
}

function mapToActiveErrorField(field: TableRowData) {
  return {
    campo: field.idBitmap,
    nombre: field.displayName,
    codigo: field.error?.code,
    estado: field.error ? "error" : "ok",
    detalle: field.error?.data.validation || field.error?.data.length || field.error?.data.regex
  }
}