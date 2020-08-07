import styled, { keyframes } from "styled-components";

export const Wrapper = styled.div<{ transitionDuration: number }>`
  padding: ${({ theme }) => theme.spacing * 2}px;
  transition: height ${({ transitionDuration }) => transitionDuration - 100}ms
    100ms;
`;

type ContainerProps = {
  background: string;
  boxShadow: string;
  transitionDuration: number;
  transform: string;
  opacity: number;
};
export const Container = styled.div<ContainerProps>`
  position: relative;
  display: flex;
  align-items: center;
  min-width: 400px;
  max-width: 800px;
  height: 64px;
  padding: 0 ${({ theme }) => theme.spacing * 2}px;
  background: ${({ background }) => background};
  box-shadow: ${({ boxShadow }) => boxShadow};
  transition: transform ${({ transitionDuration }) => transitionDuration}ms
      ease-in-out,
    opacity ${({ transitionDuration }) => transitionDuration}ms;
  transform: ${({ transform }) => transform};
  opacity: ${({ opacity }) => opacity};
  border-radius: ${({ theme }) => theme.radius}px;
  overflow: hidden;
`;

export const IconContainer = styled.div<{ background: string }>`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  margin-right: ${({ theme }) => theme.spacing * 2}px;
  background: ${({ background }) => background};
  border-radius: 50%;
`;

export const CloseIconContainer = styled.div`
  cursor: pointer;
  margin-left: ${({ theme }) => theme.spacing * 2}px;
`;

type CountdownProps = {
  autoDismissTimeout: number;
  opacity: number;
  isRunning: boolean;
  backgroundColor: string;
};
export const shrinkKeyframes = keyframes`
  from {
    width: 100%;
  }
  to {
    width: 0%
  }
`;
export const Countdown = styled.div<CountdownProps>`
  animation: ${shrinkKeyframes}
    ${({ autoDismissTimeout }) => autoDismissTimeout}ms linear;
  background-color: ${({ backgroundColor }) => backgroundColor};
  top: 0;
  left: 0;
  opacity: ${({ opacity }) => opacity};
  position: absolute;
  width: 0;
  height: 3px;
`;
