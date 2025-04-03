import { Box, Typography } from "@mui/material";
import logo from "../../assets/logo.svg";
import { TextBoxProps } from "../../config/interfaces";

function TextBox({ title, welcomeText, description, align }: TextBoxProps) {
    return (
        <Box
        sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: align || "flex-start" ,
        }}
        >
        <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{ 
                height: 50, 
                mb: 4,
                mt: 4, 
                alignSelf: align || "flex-start" 
            }}
        />
        <Typography
            gutterBottom
            variant="h5"
        >
            <strong>{title}</strong>
        </Typography>
        <Typography variant="body1" sx={{ textAlign: align || "left" }}>
            <strong>{welcomeText}</strong>
        </Typography>
        <Typography variant="body2" sx={{ textAlign: align || "left" }}>
            {description}
        </Typography>
        </Box>
    );
}
export default TextBox;
