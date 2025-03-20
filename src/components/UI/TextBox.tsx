import { Box, Typography } from "@mui/material";
import logo from "../../assets/logo.svg";

interface TextBoxProps {
    title: string;
    welcomeText: string;
    description: React.ReactNode;
}

function TextBox({ title, welcomeText, description }: TextBoxProps) {
    return (
        <Box
        sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "",
        }}
        >
        <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{ height: 50, mb: 4, alignSelf: "flex-start" }}
        />
        <Typography
            gutterBottom
            variant="h5"
        >
            <strong>{title}</strong>
        </Typography>
        <Typography variant="body1">
            <strong>{welcomeText}</strong>
        </Typography>
        <Typography variant="body2">
            {description}
        </Typography>
        </Box>
    );
}
export default TextBox;
