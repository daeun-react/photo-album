import React from "react";
import styled from "styled-components";
import HeaderItem from "components/layout/HeaderItem";

function Header() {
  return (
    <HeaderWrapper>
      <InnerWrapper>
        <h1>PHOTO-ALBUM</h1>
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
  width: 100%;
  height: 100%;
  max-width: 980px;
  margin: 0 auto;
`;
