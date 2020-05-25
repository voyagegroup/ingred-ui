import styled from "styled-components";
import { DrawerContentHeight } from "../../constants";

export const DrawerHeader = styled.div`
  flex-shrink: 0;
  flex-basis: ${DrawerContentHeight.HEADER};
  display: flex;
  align-items: center;
`;

export const DrawerContent = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
  overflow-x: hidden;

  & * {
    text-decoration: none;
  }
`;

export const DrawerFooter = styled.div`
  flex-shrink: 0;
  flex-basis: ${DrawerContentHeight.HEADER};
  display: flex;
  align-items: center;
`;
