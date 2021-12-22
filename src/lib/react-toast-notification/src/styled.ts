import { TransitionStatus } from "react-transition-group";
import styled, { css, keyframes } from "styled-components";
import { Placement } from "./types";

export const Tag = styled.div`
  border: 0;
  clip: rect(1px, 1px, 1px, 1px);
  height: 1;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1;
`;

export const Button = styled.div<{ gutter: number }>`
  cursor: pointer;
  flex-shrink: 0;
  opacity: 0.5;
  padding: ${({ gutter }) => `${gutter}px ${gutter * 1.5}px`};
  transition: opacity 150ms;
  &:hover {
    opacity: 1;
  }
`;

export const Content = styled.div<{ gutter: number }>`
  flex-grow: 1;
  font-size: 14;
  line-height: 1.4;
  min-height: 40px;
  padding: ${({ gutter }) => `${gutter}px ${gutter * 1.5}px`};
`;

const shrinkKeyframes = keyframes`from { height: 100%; } to { height: 0% }`;
export const Countdown = styled.div<{
  autoDismissTimeout: number;
  isRunning: boolean;
  opacity: number;
}>`
  animation: ${({ autoDismissTimeout }) =>
    `${shrinkKeyframes} ${autoDismissTimeout}ms linear`};
  animation-play-state: ${({ isRunning }) =>
    isRunning ? "running" : "paused"};
  background-color: rgba(0, 0, 0, 0.1);
  bottom: 0;
  height: 0;
  left: 0;
  opacity: ${({ opacity }) => opacity};
  position: absolute;
  width: 100%;
`;

export const Icon = styled.div<{
  color: string;
  backgroundColor: string;
  borderRadius: number;
  gutter: number;
}>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-top-left-radius: ${({ borderRadius }) => borderRadius}px;
  border-bottom-left-radius: ${({ borderRadius }) => borderRadius}px;
  color: ${({ color }) => color};
  flex-shrink: 0;
  padding-bottom: ${({ gutter }) => gutter}px;
  padding-top: ${({ gutter }) => gutter}px;
  position: relative;
  overflow: hidden;
  text-align: center;
  width: 30px;
`;

export const ToastElement = styled.div<{
  height: string | number;
  transitionDuration: number;
}>`
  height: ${({ height }) => height};
  transition: height
    ${({ transitionDuration }) => `height ${transitionDuration - 100}ms 100ms`};
`;

const getTranslate = (placement: Placement) => {
  const pos = placement.split("-");
  const relevantPlacement = pos[1] === "center" ? pos[0] : pos[1];
  const translateMap = {
    right: "translate3d(120%, 0, 0)",
    left: "translate3d(-120%, 0, 0)",
    bottom: "translate3d(0, 120%, 0)",
    top: "translate3d(0, -120%, 0)",
  };

  return translateMap[relevantPlacement];
};

export const ToastElementInner = styled.div<{
  backgroundColor: string;
  color: string;
  borderRadius: number;
  transitionDuration: number;
  gutter: number;
  width: number;
  placement: Placement;
  transitionState: TransitionStatus;
}>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: ${({ borderRadius }) => borderRadius}px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.175);
  color: ${({ color }) => color};
  display: flex;
  margin-bottom: ${({ gutter }) => gutter}px;
  max-width: 100%;
  transition: ${({ transitionDuration }) =>
    `transform ${transitionDuration}ms cubic-bezier(0.2, 0, 0, 1), opacity ${transitionDuration}ms`};
  width: ${({ width }) => width}px;
  ${({ transitionState, placement }) => {
    switch (transitionState) {
      case "entered":
        return css({ transform: "translate3d(0,0,0)" });
      case "exiting":
        return css({ transform: "scale(0.66)", opacity: 0 });
      case "exited":
        return css({ transform: "scale(0.66)", opacity: 0 });
      case "entering":
        return css(getTranslate(placement));
      default:
        return "";
    }
  }}
`;
