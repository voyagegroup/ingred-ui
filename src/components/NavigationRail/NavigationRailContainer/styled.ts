import styled from "styled-components";
import { BreakPoint } from "../../../styles/breakPoint";

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100%;
`;

export const MobileMenuButton = styled.div`
  position: fixed;
  top: ${({ theme }) => theme.spacing * 2}px;
  right: ${({ theme }) => theme.spacing * 2}px;
  display: none;

  @media (max-width: ${BreakPoint.MOBILE}px) {
    display: block;
  }
`;
