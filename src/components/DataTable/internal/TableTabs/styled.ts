import styled from "styled-components";
import { Size, Radius } from "../../../../styles";
import { colors } from "../../../../styles/color";

export const Container = styled.div`
  padding-top: ${({ theme }) => theme.spacing * 1.5}px;
  padding-left: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.gray.highlight};
  border-bottom: ${Size.Border.Small} solid ${colors.basic[300]};
`;

export const TabContainer = styled.ul<{ width: string }>`
  list-style: none;
  display: flex;
  width: ${({ width }) => width};
`;

export const TabItem = styled.li<{ active: boolean; width: string }>`
  width: ${({ width }) => width};
  margin-bottom: -${Size.Border.Small}; /* containerのborderにかぶせるためのネガティブマージン */
  padding: ${({ theme }) => theme.spacing}px
    ${({ theme }) => theme.spacing * 2}px;
  border: ${({ active }) =>
    active ? `1px solid ${colors.basic[300]}` : "none"};
  border-bottom: ${({ active }) =>
    active ? "none" : `1px solid ${colors.basic[300]}`};
  border-radius: ${Radius.SMALL} ${Radius.SMALL} 0 0;
  background-color: ${({ active, theme }) =>
    active ? theme.palette.background.default : "none"};
  cursor: pointer;
`;
