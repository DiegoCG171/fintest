import { Stack, Typography } from "@mui/material";
import BreadcrumbComponent from "./BreadcrumbComponent";
import { useLocation } from "react-router-dom";



function TitleHeaderComponent() {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter(Boolean);
    if (location.pathname === "/") return null;

    const resolvedTitle = pathnames[0] || "";

    return (
        <Stack sx={{pl: 1, mt:1}}>
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