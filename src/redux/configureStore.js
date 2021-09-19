import { combineReducers } from "redux";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
import user from "redux/modules/user";
import post from "redux/modules/post";
import image from "redux/modules/image";
import comment from "redux/modules/comment";
import drawer from "redux/modules/drawer";
import modal from "redux/modules/modal";
import { persistReducer } from "redux-persist";
import localforage from "localforage";

const persistConfig = {
  key: "root",
  storage: localforage,
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
