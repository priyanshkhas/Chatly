import React from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

export const serverUrl = "http://localhost:8000"; 
import {Provider} from "react-redux"
import { store } from './redux/store.js';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
