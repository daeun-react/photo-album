import { css } from "styled-components";

const flexSet = (horizon, vertical, direction) => css`
  display: flex;
  justify-content: ${horizon || "center"};
  align-items: ${vertical || "center"};
  flex-direction: ${direction || "row"};
`;

const Mixin = { flexSet };

export default Mixin;
