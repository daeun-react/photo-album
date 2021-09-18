import React from "react";
import styled from "styled-components";
import { ROUTES } from "utils/constants";
import { history } from "redux/configureStore";
import HeaderItem from "components/layout/HeaderItem";

function Header() {
  const { POSTLIST } = ROUTES;

  const historyChange = (url) => {
    history.push(url);
  };

  return (
    <HeaderWrapper>
      <InnerWrapper>
        <Title onClick={() => historyChange(POSTLIST)}>PHOTO-ALBUM</Title>
        <HeaderItem />
      </InnerWrapper>
    </HeaderWrapper>
  );
}

export default Header;

const HeaderWrapper = styled.header`
  height: 64px;
  border-bottom: 1px solid #e0e0e0;
  background-color: #fff;
  z-index: 1;

  h1 {
    font-weight: 800;
    font-size: 16pt;
  }
`;

const InnerWrapper = styled.div`
  ${({ theme }) => theme.flexSet("space-between", "center")};
  width: 980px;
  height: 100%;
  margin: 0 auto;
`;

const Title = styled.h1`
  cursor: pointer;
`;
