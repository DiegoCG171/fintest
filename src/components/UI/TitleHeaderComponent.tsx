import { Stack, Typography } from "@mui/material";
import BreadcrumbComponent from "./BreadcrumbComponent";
import { useLocation } from "react-router-dom";

const TITLE_HEADER: Record<string, string> = {
    ecommerce: "Pruebas Eccomerce",
    moto: "Pruebas Moto",
};

function TitleHeaderComponent() {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter(Boolean);
    if (location.pathname === "/") return null;

    const resolvedTitle = TITLE_HEADER[pathnames[0]] || "";

    return (
        <Stack sx={{mt: -1, pl: 1}}>
            {resolvedTitle && (
                <Typography
                    variant="h6"
                    sx={{ 
                        fontWeight: "bold", 
                        textTransform: "capitalize",
                        fontSize: 16
                    }}
                >
                    {resolvedTitle}
                </Typography>
            )}
            {resolvedTitle && <BreadcrumbComponent />}
        </Stack>
    );
}

export default TitleHeaderComponent;