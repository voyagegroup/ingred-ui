import styled from "styled-components";
import { Size, Radius } from "../../../../styles";
import { colors } from "../../../../styles/color";

export const Container = styled.div`
  padding-left: ${({ theme }) => theme.spacing * 3}px;
`;

export const TabContainer = styled.ul<{ width: string }>`
  width: ${({ width }) => width};
  list-style: none;
  display: flex;
`;

export const TabItem = styled.li<{ active: boolean; width: string }>`
  width: ${({ width }) => width};
  margin-bottom: -${Size.Border.Small}; /* containerのborderにかぶせるためのネガティブマージン */
  padding: ${({ theme }) => theme.spacing * 1.5}px
    ${({ theme }) => theme.spacing * 2}px;
  border-left: ${Size.Border.Small} solid ${colors.basic[300]};
  border-top: ${Size.Border.Small} solid ${colors.basic[300]};
  border-right: ${Size.Border.Small} solid ${colors.basic[300]};
  border-bottom: ${({ active }) =>
    active ? `none` : `${Size.Border.Small} solid ${colors.basic[300]}`};
  border-radius: ${Radius.SMALL} ${Radius.SMALL} 0 0;
  font-size: 13px;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  background-color: ${({ active }) =>
    active
      ? colors.basic[100]
      : ({ theme }) => theme.palette.background.default};
  text-align: center;
  cursor: pointer;
  & + & {
    margin-left: -${Size.Border.Small};
  }
`;
