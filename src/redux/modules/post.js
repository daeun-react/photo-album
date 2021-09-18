import produce from "immer";
import moment from "moment";
import { createAction, handleActions } from "redux-actions";
import { actionCreators as imageActions } from "redux/modules/image";
import { firestore, storage } from "firebase";

const SHOW_POST = "SHOW_POST";
const LOADING = "LOADING";

const UPLOADING_POST = "UPLOADING_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";

const showPost = createAction(SHOW_POST, (post_list, paging) => ({
  post_list,
  paging,
}));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const uploadingPost = createAction(UPLOADING_POST, (is_uploading) => ({ is_uploading }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));

const initialPost = {
  image_url: "http://via.placeholder.com/400x300",
  contents: "",
  comment_cnt: 0,
  insert_dt: moment().format("YYYY-MM-DD HH:mm:ss"),
};

const getPostFB = (start = null, size = 9) => {
  return function (dispatch, getState, { history }) {
    const _paging = getState().post.paging;
    if (_paging.start && !_paging.next) {
      return;
    }
    dispatch(loading(true));

    const postDB = firestore.collection("post");
    let query = postDB.orderBy("insert_dt", "desc");

    if (start) {
      query = query.startAt(start);
    }

    query
      .limit(size + 1)
      .get()
      .then((docs) => {
        let post_list = [];

        let paging = {
          start: docs.docs[0],
          next: docs.docs.length === size + 1 ? docs.docs[docs.docs.length - 1] : null,
          size: size,
        };

        docs.forEach((doc) => {
          let _post = doc.data();
          const post = Object.keys(_post).reduce(
            (acc, cur) => {
              if (cur.indexOf("user_") > -1) {
                return {
                  ...acc,
                  user_info: { ...acc.user_info, [cur]: _post[cur] },
                };
              } else {
                return {
                  ...acc,
                  [cur]: _post[cur],
                };
              }
            },
            { id: doc.id, user_info: {} }
          );
          post_list.push(post);
        });

        if (paging.next !== null) {
          post_list.pop();
        }
        dispatch(showPost(post_list, paging));
      })
      .catch((err) => {
        window.alert("앗! 포스트 불러오기에 문제가 있어요!");
      });
  };
};

const getOnePostFB = (id) => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");

    postDB
      .doc(id)
      .get()
      .then((doc) => {
        const _post = doc.data();
        const post = Object.keys(_post).reduce(
          (acc, cur) => {
            if (cur.indexOf("user_") > -1) {
              return {
                ...acc,
                user_info: { ...acc.user_info, [cur]: _post[cur] },
              };
            }
            return { ...acc, [cur]: _post[cur] };
          },
          {
            id: doc.id,
            user_info: {},
          }
        );

        dispatch(showPost([post]));
      });
  };
};

const addPostFB = (contents = "") => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");

    const _user = getState().user.user;

    const user_info = {
      user_name: _user.user_name,
      user_id: _user.uid,
      user_profile: _user.user_profile,
    };

    const _post = {
      ...initialPost,
      contents: contents,
      insert_dt: moment().format("YYYY-MM-DD HH:mm:ss"),
    };

    const _image = getState().image.preview;

    dispatch(uploadingPost(true));

    const _upload = storage
      .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
      .putString(_image, "data_url");

    _upload
      .then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then((url) => {
            return url;
          })
          .then((url) => {
            postDB
              .add({ ...user_info, ..._post, image_url: url })
              .then((doc) => {
                let post = { user_info, ..._post, id: doc.id, image_url: url };
                dispatch(addPost(post));
                history.replace("/");
                dispatch(imageActions.setPreview(null));
              })
              .catch((err) => {
                window.alert("앗! 포스트 작성에 문제가 있어요!");
              });
          })
          .catch((err) => {
            window.alert("앗! 이미지 업로드에 문제가 있어요!");
          });
      })
      .finally(() => dispatch(uploadingPost(false)));
  };
};

const editPostFB = (post_id = null, post = {}) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) return;

    const _image = getState().image.preview;
    const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
    const _post = getState().post.list[_post_idx];
    const user_id = getState().user.user.uid;

    dispatch(uploadingPost(true));

    const postDB = firestore.collection("post");
    if (_image === _post.image_url) {
      postDB
        .doc(post_id)
        .update(post)
        .then((doc) => dispatch(editPost(post_id, { ...post })));
      history.replace("/");
    } else {
      const _upload = storage
        .ref(`images/${user_id}_${new Date().getTime()}`)
        .putString(_image, "data_url");

      _upload
        .then((snapshot) => {
          snapshot.ref
            .getDownloadURL()
            .then((url) => {
              return url;
            })
            .then((url) => {
              postDB
                .doc(post_id)
                .update({ ...post, image_url: url })
                .then((doc) => {
                  dispatch(editPost(post_id, { ...post, image_url: url }));
                  history.replace("/");
                });
            })
            .catch((err) => {
              window.alert("앗! 포스트 수정에 문제가 있어요!");
              console.log("앗! 포스트 수정에 문제가 있어요!", err);
            });
        })
        .finally(() => dispatch(uploadingPost(false)));
    }
  };
};

const initialState = {
  list: [],
  paging: { start: null, next: null, size: 9 },
  my_post_list: [],
  mypage_paging: { start: null, next: null, size: 9 },
  is_loading: false,
  is_uploading: false,
};

export default handleActions(
  {
    [SHOW_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.post_list);
        draft.list = draft.list.reduce((acc, cur) => {
          if (acc.findIndex((a) => a.id === cur.id) === -1) {
            return [...acc, cur];
          } else {
            acc[acc.findIndex((a) => a.id === cur.id)] = cur;
            return acc;
          }
        }, []);

        if (action.payload.paging) {
          draft.paging = action.payload.paging;
        }

        draft.is_loading = false;
      }),
    [UPLOADING_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.is_uploading = action.payload.is_uploading;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
      }),
  },
  initialState
);

const actionCreators = {
  getPostFB,
  getOnePostFB,
  addPostFB,
  editPostFB,
};

export { actionCreators };
