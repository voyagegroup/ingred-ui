import styled from "styled-components";

export const IconWrapper = styled.div`
  display: inline-flex;
`;

export const MenuPopper = styled.div`
  z-index: ${({ theme }) => theme.depth.modal};
`;
