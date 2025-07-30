import {
  Box,
  Button,
  Card,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import BasicTable from "../../components/UI/Settings/SettingsTable";
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';

export const SettingsPage = () => {
  const responsiveWidth = () => {
    // if (hideMenu) return "calc(100vw - 100px)";
    return "calc(100vw - 300px)";
  };
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        backgroundColor: "#f7f7f7",
      }}
    >
      <Typography
        sx={{ marginLeft: 4, marginTop: 4, fontSize: 24, fontWeight: "bold" }}
      >
        Gestión de Usuarios
      </Typography>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          overflow: "hidden",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          my: 4,
        }}
      >
        <Card
          sx={{
            flex: 7,
            display: "flex",
            flexDirection: "column",
            minWidth: responsiveWidth(),
            maxWidth: responsiveWidth(),
            overflow: "hidden",
          }}
        >
          <Stack direction={"row"} justifyContent="space-between">
            <Stack direction={"row"} gap={2}>
              <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 200,
                  height: 36,
                }}
                onSubmit={(e) => e.preventDefault()}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1, fontSize: 14 }}
                  placeholder="Buscar"
                  inputProps={{ "aria-label": "barra de búsqueda" }}
                />
                <IconButton type="submit" sx={{ p: "6px" }} aria-label="search">
                  <SearchIcon />
                </IconButton>
              </Paper>
              <Button variant="outlined"  endIcon={<FilterListOutlinedIcon />}>
                Filtrar
              </Button>
            </Stack>
             <Button variant="outlined"  endIcon={<PersonAddOutlinedIcon />}>
                Crear usuario
              </Button>
          </Stack>
          <BasicTable />
        </Card>
      </Box>
    </Box>
  );
};
