import { Stack, Typography } from "@mui/material";
import BreadcrumbComponent from "./BreadcrumbComponent";
import { useAppSelector } from "../../store";
import { originType } from "../../config/interfaces";


type TitleHeaderComponentProps = {
    routeId: string;
    origin: originType
};

function TitleHeaderComponent({ routeId, origin }: TitleHeaderComponentProps) {
    const templates = useAppSelector(state => state.templates.templates)
    const testCase = useAppSelector(state => state.testCases.testCases)

    const objectTemplate = () => {
        switch (origin) {
            case 'categories':
                return templates.find((t) => t.uuid === routeId)
            case "collections":
                return testCase.find((t) => t.uuid === routeId)
            default : return null
        }
    }        

    const routeTemplate = objectTemplate();
    const resolvedTitle = routeTemplate?.name || "";
    const basePath = Array.isArray(routeTemplate?.path) ? [...routeTemplate.path] : [];
    const pathNames = [...basePath, resolvedTitle];

    return (
        <Stack sx={{pl: 1, mt:3}}>
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
            {resolvedTitle && <BreadcrumbComponent pathNames={pathNames}/>}
        </Stack>
    );
}

export default TitleHeaderComponent;