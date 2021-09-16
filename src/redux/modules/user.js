import firebase from "firebase/compat/app";
import { produce } from "immer";
import { createAction, handleActions } from "redux-actions";
import { auth } from "firebase";

const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_ERROR = "LOGIN_ERROR";
const LOG_OUT = "LOG_OUT";

const loginSuccess = createAction(LOGIN_SUCCESS, (user) => ({ user }));
const loginError = createAction(LOGIN_ERROR);
const logOut = createAction(LOG_OUT);

const loginFB = (id, pwd, signup = false) => {
  return function (dispatch, getState, { history }) {
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then((res) => {
      auth
        .signInWithEmailAndPassword(id, pwd)
        .then((user) => {
          dispatch(
            loginSuccess({
              user_name: user.user.displayName,
              id: id,
              user_profile: user.user.photoURL,
              uid: user.user.uid,
            })
          );
          history.replace("/");
        })
        .catch((error) => {
          dispatch(loginError());
        });
    });
  };
};

const logoutFB = () => {
  return function (dispatch, getState, { history }) {
    auth.signOut().then(() => {
      dispatch(logOut());
      history.replace("/login");
    });
  };
};

const initialState = {
  user: null,
  is_login: false,
  login_error: false,
};

export default handleActions(
  {
    [LOGIN_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
        draft.login_error = false;
        draft.signup_error = false;
      }),
    [LOGIN_ERROR]: (state, action) =>
      produce(state, (draft) => {
        draft.login_error = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        draft.user = null;
        draft.is_login = false;
      }),
  },
  initialState
);

const actionCreators = {
  loginFB,
  logoutFB,
};

export { actionCreators };
