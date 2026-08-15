import React from 'react';
import ReactDOM from 'react-dom/client';
import 'reflect-metadata';

import { PrimeReactProvider } from '@primereact/core';
import Aura from '@primeuix/themes/aura';
import 'primeicons/primeicons.css';

import { appConfig } from '@/shared/config';
import { DIProvider } from '@/shared/lib/di';

import { createRootDIContainer } from '../di/createRootDIContainer';
import { AppRouter } from '../router/RouterProvider';

import '../styles/index.scss';

const primereact = {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.app-dark',
    },
  },
  license: 'PrimeUI-Commercial-Key...',
};

export const renderApp = () => {
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    throw new Error('#root элемент не найден в DOM');
  }

  const rootContainer = createRootDIContainer(appConfig);

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <PrimeReactProvider {...primereact}>
        <DIProvider container={rootContainer}>
          <AppRouter />
        </DIProvider>
      </PrimeReactProvider>
    </React.StrictMode>,
  );
};
