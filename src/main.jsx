import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '@/app';
import { store } from '@/store';
import { Provider as ReduxProvider } from 'react-redux';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </React.StrictMode>,
);
