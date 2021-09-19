import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import gravatar from "gravatar";
import { actionCreators as postActions } from "redux/modules/post";
import { actionCreators as commentActions } from "redux/modules/comment";
import { actionCreators as imageActions } from "redux/modules/image";
import firebase from "firebase/compat/app";
import { auth, firestore, realtime, storage } from "firebase";

const LOGIN_SUCCESS = "user/LOGIN_SUCCESS";
const LOGIN_ERROR = "user/LOGIN_ERROR";
const LOG_OUT = "user/LOG_OUT";
const SIGNUP_ERROR = "user/SIGNUP_ERROR";
const UPLOADING_PROFILE = "user/UPLOADING_PROFILE";

const loginSuccess = createAction(LOGIN_SUCCESS, (user) => ({ user }));
const loginError = createAction(LOGIN_ERROR);
const logOut = createAction(LOG_OUT);
const signupError = createAction(SIGNUP_ERROR);
const uploadingProfile = createAction(UPLOADING_PROFILE, (is_uploading) => ({ is_uploading }));

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
      dispatch(postActions.reset());
      dispatch(commentActions.reset());
      dispatch(imageActions.reset());

      history.replace("/login");
    });
  };
};

const loginCheckFB = () => {
  return function (dispatch, getState, { history }) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          loginSuccess({
            user_name: user.displayName,
            user_profile: user.photoURL,
            id: user.email,
            uid: user.uid,
          })
        );
      } else {
        dispatch(logOut());
      }
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
            realtime.ref(`noti/${user.user.uid}`).set({ created: true });
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

export const updateProfileFB = (imageStr) => {
  return function (dispatch, getState, { history }) {
    const _user = getState().user.user;

    const _upload = storage
      .ref(`images/profile/${_user.user_id}_${new Date().getTime()}`)
      .putString(imageStr, "data_url");

    dispatch(uploadingProfile(true));

    _upload.then((snapshot) => {
      snapshot.ref
        .getDownloadURL()
        .then((url) => {
          return url;
        })
        .then((url) => {
          auth.currentUser
            .updateProfile({
              photoURL: url,
            })
            .then(() => {
              dispatch(
                loginSuccess({
                  user_name: _user.user_name,
                  id: _user.id,
                  user_profile: url,
                  uid: _user.uid,
                })
              );

              const postDB = firestore.collection("post");
              postDB
                .where("user_id", "==", _user.uid)
                .get()
                .then((docs) => {
                  docs.forEach((doc) => {
                    postDB.doc(doc.id).update({ user_profile: url });
                  });
                  dispatch(postActions.getPostByIdFB(_user.uid));
                })
                .catch((err) => {
                  window.alert("앗! 프로필 이미지 수정에 문제가 있어요!");
                });
            })
            .catch((error) => {
              window.alert("앗! 프로필 이미지 수정에 문제가 있어요!");
            });
        })
        .catch((err) => {
          window.alert("앗! 이미지 업로드에 문제가 있어요!");
        })
        .finally(() => dispatch(uploadingProfile(false)));
    });
  };
};

const initialState = {
  user: null,
  is_login: false,
  login_error: false,
  signup_error: false,
  uploading_proflie: false,
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
    [UPLOADING_PROFILE]: (state, action) =>
      produce(state, (draft) => {
        draft.uploading_proflie = action.payload.is_uploading;
      }),
  },
  initialState
);

const actionCreators = {
  loginFB,
  logoutFB,
  loginCheckFB,
  signupFB,
  updateProfileFB,
};

export { actionCreators };
