import { Box, Card } from "@mui/material";
import BasicTable from "../../components/table/BasicTableComponent";
import TabTableComponent from "../../components/table/TabTableComponent";
import { TableRowData } from "../../config/interfaces/type.interface";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const initialRows: TableRowData[] = [
  {
    campo: "HD-1",
    nombre: "Header ISO",
    longitud: 12,
    estado: <CheckCircleIcon sx={{ color: "green" }} />,
    contenido: "ISO002600000010",
  },
  {
    campo: "DE-2",
    nombre: "Tipo Mensaje",
    longitud: 4,
    estado: "Error",
    contenido: "en 4628374823641837382173237r6476t4276347264732448396263981689263186348136472647326472863812731046723276JHDFBVLZRETSU743726936918723182981092",
  },
  {
    campo: "DE-3",
    nombre: "First Bitmap",
    longitud: 16,
    estado: "Error",
    contenido: "B2746357897844536",
  },
  {
    campo: "DE-7",
    nombre: "Secondary Bit Map",
    longitud: 10,
    estado: <CheckCircleIcon sx={{ color: "green" }} />,
    contenido: "0000000000",
  },
  {
    campo: "DE-9",
    nombre: "Processing Code",
    longitud: 6,
    estado: <CheckCircleIcon sx={{ color: "green" }} />,
    contenido: "000000",
  },
  {
    campo: "DE-12",
    nombre: "Transmission Date & Time",
    longitud: 10,
    estado: "Error",
    contenido: "032119",
  },
  {
    campo: "DE-13",
    nombre: "System Trace Audit Number",
    longitud: 6,
    estado: <CheckCircleIcon sx={{ color: "green" }} />,
    contenido: "123456",
  },
  {
    campo: "DE-14",
    nombre: "Local Transaction",
    longitud: 6,
    estado: "Error",
    contenido: "684579",
  },
  {
    campo: "DE-63",
    nombre: "Additional Data",
    longitud: 385,
    estado: <CheckCircleIcon sx={{ color: "green" }} />,
    contenido: "en-0432665463543...",
  },
  {
    campo: "DE-13",
    nombre: "System Trace Audit Number",
    longitud: 6,
    estado: <CheckCircleIcon sx={{ color: "green" }} />,
    contenido: "123456",
  },
  {
    campo: "DE-14",
    nombre: "Local Transaction",
    longitud: 6,
    estado: "Error",
    contenido: "684579",
  },
  {
    campo: "DE-63",
    nombre: "Additional Data",
    longitud: 385,
    estado: <CheckCircleIcon sx={{ color: "green" }} />,
    contenido: "en-0432665463543...",
  },
];

const tabsData = [
  { label: "Detalle", content: <div>Contenido del detalle</div> },
  { label: "Error", content: <div>Contenido del error</div> },
  {
    label: "Venta",
    content: <BasicTable initialRows={initialRows}></BasicTable>,
  },
];

function EcommerceComponent() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Card sx={{ maxHeight: "55%", minHeight: "55%" }}>
        <TabTableComponent tabs={tabsData}></TabTableComponent>
      </Card>
      <Card sx={{ maxHeight: "25%", minHeight: "25%" }}>
        <TabTableComponent tabs={tabsData}></TabTableComponent>
      </Card>
    </Box>
  );
}

export default EcommerceComponent;
