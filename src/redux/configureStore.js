import { combineReducers } from "redux";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
import user from "redux/modules/user";
import post from "redux/modules/post";
import image from "redux/modules/image";

export const history = createBrowserHistory();
const rootReducer = combineReducers({
  user,
  post,
  image,
  router: connectRouter(history),
});

export default rootReducer;
