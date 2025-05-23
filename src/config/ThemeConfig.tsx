import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { WithChildrenProps } from "./interfaces/type.interface";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1C4D8C",
      contrastText: "#048ABF",
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
      default: "#F6F6F6",
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
    body2: {
      fontSize: "0.75rem",
      [`@media (min-width:600px)`]: {
        fontSize: "0.8rem",
      },
      [`@media (min-width:900px)`]: {
        fontSize: "0.8rem",
      },
      [`@media (min-width:1200px)`]: {
        fontSize: "0.8rem",
      },
    },
  },  
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          body2: "p",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          backgroundColor: "#FFFFFF",
          "&.Mui-focused": {
            backgroundColor: "#FFFFFF",
          },
          "&:hover": {
            backgroundColor: "#FFFFFF",
          },
          "&.MuiInputBase-root": {
            backgroundColor: "#FFFFFF",
          },
          "&.MuiFilledInput-root": {
            backgroundColor: "#FFFFFF",
          },
          "&.MuiOutlinedInput-notchedOutline": {
            borderColor: "#D1D1D1",
          },
        },
        input: {
          backgroundColor: "#FFFFFF",
        },
        notchedOutline: {
          borderColor: "#D1D1D1",
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
          fontSize: "14px",
          fontWeight: "bold",
          "&:hover": {
            textDecoration: "none",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "none",
          padding: "24px",
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "none",
          border: "1px solid #D1D1D1",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: "10px",
          height: "100%"
        },
      },
    },
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          fontSize: "10px",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          maxHeight: "16px",
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {
        disableRipple: true,
      },
    },    
    MuiBreadcrumbs: {
      styleOverrides: {
        root: {
          fontSize: "10px",
          fontPalette: "#D1D1D1",
        },
      },
    },
  },
});

const ThemeConfig = ({ children }: WithChildrenProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeConfig;
