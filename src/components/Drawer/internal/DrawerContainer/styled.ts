import styled from "styled-components";
import { DrawerWidth } from "../../constants";

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

export const MainContent = styled.div<{ isFixed: boolean }>`
  padding-left: ${({ isFixed }) =>
    isFixed ? DrawerWidth.WIDE : DrawerWidth.NARROW};
  width: 100%;
  height: 100%;
  transition: padding-left 0.3s;
`;
