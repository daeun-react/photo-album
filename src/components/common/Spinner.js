import React from "react";
import styled, { css } from "styled-components";
import Loading from "assets/loading.svg";

function Spinner({ type, size }) {
  return (
    <SpinnerWrap type={type}>
      <SpinnerSvg size={size} />
    </SpinnerWrap>
  );
}

Spinner.defaultProps = {
  type: "inline",
  size: 60,
};

export default Spinner;

const SpinnerWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  ${(props) =>
    props.type === "page" &&
    css`
      position: fixed;
      top: 0;
      left: 0;
      height: 95vh;
      padding: 0;
      z-index: 9999;
    `}
`;

const SpinnerSvg = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  background-size: var(--size);
  background-image: url("${Loading}");
`;
