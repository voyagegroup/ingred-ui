import styled from "styled-components";
import { DrawerWidth } from "./constants";

type ContaierProps = {
  isOpen: boolean;
  isFixed: boolean;
};

export const Container = styled.div<ContaierProps>`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  width: ${({ isOpen, isFixed }) =>
    isOpen || isFixed ? DrawerWidth.WIDE : DrawerWidth.NARROW};
  background-color: ${({ theme }) => theme.palette.background.default};
  border-right: ${({ theme, isOpen, isFixed }) =>
    isOpen && !isFixed ? "none" : `1px solid ${theme.palette.gray.light}`};
  box-shadow: ${({ isOpen, isFixed, theme }) =>
    isOpen && !isFixed
      ? `0px 0px ${theme.spacing * 2}px ${theme.palette.gray.main}67`
      : "none"};
  box-sizing: content-box;
  overflow-x: hidden;
  /* あとで定義する */
  z-index: 1000;
  transition: width 0.3s;
`;
