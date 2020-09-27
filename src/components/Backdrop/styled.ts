import styled, { css } from "styled-components";

export const Container = styled.div<{ invisible: boolean }>`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  /* TODO: color */
  background-color: #001326cb;

  ${({ invisible }) =>
    invisible &&
    css`
      background-color: transparent;
    `}
`;
