import { Box } from "@mui/material";

function CustomTabPanel({children, value, index, ...other}: TabPanelProps) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tab-panel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ marginTop: 3 }}>{children}</Box>}
        </div>
    );
}
export default CustomTabPanel