import styled from "styled-components";
import { NavigationRailTransitionDuration } from "../constants";

export const Container = styled.div<{ isFixed: boolean }>`
  cursor: pointer;
  position: relative;
  margin-left: ${({ theme }) => theme.spacing * 3}px;
  font-weight: bold;
  transform: rotate(${({ isFixed }) => (isFixed ? "none" : "180deg")});
  transition: transform ${NavigationRailTransitionDuration}s;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${({ theme }) => theme.palette.gray.light};
    border-radius: 10rem;
    transform: scale(0);
    transition: transform 0.3s;
  }

  &:hover::before {
    transform: scale(2);
  }
`;
