import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthContextProvider } from './components/store/auth-context';
// import { BrowserRouter } from 'react-router-dom';



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  <AuthContextProvider>

    <BrowserRouter>

      <App />

    </BrowserRouter>

  </AuthContextProvider>

);