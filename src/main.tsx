import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { AppProvider } from './context/AppContext';
import { UserProvider } from './context/UserContext';
import { SRSProvider } from './context/SRSContext';
import { I18nProvider } from './i18n/I18nContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nProvider>
      <UserProvider>
        <SRSProvider>
          <AppProvider>
            <App />
          </AppProvider>
        </SRSProvider>
      </UserProvider>
    </I18nProvider>
  </React.StrictMode>
);
