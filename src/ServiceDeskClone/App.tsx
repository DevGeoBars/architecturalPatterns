import { BrowserRouter } from 'react-router-dom'


import './App.scss'


export type AppProps = {
  routes: any[]
  baseName: string
}

export const App = ({ routes, baseName }: AppProps) => {


  return (
    <BrowserRouter>
      <>as</>
    </BrowserRouter>
  )
}
