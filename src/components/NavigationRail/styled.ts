import styled from "styled-components";
import {
  NavigationRailWidth,
  NavigationRailTransitionDuration,
} from "./constants";

type ContaierProps = {
  isOpen: boolean;
  isFixed: boolean;
};

export const Container = styled.div<ContaierProps>`
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
      ? `0px 0px ${theme.spacing * 2}px ${theme.palette.gray.main}67`
      : "none"};
  box-sizing: content-box;
  overflow-x: hidden;
  z-index: ${({ theme }) => theme.depth.drawer};
  transition: width ${NavigationRailTransitionDuration}s;
`;
