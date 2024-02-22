import '@/index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from '@/store';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/pages/routes';
import { Toast } from '@/components/ui/toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
      <Toast />
    </ReduxProvider>
  </React.StrictMode>,
);
