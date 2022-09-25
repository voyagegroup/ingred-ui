import styled from "styled-components";

export const Container = styled.span<{ size: number }>`
  display: block;
  position: relative;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  overflow: hidden;
  svg {
    position: absolute;
    top: 0;
    left: 0;
  }
`;
