import React from "react";
import styled from "styled-components";

function Blackout({ isVisible, onSetIsVisible }) {
  return <BlackoutStyle isVisible={isVisible} onClick={() => onSetIsVisible(false)} />;
}

const BlackoutStyle = styled.div`
  display: ${(props) => (props.isVisible ? "block" : "none")};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.65);
  z-index: 1000;
`;

export default Blackout;
