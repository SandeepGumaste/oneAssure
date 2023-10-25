import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { OptionsProvider } from './providers/OptionsProvider';

import reportWebVitals from './reportWebVitals';
import { GlobalDataProvider } from './providers/GlobalDataProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalDataProvider>
      <OptionsProvider>
        <App />
      </OptionsProvider>
    </GlobalDataProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
