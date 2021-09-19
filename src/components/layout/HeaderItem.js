import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Badge } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "redux/modules/user";
import { actionCreators as drawerActions } from "redux/modules/drawer";
import { history } from "redux/configureStore";
import { ROUTES } from "utils/constants";
import { ReactComponent as Bell } from "assets/bell.svg";
import { ReactComponent as Add } from "assets/add.svg";
import { ReactComponent as Logout } from "assets/logout.svg";
import { realtime } from "firebase";

function HeaderItem() {
  const [notiCount, setNotiCount] = useState(0);
  const { LOGIN, SIGNUP, MYPAGE, WRITE } = ROUTES;
  const _session_key = `firebase:authUser:${process.env.REACT_APP_API_KEY}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  const dispatch = useDispatch();
  const { is_login, user } = useSelector((state) => state.user);
  const { pathname } = useSelector((state) => state.router.location);

  const historyChange = (url) => {
    history.push(url);
  };

  const handleLogout = () => {
    window.confirm("정말 로그아웃 하시겠습니까?") && dispatch(userActions.logoutFB());
  };

  const toggleDrawer = () => {
    dispatch(drawerActions.toggleDrawer());
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    const notiDB = realtime.ref(`noti/${user.uid}/list`);
    notiDB.on("value", (snapshot) => {
      if (snapshot.exists()) {
        const _data = snapshot.val();
        const _noti_list = Object.keys(_data).map((s) => {
          return _data[s];
        });
        const newNoti = _noti_list.filter((item) => item.read === false).length;
        setNotiCount(newNoti);
      }
    });
  }, [user]);

  if (is_session && is_login) {
    return (
      <HeaderItemWrapper login={true}>
        <li onClick={() => historyChange(MYPAGE)}>
          <ProfileImage>{user && <img src={user.user_profile} alt="user profile" />}</ProfileImage>
        </li>
        <li>
          <Badge size="small" count={notiCount} offset={[-4, 4]}>
            <Bell onClick={toggleDrawer} />
          </Badge>
        </li>
        <li onClick={() => historyChange(WRITE)}>
          <Add />
        </li>
        <li onClick={handleLogout}>
          <Logout />
        </li>
      </HeaderItemWrapper>
    );
  }

  return (
    <HeaderItemWrapper login={false}>
      <li>
        <Button isCurrentPath={pathname === LOGIN} onClick={() => historyChange(LOGIN)}>
          로그인
        </Button>
      </li>
      <li>
        <Button isCurrentPath={pathname === SIGNUP} onClick={() => historyChange(SIGNUP)}>
          회원가입
        </Button>
      </li>
    </HeaderItemWrapper>
  );
}

export default HeaderItem;

const HeaderItemWrapper = styled.ul`
  ${({ theme }) => theme.flexSet()};

  li {
    cursor: pointer;
  }

  li + li {
    padding-left: 16px;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

const ProfileImage = styled.div`
  width: 26px;
  height: 26px;
  border: 2.5px solid #333333;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    padding: 1px;
    border-radius: 50%;
  }
`;

const Button = styled.button`
  padding: ${({ padding }) => padding || "8px"};
  margin: ${({ margin }) => margin || "0px"};
  border-radius: 5px;
  background-color: ${({ isCurrentPath }) => (isCurrentPath ? "#ed234b" : "#fff")};
  color: ${({ isCurrentPath }) => (isCurrentPath ? "#fff" : "#333")};
  font-size: 0.9rem;
  white-space: nowrap;

  &:hover {
    ${({ isCurrentPath }) =>
      !isCurrentPath &&
      css`
        border-bottom: 2px solid #ed234b;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
      `}
  }

  & + & {
    margin-top: 10px;
  }
`;
