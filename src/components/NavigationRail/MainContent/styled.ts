import styled from "styled-components";
import {
  NavigationRailWidth,
  NavigationRailTransitionDuration,
} from "../constants";
import { BreakPoint } from "../../../styles/breakPoint";

export const Container = styled.div<{ isFixed: boolean }>`
  padding-left: ${({ isFixed }) =>
    isFixed ? NavigationRailWidth.WIDE : NavigationRailWidth.NARROW};
  width: 100%;
  height: 100%;
  transition: padding-left ${NavigationRailTransitionDuration}s;

  @media (max-width: ${BreakPoint.MOBILE}px) {
    padding-left: 0;
  }
`;
