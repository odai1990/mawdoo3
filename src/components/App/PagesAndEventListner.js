import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Navigation from '../Navigation';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import HomePage from '../Home';
import * as ROUTES from '../../constants/routes';
import FirebaseObject from '../Firebase/firebase';
import { useSelector, useDispatch } from 'react-redux'


const PagesAndEventListner = () => {
  const history = useHistory();
  const isLogin = useSelector(state => state.login);
  const isRegister = useSelector(state => state.authUser);
  const dispatch = useDispatch()
  useEffect(() => {
    FirebaseObject.onAuthUserListener(
      authUser => {

        if (localStorage.authUser) {
          dispatch({ type: 'AUTH_USER_SET', authUser: JSON.parse(localStorage.getItem('authUser')) })
          dispatch({ type: 'AUTH_USER_Login', login: Boolean(JSON.parse(localStorage.getItem('login'))) })
          if (Boolean(JSON.parse(localStorage.getItem('login')))) {
            history.push(ROUTES.HOME);
          }
          else {
            history.push(ROUTES.SIGN_IN);
          }
        } else {
          if (authUser) {
            localStorage.setItem('authUser', JSON.stringify(authUser));
            localStorage.setItem('login', 'false');
            dispatch({ type: 'AUTH_USER_SET', authUser })
            history.push(ROUTES.SIGN_IN);
          } else {
            history.push(ROUTES.SIGN_UP);
          }
        }
      },
      () => {

        if (Boolean(JSON.parse(localStorage.getItem('login')))) {
          localStorage.setItem('login', 'false');
          dispatch({ type: 'AUTH_USER_Login', login: Boolean(JSON.parse(localStorage.getItem('login'))) })
          history.push(ROUTES.SIGN_IN);
        }

      },
    );
  }, [])

  return (
    <div>
      <Navigation />
      {isLogin && <Route path={ROUTES.HOME} exact component={HomePage} />}
      {!isLogin && <Route path={'/'} exact component={SignUpPage} />}
      {(isRegister && !isLogin) && <Route path={ROUTES.SIGN_IN} exact component={SignInPage} />}
    </div>
  );
}


export default PagesAndEventListner;