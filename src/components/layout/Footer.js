import React from "react";
import styled from "styled-components";

function Footer() {
  return (
    <FooterWrapper>
      <p>daeun.lee</p>
      <p>smile_daeun@naver.com</p>
    </FooterWrapper>
  );
}

export default Footer;

const FooterWrapper = styled.footer`
  ${({ theme }) => theme.flexSet("center", "center", "column")};
  height: 80px;
  line-height: 1.5;
  background-color: #333;
  color: #fff;
`;
