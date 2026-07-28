import React from 'react';
import ReactDOM from 'react-dom/client';
import 'reflect-metadata';
import { PrimeReactProvider } from '@primereact/core';
import Aura from '@primeuix/themes/aura';

import {
  appConfig,
} from '@/shared/config';

import {
  DIProvider,
} from '@/shared/lib/di';

import {
  AppRouter,
} from '../providers/appRouter';

import {
  createRootDIContainer,
} from '../di/createRootDIContainer';

import '../styles/index.scss';

const primereact = {
  theme: {
    preset: Aura
  },
  license: 'PrimeUI-Commercial-Key...'
};

export const renderApp = () => {

  fetch('/api/issues')
    .then((response) => response.json())
    .then(console.log);

  const rootElement =
    document.getElementById('root');

  if (!rootElement) {
    throw new Error(
      '#root элемент не найден в DOM',
    );
  }


  const rootContainer =
    createRootDIContainer(appConfig);

  ReactDOM.createRoot(
    rootElement,
  ).render(
    <React.StrictMode>
      <PrimeReactProvider {...primereact}>
      <DIProvider
        container={rootContainer}
      >
        <AppRouter />
      </DIProvider>
      </PrimeReactProvider>
    </React.StrictMode>,
  );
};
