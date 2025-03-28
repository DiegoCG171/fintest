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
          fontSize: "12px",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          display: "inline-flex",
          justifyContent: "space-between",
          border: "1px solid #D1D1D1",
          borderRadius: 12,
          padding: "4px",
          minHeight: "40px",
          
        },
        flexContainer: {
          display: "inline-flex",
        },
        indicator: {
          display: "none",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: "12px",
          fontWeight: "bold",
          textTransform: "capitalize",
          borderRadius: 2,
          margin:2,
          padding: "6px 16px",
          minHeight: "12px",
          minWidth: "20vw",
          color: "#333",
          "&.Mui-selected": {
            backgroundColor: "#EEF7FF",
            color: "#1A71F6",
          },
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          fontSize: "12px",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          maxHeight: "18px",
        },
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
