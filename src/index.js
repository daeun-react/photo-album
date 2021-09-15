import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer, { history } from "redux/configureStore";
import App from "App";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk.withExtraArgument({ history })))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
