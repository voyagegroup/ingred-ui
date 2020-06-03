import styled from "styled-components";
import { NavigationRailContentHeight } from "../constants";

export const Header = styled.div`
  flex-shrink: 0;
  flex-basis: ${NavigationRailContentHeight.HEADER};
  display: flex;
  align-items: center;
`;

export const Content = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
  overflow-x: hidden;

  & * {
    text-decoration: none;
  }
`;

export const Footer = styled.div`
  flex-shrink: 0;
  flex-basis: ${NavigationRailContentHeight.FOOTER};
  display: flex;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.palette.gray.light};
`;
