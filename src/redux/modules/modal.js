import produce from "immer";
import { createAction, handleActions } from "redux-actions";

const OPEN_MODAL = "OPEN_MODAL";
const CLOSE_MODAL = "CLOSE_MODAL";

const openModal = createAction(OPEN_MODAL, (name, data) => ({ name, data }));
const closeModal = createAction(CLOSE_MODAL);

const initialState = {
  isShow: false,
  name: null,
  data: null,
};
export default handleActions(
  {
    [OPEN_MODAL]: (state, action) =>
      produce(state, (draft) => {
        draft.isShow = !draft.isShow;
        draft.name = action.payload.name;
        draft.data = action.payload.data;
      }),
    [CLOSE_MODAL]: (state, action) => (state = initialState),
  },
  initialState
);

const actionCreators = {
  openModal,
  closeModal,
};

export { actionCreators };
