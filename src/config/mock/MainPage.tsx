import { TabConfigInterface } from "../interfaces";
import TabbedTableForm from "../../components/UI/Tabs/TabbedTableForm";
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';

export const dataMap = {
  detail: [
    {
      campo: "",
      nombre: "",
      longitud: "",
      estado: "",
      contenido: "",
    },
    {
      campo: "",
      nombre: "",
      longitud: "",
      estado: <EditNoteRoundedIcon />,
      contenido: "",
    },
  ],
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

const tabsContent = (templateId: string, disableEditing?: boolean) => [
  { label: "Validación", templateId, formType: "validationTransaction", canEdit: !disableEditing },
  { label: "Generación", templateId, formType: "generationTransaction", canEdit: !disableEditing },
];


export const tabConfig: TabConfigInterface = {
  "ecommerce/ventas": [
    { label: "Ventas", 
      content: <TabbedTableForm tabs={tabsContent("6835dbfdc9433ace61787028")} />, 
      canEdit: true
    }],
  "ecommerce/reverso": [{
    label: "Reverso", content: <TabbedTableForm tabs={tabsContent("6835dbfdc9433ace61787086")}  />,
    canEdit: true
  }],
  "ecommerce/cancelacion": [{ label: "Cancelación", content: <TabbedTableForm tabs={tabsContent("ventas-ds-ecommerce")} />, canEdit: true}],
  "ecommerce/ventas-ds": [{ label: "Venta con 3DS", content: <TabbedTableForm tabs={tabsContent("ventas-ds-ecommerce")} />, canEdit: true}],
  "ecommerce/ventas-visa": [{ label: "Venta visa", content: <TabbedTableForm tabs={tabsContent("ventas-visa-ecommerce")} />, canEdit: true}],
  "ecommerce/ventas-mastercard": [{ label: "Cuenta con 3DS mastercard", content: <TabbedTableForm tabs={tabsContent("ventas-mc-ecommerce")} />, canEdit: true}],
  "moto/ventas": [{ label: "Ventas", content: <TabbedTableForm tabs={tabsContent("ventas-moto")} />, canEdit: true}],
  "moto/reverso": [{ label: "Reverso", content: <TabbedTableForm tabs={tabsContent("reverso-moto")} />, canEdit: true}],
  "moto/cancelacion": [{ label: "Cancelación", content: <TabbedTableForm tabs={tabsContent("cancelacion-moto")} />, canEdit: true}],
  "moto/ventas-ds": [{ label: "Venta con 3DS", content: <TabbedTableForm tabs={tabsContent("ventas-ds-moto")} />, canEdit: true}],
  "moto/ventas-visa": [{ label: "Venta visa", content: <TabbedTableForm tabs={tabsContent("ventas-visa-moto")} />, canEdit: true}],
  "moto/ventas-mastercard": [{ label: "Cuenta con 3DS mastercard", content: <TabbedTableForm tabs={tabsContent("ventas-mc-moto")} />, canEdit: true}],
  "connection/logon/logon-template": [{ label: "Logon Template", content: <TabbedTableForm tabs={tabsContent("6835dbfdc9433ace61787028", true)}/>, canEdit:false}],
};
