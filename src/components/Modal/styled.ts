import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  z-index: ${({ theme }) => theme.depth.modal};
`;

const fadeIn = keyframes`	
  0% {	
    opacity: 0;	
  }	
  100% {	
    opacity: 1;	
  }	
`;
export const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* TODO: color */
  background-color: #001326cb;
  animation: ${fadeIn} 0.4s;
`;
