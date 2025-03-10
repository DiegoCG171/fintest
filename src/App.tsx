import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppRouter } from "./router";
import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { store } from "./store/";
import { Provider } from "react-redux";

import './style/style.css'

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#a41c18',
    },
    secondary: {
      main: '#af1c29',
    },
    background: {
      default: '#f5f5f5',
    },
    text: {
      primary: '#000000',
      secondary: '#757575',
    },
  },
});

function App() {
  return (
    <Provider store={store}>
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Suspense fallback={<span>Loading...</span>}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </Suspense>
    </ThemeProvider>
    </Provider>
  );
}

export default App;
