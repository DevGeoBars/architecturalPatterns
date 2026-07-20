import React from 'react';
import ReactDOM from 'react-dom/client';

import { appConfig } from '@/shared/config';
import { createRootDIContainer, RootDIProvider } from "../providers/rootDI";
import { AppRouter } from "../providers/appRouter";

import '../styles/index.scss';


export const renderApp = () => {
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    throw new Error('#root элемент не найден в DOM');
  }

  const rootContainer =
    createRootDIContainer(appConfig);

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RootDIProvider container={rootContainer}>
        <AppRouter />
      </RootDIProvider>
    </React.StrictMode>,
  );
};
