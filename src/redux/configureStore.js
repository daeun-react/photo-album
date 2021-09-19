import { combineReducers } from "redux";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
import user from "redux/modules/user";
import post from "redux/modules/post";
import image from "redux/modules/image";
import comment from "redux/modules/comment";
import drawer from "redux/modules/drawer";
import modal from "redux/modules/modal";
import storage from "redux-persist/lib/storage/session";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "post", "image", "comment"],
  blacklist: ["drawer", "modal", "router"],
};

export const history = createBrowserHistory();
const rootReducer = combineReducers({
  user,
  post,
  image,
  comment,
  drawer,
  modal,
  router: connectRouter(history),
});

export default persistReducer(persistConfig, rootReducer);
