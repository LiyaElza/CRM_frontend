import React, { useState } from 'react';
import { Link, Redirect} from 'react-router-dom';


const AuthContext = React.createContext({

  token: null,
  isLoggedIn: false,
  login: (token) => {},
  setUser:(user)=>{},
  logout: () => {},
});



export const AuthContextProvider = (props) => {

  const [token, setToken] = useState(null);

  const userIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);

  };
  

  const loginHandler = (token) => {
    setToken(token);
  };


  const contextValue = {
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;