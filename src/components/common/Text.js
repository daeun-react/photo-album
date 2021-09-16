import React from "react";
import styled, { css } from "styled-components";

function Text({ children, color, size, bold, margin, center, error, overflowHidden, _onClick }) {
  const styles = {
    color,
    size,
    bold,
    margin,
    center,
    error,
    overflowHidden,
  };
  return (
    <P {...styles} onClick={_onClick}>
      {children}
    </P>
  );
}

Text.defaultProps = {
  children: null,
  color: "#333",
  size: "14px",
  bold: false,
  margin: false,
  center: false,
  error: false,
  overflowHidden: false,
  _onClick: () => {},
};

const P = styled.p`
  color: ${({ color }) => color};
  font-size: ${({ size }) => size};
  font-weight: ${({ bold }) => (bold ? "600" : "400")};
  text-align: ${({ center }) => (center ? "center" : "left")};
  margin: ${({ margin }) => (margin ? `${margin}` : `0 auto`)};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  ${({ overflowHidden }) =>
    overflowHidden &&
    css`
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    `}

  ${({ error }) =>
    error &&
    css`
      &:before {
        content: "❌ ";
        display: inline;
      }
      color: #ed234b;
      padding-bottom: 4px;
    `}
`;

export default Text;
