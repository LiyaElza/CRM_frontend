import { useState, useRef, useContext } from 'react';
// import { useHistory } from 'react-router-dom';

import AuthContext from '../../components/store/auth-context';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  // const history = useHistory();
  // const nameInputRef = useRef();
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
    // const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: Add validation

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =

        'http://127.0.0.1:8000/auth/login/';
    }
    //  else {
    //   url =
    //     'http://127.0.0.1:8000/api/signup/';

    // }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        // name: enteredName,
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
            // if (data && data.error && data.error.message) {
            //   errorMessage = data.error.message;
            // }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        // const expirationTime = new Date(
        //   new Date().getTime() + +data.expiresIn * 1000
        // );
        authCtx.login(data.jwt);
        // authCtx.setUser({userName:data.username})
        // sessionStorage.setItem('jwt',JSON.stringify(data.jwt))
        // sessionStorage.setItem('name',JSON.stringify(data.username))
        // history.replace('/profile');
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
      {/* {!isLogin && <div className={classes.control}>
            <label htmlFor='name'>Your name</label>
          <input type='name' id='name' required ref={nameInputRef} />
        </div>} */}
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
          {/* {isLoading && <p>Sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button> */}
        </div>
      </form>
    </section>
    </div>
  );
};

export default AuthForm;