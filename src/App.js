import React, { useEffect } from "react";
import Routes from "Routes";
import { useDispatch, useSelector } from "react-redux";
import { history } from "redux/configureStore";
import { actionCreators as userActions } from "redux/modules/user";
import Header from "components/layout/Header";
import Footer from "components/layout/Footer";
import Notification from "components/notification/Notification";
import Modal from "components/modal/Modal";
import PostInfo from "components/post/PostInfo";

function App() {
  const dispatch = useDispatch();
  const _session_key = `firebase:authUser:${process.env.REACT_APP_API_KEY}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  const { name, data } = useSelector((state) => state.modal);

  useEffect(() => {
    if (is_session) {
      dispatch(userActions.loginCheckFB());
    } else {
      const page = history.location.pathname === "/" ? "/login" : history.location.pathname;
      history.push(page);
    }
  }, [dispatch, is_session]);

  return (
    <>
      <Header />
      <>
        <Routes />
        <Notification />
        <Modal>{name === "Post" && <PostInfo {...data} type="modal" />}</Modal>
      </>
      <Footer />
    </>
  );
}

export default App;
