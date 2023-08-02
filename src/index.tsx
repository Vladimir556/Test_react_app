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

const container = document.getElementById('root');
const store = setupStore();

const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
