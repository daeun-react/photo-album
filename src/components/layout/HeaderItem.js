import React from "react";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { history } from "redux/configureStore";
import { ROUTES } from "utils/constants";

function HeaderItem() {
  const { pathname } = useSelector((state) => state.router.location);
  const { LOGIN, SIGNUP } = ROUTES;

  const historyChange = (url) => {
    history.push(url);
  };

  return (
    <HeaderItemWrapper login={false}>
      <ul>
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
      </ul>
    </HeaderItemWrapper>
  );
}

export default HeaderItem;

const HeaderItemWrapper = styled.div`
  ${({ theme }) => theme.flexSet()};

  ul {
    display: flex;
  }

  ul li {
    ${({ theme }) => theme.flexSet()};
    padding-left: ${({ login }) => (login ? "20px" : "8px")};
  }

  img {
    width: 28px;
    height: 28px;
    padding: 2px;
    border: 2px solid #333333;
    border-radius: 100%;
  }

  svg {
    width: 28px;
    height: 28px;
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
