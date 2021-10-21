import React, { useState } from 'react';
import FirebaseObject from '../Firebase/firebase';
import * as ROUTES from '../../constants/routes';
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux'

const SignInPage = () => {

  const history = useHistory();
  const dispatch = useDispatch()
  const [INITIAL_STATE, SETINITIAL_STATE] = useState({
    email: '',
    password: '',
    error: false,
  })

  const onSubmit = event => {

    event.preventDefault();

    if (isInvalid) {
      SETINITIAL_STATE({ ...INITIAL_STATE, error: true });
      return
    }
    const { email, password } = INITIAL_STATE;

    FirebaseObject
      .doSignInWithEmailAndPassword(email, password)
      .then((authUser) => {
        SETINITIAL_STATE({ ...INITIAL_STATE });
        dispatch({ type: 'AUTH_USER_Login', login: true });
        localStorage.setItem('login', 'true');
        history.push(ROUTES.HOME);
      })
      .catch(error => {
        SETINITIAL_STATE({ ...INITIAL_STATE, error: error });
      });

  };

  const onChange = event => {
    SETINITIAL_STATE({ ...INITIAL_STATE, [event.target.name]: event.target.value });
  };


  const { email, password, error } = INITIAL_STATE;
  const isInvalid = password === '' || email === '';


  return (
    <div className="d-flex flex-column align-items-md-center my-5">
      <form onSubmit={onSubmit} className="shadow p-3 mb-5 bg-body rounded d-flex flex-column col-3 p-4">
        <div class="mb-3 my-1">
          <label className="fw-bold">Mail</label>
          <input
            name="email"
            value={email}
            onChange={onChange}
            type="text"
            className="form-control"
          />
          {!INITIAL_STATE.email && INITIAL_STATE.error && (
            <span className="fw-bold d-inline-block py-2 text-black-50">This filed must not be empty.</span>
          )}
        </div>
        <div class="mb-3 my-1">
          <label className="fw-bold">Password</label>
          <input
            name="password"
            value={password}
            onChange={onChange}
            type="password"
            className="form-control"
          />
          {!INITIAL_STATE.password && INITIAL_STATE.error && (
            <span className="fw-bold d-inline-block py-2 text-black-50">This filed must not be empty.</span>
          )}
        </div>
        <button type="submit" className="col-3 py-2">
          Sign In
        </button>
        {error && <p className="text-secondary py-2">{error.message}</p>}
      </form>
    </div>
  );

}

export default SignInPage;