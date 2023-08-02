// React
import React from 'react';
import {createRoot} from 'react-dom/client';
// Styles
import './styles/index.scss';
// Redux
import {Provider} from "react-redux";
import {setupStore} from "./store/store";
// Components
import App from "./App";
// Theming
import CssBaseline from "@mui/material/CssBaseline";
import {ThemeProvider} from "@mui/material";
import darkTheme from "./theme/theme";

const container = document.getElementById('root');
const store = setupStore();

const root = createRoot(container!);



root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)
