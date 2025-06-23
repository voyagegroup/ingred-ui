import styled from "styled-components";
import {
  NavigationRailWidth,
  NavigationRailTransitionDuration,
} from "./constants";
import { hexToRgba } from "../../utils/hexToRgba";
import { BreakPoint } from "../../styles/breakPoint";

type ContainerProps = {
  isOpen: boolean;
  isFixed: boolean;
  isMobile: boolean;
  isMobileMenuOpen: boolean;
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

  /* Mobile styles */
  @media (max-width: ${BreakPoint.MOBILE}px) {
    width: ${NavigationRailWidth.WIDE};
    right: 0;
    transform: translateX(
      ${({ isMobileMenuOpen }) => (isMobileMenuOpen ? "0" : "100%")}
    );
    transition: transform ${NavigationRailTransitionDuration}s;
    border-right: none;
    border-left: 1px solid ${({ theme }) => theme.palette.gray.light};
    box-shadow: ${({ isMobileMenuOpen, theme }) =>
      isMobileMenuOpen
        ? `-4px 0px ${theme.spacing * 2}px ${hexToRgba(
            theme.palette.gray.dark,
            theme.palette.action.shadowOpacity * 4,
          )}`
        : "none"};
  }
`;

export const MobileOverlay = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => hexToRgba(theme.palette.black, 0.5)};
  z-index: ${({ theme }) => theme.depth.drawer - 1};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
  transition:
    opacity ${NavigationRailTransitionDuration}s,
    visibility ${NavigationRailTransitionDuration}s;
  display: none;

  @media (max-width: ${BreakPoint.MOBILE}px) {
    display: block;
  }
`;

export const MobileCloseButton = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing * 2}px;
  right: ${({ theme }) => theme.spacing * 2}px;
  display: none;

  @media (max-width: ${BreakPoint.MOBILE}px) {
    display: block;
  }
`;
