const INITIAL_STATE = {
  authUser: null,
  login:false,
};

const applySetAuthUser = (state, action) => ({
  ...state,
  authUser: action.authUser,

});

const applySetLogin = (state, action) => ({
  ...state,
  login: action.login,

});

function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'AUTH_USER_SET': {
      return applySetAuthUser(state, action);
    }
    case 'AUTH_USER_Login': {
      return applySetLogin(state, action);
    }
    default:
      return state;
  }
}

export default rootReducer;
