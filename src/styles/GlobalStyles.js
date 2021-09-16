import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle` 
  ${reset}

  *{
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  }

  a, a:active, a:hover, a:visited{
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }
  
  input, button {
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  }

  ul, ol {
    list-style: none;
  }
`;

export default GlobalStyles;
