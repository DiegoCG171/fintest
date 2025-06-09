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

const tabsContent = (templateId: string, canEdit: boolean, origin: 'collections' | 'categories') => [
  { label: "Validación", templateId, formType: "validationTransaction", canEdit, origin },
  { label: "Generación", templateId, formType: "generationTransaction", canEdit, origin },
];


export const tabConfig: TabConfigInterface = {
  "ecommerce/ventas": [
    { label: "Ventas", 
      content: <TabbedTableForm tabs={tabsContent("6835dbfdc9433ace61787028", true, 'collections')}/>, 
      canEdit: true
    }],
  "ecommerce/reverso": [{
    label: "Reverso", content: <TabbedTableForm tabs={tabsContent("6835dbfdc9433ace61787086", true, 'collections')}  />,
    canEdit: true
  }],
  "ecommerce/cancelacion": [{ label: "Cancelación", content: <TabbedTableForm tabs={tabsContent("ventas-ds-ecommerce", true, 'collections')} />, canEdit: true}],
  "ecommerce/ventas-ds": [{ label: "Venta con 3DS", content: <TabbedTableForm tabs={tabsContent("ventas-ds-ecommerce", true, 'collections')} />, canEdit: true}],
  "ecommerce/ventas-visa": [{ label: "Venta visa", content: <TabbedTableForm tabs={tabsContent("ventas-visa-ecommerce", true, 'collections')} />, canEdit: true}],
  "ecommerce/ventas-mastercard": [{ label: "Cuenta con 3DS mastercard", content: <TabbedTableForm tabs={tabsContent("ventas-mc-ecommerce", true, 'collections')} />, canEdit: true}],
  "moto/ventas": [{ label: "Ventas", content: <TabbedTableForm tabs={tabsContent("ventas-moto", true, 'collections')} />, canEdit: true}],
  "moto/reverso": [{ label: "Reverso", content: <TabbedTableForm tabs={tabsContent("reverso-moto", true, 'collections')} />, canEdit: true}],
  "moto/cancelacion": [{ label: "Cancelación", content: <TabbedTableForm tabs={tabsContent("cancelacion-moto", true, 'collections')} />, canEdit: true}],
  "moto/ventas-ds": [{ label: "Venta con 3DS", content: <TabbedTableForm tabs={tabsContent("ventas-ds-moto", true, 'collections')} />, canEdit: true}],
  "moto/ventas-visa": [{ label: "Venta visa", content: <TabbedTableForm tabs={tabsContent("ventas-visa-moto", true, 'collections')} />, canEdit: true}],
  "moto/ventas-mastercard": [{ label: "Cuenta con 3DS mastercard", content: <TabbedTableForm tabs={tabsContent("ventas-mc-moto", true, 'collections')} />, canEdit: true}],
  "connection/logon/logon-template": [{ label: "Logon Template", content: <TabbedTableForm tabs={tabsContent("aad61655-9dfd-4748-9c7d-0e5e5a38f2be", false, 'categories')}/>, canEdit:false}],
};
