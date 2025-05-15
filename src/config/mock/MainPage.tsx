import { TabConfigInterface } from "../interfaces";
import TabbedTableForm from "../../components/UI/Tabs/TabbedTableForm";
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';

export const dataMap = {
  detail: [{ campo: "HD-1", nombre: "Header ISO", longitud: "fjhf", estado: "", contenido: "" }, { campo: "yrtyrtr", nombre: "tryrtyrt", longitud: "fjhf", estado: <EditNoteRoundedIcon/>, contenido: "" }],
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

const tabsContent = (templateId: string) => [
  { label: "Validación", templateId, formType: "validationTransaction" },
  { label: "Generación", templateId, formType: "generationTransaction" },
];


export const tabConfig: TabConfigInterface = {
  "ecommerce/ventas": [{ label: "Ventas", content: <TabbedTableForm tabs={tabsContent("67bce37437eeb9b499cc6e3f")} /> }],
  "ecommerce/reverso": [{ label: "Reverso", content: <TabbedTableForm tabs={tabsContent("67bce37437eeb9b499cc6e22")} /> }],
  "ecommerce/cancelacion": [{ label: "Cancelación", content: <TabbedTableForm tabs={tabsContent("ventas-ds-ecommerce")} /> }],
  "ecommerce/ventas-ds": [{ label: "Venta con 3DS", content: <TabbedTableForm tabs={tabsContent("ventas-ds-ecommerce")} /> }],
  "ecommerce/ventas-visa": [{ label: "Venta visa", content: <TabbedTableForm tabs={tabsContent("ventas-visa-ecommerce")} /> }],
  "ecommerce/ventas-mastercard": [{ label: "Cuenta con 3DS mastercard", content: <TabbedTableForm tabs={tabsContent("ventas-mc-ecommerce")} /> }],
  "moto/ventas": [{ label: "Ventas", content: <TabbedTableForm tabs={tabsContent("ventas-moto")} /> }],
  "moto/reverso": [{ label: "Reverso", content: <TabbedTableForm tabs={tabsContent("reverso-moto")} /> }],
  "moto/cancelacion": [{ label: "Cancelación", content: <TabbedTableForm tabs={tabsContent("cancelacion-moto")} /> }],
  "moto/ventas-ds": [{ label: "Venta con 3DS", content: <TabbedTableForm tabs={tabsContent("ventas-ds-moto")} /> }],
  "moto/ventas-visa": [{ label: "Venta visa", content: <TabbedTableForm tabs={tabsContent("ventas-visa-moto")} /> }],
  "moto/ventas-mastercard": [{ label: "Cuenta con 3DS mastercard", content: <TabbedTableForm tabs={tabsContent("ventas-mc-moto")} /> }],
};
