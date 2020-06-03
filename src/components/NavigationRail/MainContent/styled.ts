import styled from "styled-components";
import {
  NavigationRailWidth,
  NavigationRailTransitionDuration,
} from "../constants";

export const Container = styled.div<{ isFixed: boolean }>`
  padding-left: ${({ isFixed }) =>
    isFixed ? NavigationRailWidth.WIDE : NavigationRailWidth.NARROW};
  width: 100%;
  height: 100%;
  transition: padding-left ${NavigationRailTransitionDuration}s;
`;
