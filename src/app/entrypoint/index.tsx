import React from 'react';
import ReactDOM from 'react-dom/client';

import { AppRouter } from '../providers/AppRouter';

import '../styles/index.scss'

export const renderApp = () => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <AppRouter/>
    </React.StrictMode>
  );
}
