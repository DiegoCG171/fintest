import { Box } from "@mui/material";

interface TagColors {
  bg: string;
  text: string;
  border: string;
}
const labelMap: Record<string, string> = {
  active: "Activo",
  new: "Nuevo",
  deactive: "Inactivo",
  pendiente: "Pendiente",
  create: "Crear",
  read: "Leer",
  update: "Actualizar",
  delete: "Eliminar",
  backup: "Respaldar",
  user: "Usuario",
  template: "Template",
  collection: "Coleccción",
  session: "Sesión",
  testcase: "Caso de Prueba",
  category: "Categoría",
  server: "Servidor"
};

const colorMap: Record<string, TagColors> = {
  active: { bg: "#C8FFC9", text: "#35AA3B", border: "transparent" }, 
  new: { bg: "#D9EDFF", text: "#184190", border: "transparent" }, 
  deactive: { bg: "#ffdcdc", text: "#ff0000", border: "transparent" },
};

const capitalize = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

interface Props {
  value: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  style?: React.CSSProperties;
}


export const TagSettingTable = ({ value, onClick, style }: Props) => {

  const colors = colorMap[value.toLowerCase()] || { bg: "#fff", text: "#454545", border: "#454545" };
  const label = labelMap[value.toLowerCase()] || value;

  return (
    <Box
      sx={{
        padding: "4px 8px",
        borderRadius: 8,
        color: colors.text,
        backgroundColor: colors.bg,
        border: `1px solid ${colors.border}`,
        fontSize: 12,
        fontWeight: 500,
        display: "inline-block",
        textAlign: "center",
        mx: "4px",
        ...style
      }}
      onClick={onClick}
    >
      {capitalize(label)}
    </Box>
  );
};