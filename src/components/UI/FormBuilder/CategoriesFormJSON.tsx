import { Box, FormLabel, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useAppSelector } from "../../../store";
import CategoriesTreeSelector from "./CategoriesTreeSelector";
import { CategoriesFormJSONProps } from "../../../config/interfaces";
import RulesSelector from "./RulesSelector";

function CategoriesFormJSON({
  preselectedItemId,
  onSelectCategory,
  templateName,
  showError,
  onSetTemplateName,
  ruleSelected,
  onSelectRule,
  setShowError,
  showRuleError,
  onlyRead
}: CategoriesFormJSONProps) {
  const categoriesMenu = useAppSelector(
    (state) => state.sidebarMenu.menus["category"]
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.value;
    onSetTemplateName(name);
  };

  return (
    <Box
  sx={{
    backgroundColor: (theme) => theme.palette.background.default,
    p: 4,
    height: "55vh",
    borderRadius: 2,
    display: "flex",
    flexDirection: "column",
    gap: 2,
  }}
>
  {/* Nombre del Template */}
  <Grid>
    <FormLabel
      htmlFor="template-name"
      sx={{ mb: 1, fontSize: "14px", fontWeight: "bold", display: "block" }}
    >
      Nombre de Template <span style={{ color: "red" }}> *</span>
    </FormLabel>

    <TextField
      id="template-name"
      size="small"
      autoComplete="off"
      variant="outlined"
      value={templateName}
      onChange={handleChange}
      error={showError}
      helperText={showError ? "El nombre del template es obligatorio." : ""}
      fullWidth
      sx={{
        "& .MuiOutlinedInput-root": {
          "& input": { backgroundColor: "transparent" },
        },
      }}
    />
  </Grid>

  {/* Selector de Regla */}
  <Grid>
    <FormLabel
      sx={{ mb: 1, fontSize: "14px", fontWeight: "bold", display: "block" }}
    >
      Selecciona una Regla <span style={{ color: "red" }}> *</span>
    </FormLabel>

    <RulesSelector
      showError={showRuleError}
      setShowError={setShowError}
      ruleSelected={ruleSelected}
      onSelectRule={onSelectRule}
      onlyRead={onlyRead}
    />
  </Grid>

  {/* Selector de Categoría */}
  <Grid>
    <FormLabel
      sx={{ mb: 1, fontSize: "14px", fontWeight: "bold", display: "block" }}
    >
      Selecciona una Categoría <span style={{ color: "red" }}> *</span>
    </FormLabel>

    <CategoriesTreeSelector
      root={categoriesMenu}
      onItemSelected={(item) => onSelectCategory(item.id)}
      preselectedItemId={preselectedItemId ?? ""}
    />
  </Grid>
</Box>

  );
}
export default CategoriesFormJSON;
