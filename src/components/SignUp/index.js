import React, { useState } from "react";
import FirebaseObject from "../Firebase/firebase";
import * as ROUTES from "../../constants/routes";
import { Link, useHistory } from "react-router-dom";

const SignUpPage = () => {
  const history = useHistory();
  const [INITIAL_STATE, SETINITIAL_STATE] = useState({
    age: "",
    email: "",
    passwordOne: "",
    passwordTwo: "",
    counrty: "",
    checked: true,
    error: false,
  });

  const ERROR_CODE_ACCOUNT_EXISTS = "auth/email-already-in-use";

  const ERROR_MSG_ACCOUNT_EXISTS = `
    An account with this E-Mail address already exists.
    Try to login with this account instead. If you think the
    account is already used from one of the social logins, try
    to sign in with one of them. Afterward, associate your accounts
    on your personal account page.
  `;

  const { age, email, passwordOne, passwordTwo, counrty, error } =
    INITIAL_STATE;

  const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === "" ||
    email === "" ||
    age === "" ||
    counrty === "";

  const onSubmit = (event) => {
    event.preventDefault();
    if (isInvalid) {
      SETINITIAL_STATE({ ...INITIAL_STATE, error: true });
      return;
    }
    const { age, email, passwordOne, passwordTwo, counrty } = INITIAL_STATE;

    FirebaseObject.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        // Create a user in your Firebase realtime database
        return FirebaseObject.user(authUser.user.uid).set({
          age,
          email,
          passwordTwo,
          counrty,
        });
      })
      .then(() => {
        SETINITIAL_STATE({ ...INITIAL_STATE });
        history.push(ROUTES.SIGN_IN);
      })
      .catch((error) => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        SETINITIAL_STATE({ ...INITIAL_STATE, error: error });
      });

    event.preventDefault();
  };

  const onChange = (event) => {
    SETINITIAL_STATE({
      ...INITIAL_STATE,
      [event.target.name]: event.target.value,
    });
  };

  const onAgreement = (event) => {
    SETINITIAL_STATE({
      ...INITIAL_STATE,
      checked: !event.target.checked,
    });
  };

  return (
    <div className="d-flex flex-column align-items-md-center my-5">
      <form
        onSubmit={onSubmit}
        className="shadow p-3 mb-5 bg-body rounded d-flex flex-column col-3 p-4"
      >
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
          <label className="fw-bold">You Age</label>
          <input
            name="age"
            value={age}
            onChange={onChange}
            type="text"
            className="form-control"
          />
          {!INITIAL_STATE.age && INITIAL_STATE.error && (
            <span className="fw-bold d-inline-block py-2 text-black-50">This filed must not be empty.</span>
          )}
        </div>
        <div class="mb-3 my-1">
          <label className="fw-bold">Password</label>
          <input
            name="passwordOne"
            value={passwordOne}
            onChange={onChange}
            type="password"
            className="form-control"
          />
          {!INITIAL_STATE.passwordOne && INITIAL_STATE.error && (
            <span className="fw-bold d-inline-block py-2 text-black-50">This filed must not be empty.</span>
          )}
        </div>
        <div class="mb-3 my-1">
          <label className="fw-bold" >Confirm Password</label>
          <input
            name="passwordTwo"
            value={passwordTwo}
            onChange={onChange}
            type="password"
            className="form-control"
          />
          {!INITIAL_STATE.passwordOne && INITIAL_STATE.error && (
            <span className="fw-bold d-inline-block py-2 text-black-50">This filed must not be empty.</span>
          )}
          {INITIAL_STATE.passwordOne !== INITIAL_STATE.passwordTwo &&
            INITIAL_STATE.error && <span>Password not mached.</span>}
        </div>
        <div class="mb-3 my-1">
          <label for="counrty" className="fw-bold">Country</label>

          <select
            id="counrty"
            className="d-flex"
            name="counrty"
            value={counrty}
            onChange={onChange}
          >
            <option value="Usa">Usa</option>
            <option value="Jordan">Jordan</option>
            <option value="UK">UK</option>
            <option value="France">France</option>
          </select>
          {!INITIAL_STATE.counrty && INITIAL_STATE.error && (
            <span className="fw-bold d-inline-block py-2 text-black-50">This filed must not be empty.</span>
          )}
        </div>

        <div class="mb-3 my-1 d-flex flex-column">
          <h3>Add Some Hobbies</h3>
          <br />
          <button type="button" class="btn btn-primary col-3">
            Add Hobby
          </button>
        </div>

        <div class="mb-3 my-1">
          <input
            type="checkbox"
            onChange={onAgreement}
            id="agreemant"
            name="agreemant"
            value="true"
            className="mx-1"
          />
          <label for="agreemant" className="text-secondary fw-bold">

            Accept Terms Of Us
          </label>
        </div>
        <button
          disabled={INITIAL_STATE.checked}
          type="submit"
          className="col-3 py-2"
        >
          Sign Up
        </button>

        {error && <p className="text-secondary py-2">{error.message}</p>}
      </form>


    </div>
  );
};

export default SignUpPage;
