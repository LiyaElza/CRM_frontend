import { useState, useRef, useContext } from 'react';


import AuthContext from '../../components/store/auth-context';
import classes from './AuthForm.module.css';

const AuthForm = () => {

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);
  
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
  
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

   

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =

        'http://127.0.0.1:8000/auth/login/';
    }
    
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
       
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication failed!';
            
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.jwt);
        sessionStorage.setItem('jwt',JSON.stringify(data.jwt))
       
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className={classes.loginPage}> 
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : ''}</h1>
      <form onSubmit={submitHandler}>
      
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? 'Login' : ''}</button>
          )}
          
        </div>
      </form>
    </section>
    </div>
  );
};

export default AuthForm;
