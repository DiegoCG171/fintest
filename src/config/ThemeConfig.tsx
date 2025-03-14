import { ReactNode } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
        main: "#1A71F6",
        contrastText: "#184190",
        dark: "#1154D4",
        light: "#EEF7FF",
        },
        secondary: {
        main: "#00B0FF",
        },
        success: {
        main: "#4CAF50",
        },
        error: {
        main: "#F44336",
        },
        warning: {
        main: "#FF9800",
        },
        info: {
        main: "#2196F3",
        },
        background: {
        default: "#E7E7E7",
        paper: "#FFFFFF",
        },
        text: {
        primary: "#323130",
        secondary: "#1A71F6",
        disabled: "#737373",
        },
    },
    typography: {
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        body1: {
        color: "#454545",
        },
    },
    components: {
        MuiOutlinedInput: {
        styleOverrides: {
            root: {
            borderRadius: "12px",
            },
        },
        },
        MuiButton: {
        styleOverrides: {
            root: {
            textTransform: "none",
            borderRadius: "12px",
            color: "#fff",
            boxShadow: "none",
            backgroundColor: "#184190",
            },
        },
        },
        MuiLink: {
        styleOverrides: {
            root: {
            textDecoration: "none",
            fontSize: '14px',
            fontWeight: "bold",
            "&:hover": {
                textDecoration: "none",
            },
            },
        },
        },
    },
    });

    interface ThemeConfigProps {
    children: ReactNode;
    }

    const ThemeConfig = ({ children }: ThemeConfigProps) => {
    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
        </ThemeProvider>
    );
};

export default ThemeConfig;
