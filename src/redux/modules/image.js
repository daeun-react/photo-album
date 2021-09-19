import produce from "immer";
import { createAction, handleActions } from "redux-actions";
import { storage } from "firebase";

const RESET = "image/RESET";
const UPLOADING_IMAGE = "image/UPLOADING_IMAGE";
const UPLOAD_IMAGE = "image/UPLOAD_IMAGE";
const SET_PREVIEW = "image/SET_PREVIEW";

const reset = createAction(RESET);
const uploadingImage = createAction(UPLOADING_IMAGE, (uploading) => ({ uploading }));
const uploadImage = createAction(UPLOAD_IMAGE, (image_url) => ({ image_url }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));

const initialState = {
  uploading: false,
  image_url: "",
  preview: null,
};

const uploadImageFB = (image) => {
  return function (dispatch, getState, { history }) {
    dispatch(uploadingImage(true));
    const _upload = storage.ref(`images/${image.name}`).put(image);
    _upload.then((snapshot) => {
      snapshot.ref.getDownloadURL().then((url) => {
        dispatch(uploadImage(url));
      });
    });
  };
};

const image = handleActions(
  {
    [RESET]: (state, action) => (state = initialState),
    [UPLOADING_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.uploading = action.payload.uploading;
      }),
    [UPLOAD_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.image_url = action.payload.image_url;
        draft.uploading = false;
      }),
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
      }),
  },
  initialState
);

export default image;

const actionCreators = {
  uploadImageFB,
  setPreview,
  reset,
};

export { actionCreators };
