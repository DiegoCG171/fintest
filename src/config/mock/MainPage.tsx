import { TabConfigInterface } from "../interfaces";
import TabbedTableForm from "../../components/UI/TabbedTableForm";
import TableForm from "../../components/core/table/TableForm";
import { mockFields } from "./services/rules";

export const dataMap = {
  detail: [{ campo: "", nombre: "", longitud: "", estado: "", contenido: "" }],
  errors: [{ campo: "", nombre: "", longitud: "", estado: "", contenido: "" }],
  events: [
    {
      ID: "",
      Fecha: "",
      "Tipo de Mensaje": "",
      "Tipo de Transacción": "",
      contenido: "",
      estado: "",
    },
  ],
};

const tabsContent = [
  { label: "Validación", content: <TableForm fields={mockFields} /> },
  { label: "Generación", content: "Sección de generación..." },
];

export const tabConfig: TabConfigInterface = {
  "ecommerce/ventas": [{ label: "Ventas", content: <TabbedTableForm tabs={tabsContent} /> }],
  "ecommerce/reverso": [{ label: "Reverso", content: <TabbedTableForm tabs={tabsContent} />}],
  "ecommerce/cancelacion": [{ label: "Cancelación", content: <TabbedTableForm tabs={tabsContent} />}],
  "ecommerce/ventas-ds": [{ label: "Venta con #DS", content: <TabbedTableForm tabs={tabsContent} />}],
  "ecommerce/ventas-visa": [{ label: "Venta visa", content: <TabbedTableForm tabs={tabsContent} />}],
  "ecommerce/ventas-mastercard": [{ label: "Cuenta con 3DS mastercard", content: <TabbedTableForm tabs={tabsContent} /> }],
  "moto/ventas": [{ label: "Ventas", content: <TabbedTableForm tabs={tabsContent} /> }],
  "moto/reverso": [{ label: "Reverso", content: <TabbedTableForm tabs={tabsContent} /> }],
  "moto/cancelacion": [{ label: "Cancelación", content: <TabbedTableForm tabs={tabsContent} /> }],
  "moto/ventas-ds": [{ label: "Venta con #DS", content: <TabbedTableForm tabs={tabsContent} /> }],
  "moto/ventas-visa": [{ label: "Venta visa", content: <TabbedTableForm tabs={tabsContent} /> }],
  "moto/ventas-mastercard": [{ label: "Cuenta con 3DS mastercard", content: <TabbedTableForm tabs={tabsContent} /> }],
};