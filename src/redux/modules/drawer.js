import produce from "immer";
import { createAction, handleActions } from "redux-actions";

const TOGGLE_DRAWER = "TOGGLE_DRAWER";

const toggleDrawer = createAction(TOGGLE_DRAWER);

const initialState = {
  isShow: false,
};
export default handleActions(
  {
    [TOGGLE_DRAWER]: (state, action) =>
      produce(state, (draft) => {
        draft.isShow = !draft.isShow;
      }),
  },
  initialState
);

const actionCreators = {
  toggleDrawer,
};

export { actionCreators };
