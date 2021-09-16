import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import gravatar from "gravatar";
import firebase from "firebase/compat/app";
import { auth } from "firebase";

const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_ERROR = "LOGIN_ERROR";
const LOG_OUT = "LOG_OUT";
const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
const SIGNUP_ERROR = "SIGNUP_ERROR";

const loginSuccess = createAction(LOGIN_SUCCESS, (user) => ({ user }));
const loginError = createAction(LOGIN_ERROR);
const logOut = createAction(LOG_OUT);
const signupSuccess = createAction(SIGNUP_SUCCESS);
const signupError = createAction(SIGNUP_ERROR);

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

export const signupFB = (id, pwd, user_name) => {
  return function (dispatch, getState, { history }) {
    auth
      .createUserWithEmailAndPassword(id, pwd)
      .then((user) => {
        auth.currentUser
          .updateProfile({
            displayName: user_name,
            photoURL: gravatar.url(id, { s: "24px", d: "retro" }),
          })
          .then(() => {
            dispatch(loginFB(id, pwd, true));
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        if (error.code.indexOf("auth/email-already-in-use") > -1) {
          dispatch(signupError());
        }
      });
  };
};

const initialState = {
  user: null,
  is_login: false,
  login_error: false,
  signup_error: false,
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
    [SIGNUP_ERROR]: (state, action) =>
      produce(state, (draft) => {
        draft.signup_error = true;
      }),
  },
  initialState
);

const actionCreators = {
  loginFB,
  logoutFB,
  signupFB,
};

export { actionCreators };
