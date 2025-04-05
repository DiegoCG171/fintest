import { Box, Typography } from "@mui/material";

function FooterComponent() {
    return (
        <Box
        component="footer"
        sx={{
            backgroundColor: (theme) => theme.palette.primary.main,
            p: 2,
            height: 40,
        }}
        >
        <Typography variant="body2" color="common.white">
            Fintest 2025
        </Typography>
        </Box>
    );
}

export default FooterComponent;
