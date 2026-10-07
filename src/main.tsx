import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { AppProvider } from './context/AppContext';
import { UserProvider } from './context/UserContext';
import { SRSProvider } from './context/SRSContext';
import { I18nProvider } from './i18n/I18nContext';
import { ActiveLearningProvider } from './context/ActiveLearningContext';
import { JapaneseKeyboardProvider } from './context/JapaneseKeyboardContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nProvider>
      <UserProvider>
        <SRSProvider>
          <AppProvider>
            <ActiveLearningProvider>
              <JapaneseKeyboardProvider>
                <App />
              </JapaneseKeyboardProvider>
            </ActiveLearningProvider>
          </AppProvider>
        </SRSProvider>
      </UserProvider>
    </I18nProvider>
  </React.StrictMode>
);
