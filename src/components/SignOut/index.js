import React from 'react';
import FirebaseObject from '../Firebase/firebase';

const SignOutButton = () => (
  <button type="button" onClick={FirebaseObject.doSignOut} className="btn btn-secondary">
    Sign Out
  </button>

);

export default SignOutButton;
