import React from 'react';
import ReactDOM from 'react-dom/client';
import 'reflect-metadata';

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
} from '../providers/rootDI/createRootDIContainer';

import '../styles/index.scss';

export const renderApp = () => {
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
      <DIProvider
        container={rootContainer}
      >
        <AppRouter />
      </DIProvider>
    </React.StrictMode>,
  );
};
