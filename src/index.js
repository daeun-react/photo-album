import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer, { history } from "redux/configureStore";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "styles/GlobalStyles";
import Mixin from "styles/Mixin";
import App from "App";
import "antd/dist/antd.css";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk.withExtraArgument({ history })))
);
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={{ ...Mixin }}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
