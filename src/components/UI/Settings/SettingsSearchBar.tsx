import { Paper, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
}

export const SettingsSearchBar = ({ value, onChange, onSubmit }: Props) => (
  <Paper
    component="form"
    sx={{
      p: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: 300,
      height: 36,
    }}
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit();
    }}
  >
    <InputBase
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{ ml: 1, flex: 1, fontSize: 14 }}
      placeholder="Buscar"
      inputProps={{ "aria-label": "barra de búsqueda" }}
    />
    <IconButton type="submit" sx={{ p: "6px" }} aria-label="search">
      <SearchIcon />
    </IconButton>
  </Paper>
);
