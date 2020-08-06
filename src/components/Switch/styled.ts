import styled from "styled-components";
import { Radius } from "../../styles/radius";

export const Container = styled.div`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing / 2}px;
  background-color: ${({ theme }) => theme.palette.gray.light};
  border-radius: ${Radius.MEDIUM};
`;

export const IconItemContainer = styled.div<{ active: boolean }>`
  padding: ${({ theme }) => theme.spacing / 2}px;
  background-color: ${({ active, theme }) =>
    active ? theme.palette.background.default : "transparent"};
  border-radius: ${Radius.MEDIUM};
  cursor: pointer;
  transition: all 0.3s;
  & + & {
    margin-left: ${({ theme }) => theme.spacing / 2}px;
  }
`;

export const TextItemContainer = styled.div<{ active: boolean }>`
  display: inline-flex;
  align-items: center;
  height: 32px;
  padding: 0 ${({ theme }) => theme.spacing}px;
  background-color: ${({ active, theme }) =>
    active ? theme.palette.background.default : "transparent"};
  border-radius: ${Radius.MEDIUM};
  cursor: pointer;
  transition: all 0.3s;
  & + & {
    margin-left: ${({ theme }) => theme.spacing / 2}px;
  }
`;
