import { type FC } from 'react';
import { BrowserRouter } from "react-router-dom";
import './App.scss';


type AppProps = {};

export const App: FC<AppProps> = () => {
  return (
    <BrowserRouter>
      <div className="App-container">

      </div>
    </BrowserRouter>
  );
};