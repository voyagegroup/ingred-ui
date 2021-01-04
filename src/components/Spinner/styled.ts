import styled, { keyframes } from "styled-components";
import { Property } from "csstype";

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
`;

export const Container = styled.div<{ width: Property.Width }>`
  width: ${({ width }) => width};
  height: ${({ width }) => width};
  background-color: transparent;
`;

export const Svg = styled.svg`
  width: 100%;
  height: 100%;
  animation: ${rotate} 2s linear infinite;
  transform-origin: center center;
`;

export const Circle = styled.circle`
  stroke-width: 3;
  fill: none;
`;

export const PrimaryCircle = styled(Circle)`
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  animation: ${dash} 1.5s ease-in-out infinite;
  stroke-linecap: round;
  stroke-miterlimit: 10;
`;
