import styled, { css } from "styled-components";

export const StyledInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0px 16px;
  margin-top: 4px;
  border: 1px solid ${(props) => props.borderColor || "#e0e0e0"};
  border-radius: 4px;
  background: #fff;
  color: #333333;
  font-size: 14px;

  ${({ error }) =>
    error &&
    css`
      border: 1px solid #ed234b;
      &::placeholder {
        color: #ed234b;
      }
      &:-ms-input-placeholder {
        color: #ed234b;
      }
    `}
`;

export const Button = styled.button`
  border-radius: 5px;
  font-size: 0.9rem;
  white-space: nowrap;

  & + & {
    margin-top: 10px;
  }
`;

export const StyledButton = styled(Button)`
  ${({ width }) => width && `width: ${width}`};
  padding: ${({ padding }) => padding || "8px"};
  margin: ${({ margin }) => margin || "0px"};
  background-color: ${({ hoverCheck }) => (hoverCheck ? "#fff" : "#ed234b")};
  color: ${({ hoverCheck }) => (hoverCheck ? "#333" : "#fff")};

  &:hover {
    ${({ hoverCheck }) =>
      hoverCheck &&
      css`
        border-bottom: 2px solid #ed234b;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
      `}
  }
`;
