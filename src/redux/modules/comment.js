import firebase from "firebase/compat/app";
import produce from "immer";
import moment from "moment";
import { createAction, handleActions } from "redux-actions";
import { actionCreators as postActions } from "redux/modules/post";
import { firestore, realtime } from "firebase";

const RESET = "comment/RESET";
const GET_COMMENT = "comment/GET_COMMENT";
const ADD_COMMENT = "comment/ADD_COMMENT";
const LOADING = "comment/LOADING";

const reset = createAction(RESET);
const getComment = createAction(GET_COMMENT, (post_id, comment_list) => ({
  post_id,
  comment_list,
}));

const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({
  post_id,
  comment,
}));

const loading = createAction(LOADING, (is_loading) => is_loading);

const getCommentFB = (post_id = null) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      return;
    }
    dispatch(loading(true));

    const commentDB = firestore.collection("comment");
    commentDB
      .where("post_id", "==", post_id)
      .orderBy("insert_dt", "desc")
      .get()
      .then((docs) => {
        let list = [];

        docs.forEach((doc) => {
          list.push({ ...doc.data(), id: doc.id });
        });

        dispatch(getComment(post_id, list));
      })
      .catch((err) => {
        window.alert("앗! 댓글 불러오기에 문제가 있어요!");
      });
  };
};

const addCommentFB = (post_id, contents) => {
  return function (dispatch, getState, { history }) {
    if (!post_id || !contents) return;

    const user_info = getState().user.user;
    const post = getState().post.list.find((list) => list.id === post_id);

    const commentDB = firestore.collection("comment");
    const postDB = firestore.collection("post");
    const increment = firebase.firestore.FieldValue.increment(1);

    let comment = {
      post_id,
      user_id: user_info.uid,
      user_name: user_info.user_name,
      user_profile: user_info.user_profile,
      contents,
      insert_dt: moment().format("YYYY-MM-DD HH:mm:ss"),
    };

    commentDB.add(comment).then((doc) => {
      comment = { ...comment, id: doc.id };

      postDB
        .doc(post_id)
        .update({ comment_cnt: increment })
        .then((_post) => {
          dispatch(addComment(post_id, comment));

          if (post) {
            dispatch(
              postActions.editPost(post_id, {
                comment_cnt: parseInt(post.comment_cnt) + 1,
              })
            );

            if (post.user_info.user_id !== user_info.uid) {
              const _noti_item = realtime.ref(
                `noti/${post.user_info.user_id}/list/${post.id}_${user_info.uid}`
              );
              _noti_item.set({
                post_id: post.id,
                writer_name: comment.user_name,
                writer_id: comment.user_id,
                image_url: post.image_url,
                insert_dt: comment.insert_dt,
                read: false,
              });
            }
          }
        });
    });
  };
};

const initialState = {
  list: {},
  is_loading: false,
};

export default handleActions(
  {
    [RESET]: (state, action) => (state = initialState),
    [GET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.post_id] = action.payload.comment_list;
        draft.is_loading = false;
      }),
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.post_id].unshift(action.payload.comment);
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

const actionCreators = {
  getCommentFB,
  addCommentFB,
  reset,
};

export { actionCreators };
