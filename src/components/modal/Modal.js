import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as modalActions } from "redux/modules/modal";
import { ReactComponent as Close } from "assets/close.svg";

function Modal({ children }) {
  const dispatch = useDispatch();
  const modalOpen = useSelector((state) => state.modal.isShow);

  const handleModalClose = () => {
    dispatch(modalActions.closeModal(false));
  };

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [modalOpen]);

  if (!modalOpen) return null;
  return (
    <Wrapper>
      <Blackout onClick={handleModalClose} />
      <ModalWrapper>
        <CloseSection>
          <Close onClick={handleModalClose} />
        </CloseSection>
        {children}
      </ModalWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Blackout = styled.div`
  border: 1px solid green;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);
  z-index: 99;
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 768px;
  height: 50vh;
  background-color: #fff;
  transform: translate(-50%, -50%);
  pointer-events: auto;
  z-index: 100;
`;

const CloseSection = styled.div`
  position: absolute;
  top: -4px;
  right: -4px;

  svg {
    fill: #ed234b;
    width: 24px;
    height: 24px;
  }
`;

export default Modal;
