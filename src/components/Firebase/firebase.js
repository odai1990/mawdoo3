import app from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const config = {
  apiKey: "AIzaSyDDldzmDdDLsr4Nzfp14XAke2h2QMsc_IQ",
  authDomain: "mawdoo3-e33c2.firebaseapp.com",
  projectId: "mawdoo3-e33c2",
  storageBucket: "mawdoo3-e33c2.appspot.com",
  messagingSenderId: "48747095457",
  appId: "1:48747095457:web:661dd5ff44a7bd08fbd7e0",
  measurementId: "G-J9EKV793BJ"
};


class Firebase {
  constructor() {
    app.initializeApp(config);

    /* Helper */

    this.serverValue = app.database.ServerValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    /* Firebase APIs */

    this.auth = app.auth();
    this.db = app.database();



  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);



  doSignOut = () => this.auth.signOut();


  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();


            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {

        next(authUser);
        fallback()
      }
    });

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');


}

const FirebaseObject = new Firebase()
export default FirebaseObject;
