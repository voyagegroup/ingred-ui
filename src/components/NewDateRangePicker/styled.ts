import styled from "styled-components";

export const IconContainer = styled.button`
  cursor: pointer;
  position: absolute;
  top: ${({ theme }) => theme.spacing}px;
  right: ${({ theme }) => theme.spacing}px;
  border: none;
  background: none;
`;
