import styled from "styled-components";
import { hexToRgba } from "../../utils/hexToRgba";
import {
  NavigationRailWidth,
  NavigationRailTransitionDuration,
} from "./constants";

type ContainerProps = {
  isOpen: boolean;
  isFixed: boolean;
};

export const Container = styled.div<ContainerProps>`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: ${({ isOpen, isFixed }) =>
    isOpen || isFixed ? NavigationRailWidth.WIDE : NavigationRailWidth.NARROW};
  background-color: ${({ theme }) => theme.palette.background.default};
  border-right: ${({ theme, isOpen, isFixed }) =>
    isOpen && !isFixed ? "none" : `1px solid ${theme.palette.gray.light}`};
  box-shadow: ${({ isOpen, isFixed, theme }) =>
    isOpen && !isFixed
      ? `0px 0px ${theme.spacing * 2}px ${hexToRgba(
          theme.palette.gray.dark,
          theme.palette.action.shadowOpacity * 4,
        )}`
      : "none"};
  box-sizing: content-box;
  overflow-x: hidden;
  z-index: ${({ theme }) => theme.depth.drawer};
  transition: width ${NavigationRailTransitionDuration}s;
`;
