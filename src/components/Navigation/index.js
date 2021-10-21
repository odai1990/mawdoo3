import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { useSelector } from 'react-redux'

const NavigationAuth = () => (
  <ul className="nav nav-pills justify-content-between d-flex px-5 py-2 bg-primary">
    <li className="nav-item">
      <h1 className="text-white">React</h1>
    </li>

    <li className="nav-item py-2">

      <SignOutButton />
    </li>
  </ul>

);

const NavigationNonAuth = ({ pathname }) => (

  <ul className="nav nav-pills justify-content-between d-flex px-5 py-2 bg-primary">
    <li className="nav-item">
      <h1 className="text-white">React</h1>
    </li>

    <li className="nav-item py-3 ">
      <Link to={ROUTES.SIGN_IN} className={pathname === '/signin' ? "text-secondary px-2 text-decoration-none" : "text-white px-2 text-decoration-none"}> Sign In</Link>
      <Link to={ROUTES.SIGN_UP} className={pathname === '/' ? "text-secondary px-2 text-decoration-none" : "text-white px-2 text-decoration-none"}> Sign Up</Link>
    </li>
  </ul>


);

const Navigation = () => {

  const isLogin = useSelector(state => state.login);
  const location = useLocation();
  return (
    isLogin ? <NavigationAuth /> : <NavigationNonAuth pathname={location.pathname} />)
}


export default Navigation;
