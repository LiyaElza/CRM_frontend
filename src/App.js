import React, {useContext} from 'react';
import './App.css';
// import Navbar from './components/Navbar';
import { Route, BrowserRouter, Routes, Switch, Router } from 'react-router-dom';
import Reports from './pages/Reports/Reports';
import Products from './pages/Products/Products';
import Offers from './pages/Offers/Offers';
import Customers from './pages/Customer/Customer';
// import Login from './components/Login/Login';
// import AuthHome from './components/AuthHome/AuthHome';
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
        {!authCtx.isLoggedIn && ( <Route path='/' exact><AuthForm /></Route>)}
        {authCtx.isLoggedIn && ( <Route path='/' exact><Home/></Route>)}
        {authCtx.isLoggedIn && ( <Route path='/home' exact><Home/></Route>)}
        {authCtx.isLoggedIn && ( <Route path='/products' ><Products/></Route>)}
        {authCtx.isLoggedIn && ( <Route path='/support' ><SupportForm/></Route>)}
        {authCtx.isLoggedIn && ( <Route path='/customers' ><Customers/></Route>)}
        {authCtx.isLoggedIn && ( <Route path='/reports' ><Reports/></Route>)}
        {authCtx.isLoggedIn && ( <Route path='/offers' ><Offers/></Route>)}
        {authCtx.isLoggedIn && ( <Route path='/message' ><Message /></Route>)}
        {authCtx.isLoggedIn && ( <Route path='/recommendation' ><Recommendation /></Route>)}
      
        {/* {!authCtx.isLoggedIn && (
          <Route path='/auth'>
            <Home />
          </Route>
        )} */}
        {/* <Route path='/profile'> */}
          {/* {authCtx.isLoggedIn && <UserProfile />} */}
          {/* {!authCtx.isLoggedIn && <Redirect to='/auth' />} */}
        {/* </Route>
        <Route path='*'>
          <Redirect to='/' />
        </Route> */}
      </Switch>

  );
}

export default App;
