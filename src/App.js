import React, {useContext} from 'react';
import './App.css';
import { Route, BrowserRouter, Routes, Switch, Router,Redirect } from 'react-router-dom';
import Reports from './pages/Reports/Reports';
import Products from './pages/Products/Products';
import Offers from './pages/Offers/Offers';
import Customers from './pages/Customer/Customer';
import AuthContext from './components/store/auth-context';
import Home from './pages/Home/Home';
import AuthForm from './pages/Auth/AuthForm';
import SupportForm from './pages/Support/SupportForm';
import Message from './pages/Message/Message';
import Recommendation from './pages/Recommendation/Recommendation';

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Switch>
        {!authCtx.isLoggedIn ? ( <Route path='/' exact><AuthForm /></Route>):(
          <>
          <Route path='/' exact><Home/></Route>
          <Route path='/home' exact><Home/></Route>
          <Route path='/products' ><Products/></Route>
          <Route path='/support' ><SupportForm/></Route>
          <Route path='/customers' ><Customers/></Route>
          <Route path='/reports' ><Reports/></Route>
          <Route path='/offers' ><Offers/></Route>
          <Route path='/message' ><Message /></Route>
          <Route path='/recommendation' ><Recommendation /></Route>
          </>
        )}
      </Switch>

  );
}

export default App;
