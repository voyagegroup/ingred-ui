import styled from "styled-components";
import { colors } from "../../../../styles/color";

type ButtonProps = {
  active?: boolean;
};

export const ArrowButton = styled.button<ButtonProps>`
  width: 28px;
  height: 28px;
  padding: 0 2px;
  border-radius: 4px;
  border: 0;
  transition: all 0.3s;
  &:first-child {
    margin-right: 14px;
  }
  &:last-child {
    margin-left: 14px;
  }
  background-color: ${({ active, theme }) =>
    active ? colors.basic[100] : theme.palette.background.hint};
  &:hover {
    background-color: ${({ active, theme }) =>
      active ? colors.basic[100] : theme.palette.primary.highlight};
    cursor: ${({ active }) => (active ? "default" : "pointer")};
  }
`;
