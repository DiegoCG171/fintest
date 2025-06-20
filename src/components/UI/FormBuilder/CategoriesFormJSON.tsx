import { Box, FormLabel, TextField, Typography } from "@mui/material";
import { useAppSelector } from "../../../store";
import CategoriesTreeSelector from "./CategoriesTreeSelector";

interface CategoriesFormJSONProps {
    onSelectCategory: (categoryId: string) => void;
    onSetTemplateName: (name: string) => void;
    templateName: string;
    showError: boolean;
}

function CategoriesFormJSON({
    onSelectCategory,
    templateName,
    showError,
    onSetTemplateName,
    }: CategoriesFormJSONProps) {
    const categoriesMenu = useAppSelector(
        (state) => state.sidebarMenu.categoriesMenu
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
        }}
        >
        <FormLabel
            htmlFor="template-name"
            sx={{ mb: 1, fontSize: "14px", fontWeight: "bold" }}
        >
            {"Nombre de Template"}
            <span style={{ color: "red" }}> *</span>
        </FormLabel>
        <TextField
            sx={{
            width: "100%",
            "& .MuiOutlinedInput-root": {
                "& input": {
                backgroundColor: "transparent",
                },
            },
            }}
            id="template-name"
            size="small"
            autoComplete="off"
            variant="outlined"
            value={templateName}
            onChange={handleChange}
            error={showError}
            helperText={showError ? "El nombre del template es obligatorio." : ""}
        />
        <Typography sx={{ mb: 2, mt: 4, fontSize: "14px", fontWeight: "bold" }}>
            {"Selecciona una categoría:"}
            <span style={{ color: "red" }}> *</span>
        </Typography>
        <CategoriesTreeSelector
            root={categoriesMenu}
            onItemSelected={(item) => onSelectCategory(item.id)}
        />
        </Box>
    );
}
export default CategoriesFormJSON;
