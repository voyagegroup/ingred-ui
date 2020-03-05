import styled, { keyframes } from "styled-components";

const indeterminate1 = keyframes`
  0% {
    right: 100%;
    left: -35%;
  }

  60% {
    right: -90%;
    left: 100%;
  }

  100% {
    right: -90%;
    left: 100%;
  }
`;

const indeterminate2 = keyframes`
  0% {
    right: 100%;
    left: -200%;
  }

  60% {
    right: -8%;
    left: 107%;
  }

  100% {
    right: -8%;
    left: 107%;
  }
`;

const LoadingBar = styled.span`
  position: relative;
  display: block;
  overflow: hidden;
  width: 100%;
  height: 3px;
  background-color: ${({ theme }) => theme.palette.gray.light};

  &::before,
  &::after {
    position: absolute;
    top: 0;
    bottom: 0;
    left: -200px;
    display: block;
    width: auto;
    background-color: ${({ theme }) => theme.palette.primary.main};
    content: "";
  }

  &::before {
    animation: ${indeterminate1} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395)
      infinite;
  }

  &::after {
    animation: ${indeterminate2} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s
      infinite;
  }
`;

export default LoadingBar;
