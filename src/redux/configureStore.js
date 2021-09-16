import { combineReducers } from "redux";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
import user from "redux/modules/user";

export const history = createBrowserHistory();
const rootReducer = combineReducers({
  user,
  router: connectRouter(history),
});

export default rootReducer;
