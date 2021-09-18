import React from "react";
import styled from "styled-components";
import PostInfo from "components/post/PostInfo";
import { ReactComponent as Close } from "assets/close.svg";

function Modal({ isVisible, onSetIsVisible, Post }) {
  return (
    <ModalStyle isVisible={isVisible}>
      <CloseSection>
        <Close onClick={() => onSetIsVisible(false)} />
      </CloseSection>
      <PostInfo {...Post} type="modal" />
    </ModalStyle>
  );
}

const ModalStyle = styled.div`
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  position: absolute;
  top: 50%;
  left: 50%;
  width: 768px;
  height: 50vh;
  background-color: #fff;
  transform: translate(-50%, -50%);
  pointer-events: ${({ isVisible }) => (isVisible ? "auto" : "none")};
  z-index: 9999;
`;

const CloseSection = styled.div`
  position: absolute;
  top: -6px;
  right: -6px;

  svg {
    fill: #ed234b;
    width: 24px;
    height: 24px;
  }
`;

export default Modal;
