import styled from "styled-components";

export const Container = styled.div<{ isHidden: boolean }>`
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  z-index: ${({ theme }) => theme.depth.modal};

  visibility: ${({ isHidden }) => (isHidden ? "hidden" : "visible")};
`;
