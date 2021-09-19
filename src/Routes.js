import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Route } from "react-router-dom";
import { history } from "redux/configureStore";
import Login from "pages/Login";
import Signup from "pages/Signup";
import Mypage from "pages/Mypage";
import PostList from "pages/post/PostList";
import PostWrite from "pages/post/PostWrite";
import PostDetail from "pages/post/PostDetail";
import { ROUTES } from "utils/constants";

function Routes() {
  const { POSTLIST, LOGIN, SIGNUP, MYPAGE, WRITE, WRITEBYID, POSTBYID } = ROUTES;

  return (
    <ConnectedRouter history={history}>
      <Route path={POSTLIST} exact component={PostList} />
      <Route path={LOGIN} exact component={Login} />
      <Route path={SIGNUP} exact component={Signup} />
      <Route path={MYPAGE} exact component={Mypage} />
      <Route path={WRITE} exact component={PostWrite} />
      <Route path={WRITEBYID} exact component={PostWrite} />
      <Route path={POSTBYID} exact component={PostDetail} />
    </ConnectedRouter>
  );
}

export default Routes;
