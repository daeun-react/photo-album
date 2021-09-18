import React from "react";
import { useSelector } from "react-redux";

function Permit({ children }) {
  const _session_key = `firebase:authUser:${process.env.REACT_APP_API_KEY}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;
  const is_login = useSelector((state) => state.user.is_login);

  if (is_session && is_login) {
    return <>{children}</>;
  }
  return null;
}

export default Permit;
