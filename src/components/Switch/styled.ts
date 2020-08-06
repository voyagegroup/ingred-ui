import styled from "styled-components";
import { Radius } from "../../styles/radius";

export const Container = styled.div`
  height: 40px;
  padding: ${({ theme }) => theme.spacing / 2}px;
  border-radius: ${Radius.SMALL};
  background-color: ${({ theme }) => theme.palette.gray.light};
`;

export const ChildContainer = styled.div`
  position: relative;
`;

export const ChildrenContainer = styled.div`
  position: relative;
  width: 100%;
  white-space: nowrap;
  display: flex;
  align-items: center;
`;

export const IconItemContainer = styled.div`
  padding: ${({ theme }) => theme.spacing / 2}px;
  height: 32px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  & + & {
    margin-left: ${({ theme }) => theme.spacing / 2}px;
  }
`;

export const TextItemContainer = styled.div`
  display: inline-flex;
  align-items: center;
  height: 32px;
  padding: 0 ${({ theme }) => theme.spacing}px;
  border-radius: ${Radius.SMALL};
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  & + & {
    margin-left: ${({ theme }) => theme.spacing / 2}px;
  }
`;

export const Indicator = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.3s ease-in-out;
  background-color: ${({ theme }) => theme.palette.background.default};
  border-radius: ${Radius.SMALL};
`;
