import React from "react";
import styled from "styled-components";

function Grid({
  children,
  is_flex,
  width,
  padding,
  margin,
  bg,
  center,
  _onClick,
  justify_content,
  border,
  is_hover,
  cursorType,
}) {
  const styles = {
    is_flex,
    width,
    padding,
    margin,
    bg,
    center,
    justify_content,
    border,
    is_hover,
    cursorType,
  };

  return (
    <GridBox {...styles} onClick={_onClick}>
      {children}
    </GridBox>
  );
}

Grid.defaultProps = {
  children: null,
  is_flex: false,
  width: "100%",
  padding: false,
  margin: false,
  bg: false,
  center: false,
  _onClick: () => {},
  justify_content: false,
  border: false,
  is_hover: false,
  cursorType: false,
};

const GridBox = styled.div`
  ${({ theme, is_flex, justify_content }) =>
    is_flex && theme.flexSet("center", `justify_content ? ${justify_content} : space-between;`)};
  width: ${({ width }) => width};
  ${({ center }) => center && `text-align:center;`};
  ${({ padding }) => padding && `padding: ${padding};`};
  ${({ margin }) => margin && `margin : ${margin};`};
  ${({ border }) => border && `border-bottom:1px solid #D8D8D8;`};
  ${({ bg }) => bg && `background-color: ${bg};`};
  ${({ cursorType }) => cursorType && `cursor: ${cursorType};`};

  &:hover {
    ${({ is_hover }) => is_hover && `background-color: #ffffe0`};
  }
`;

export default Grid;
