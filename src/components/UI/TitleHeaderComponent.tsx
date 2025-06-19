import { Stack, Typography } from "@mui/material";
import BreadcrumbComponent from "./BreadcrumbComponent";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../store";



function TitleHeaderComponent() {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter(Boolean);
    const path = useAppSelector(state => state.templates.templateById?.path)
    const name = useAppSelector(state => state.templates.templateById?.name)
    const route = [...(path ?? []), name].filter(Boolean);


    console.log(route)
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