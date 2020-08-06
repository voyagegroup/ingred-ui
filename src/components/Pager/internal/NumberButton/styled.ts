import styled from "styled-components";
import { Radius } from "../../../../styles";

type ButtonProps = {
  active?: boolean;
};

export const NumberButton = styled.button<ButtonProps>`
  width: 28px;
  height: 28px;
  margin: 0 4px;
  border-radius: ${Radius.MEDIUM};
  border: 0;
  background-color: ${({ active, theme }) =>
    active ? theme.palette.primary.main : theme.palette.background.hint};
  transition: all 0.3s;
  &:hover {
    background-color: ${({ active, theme }) =>
      active ? theme.palette.primary.main : theme.palette.primary.highlight};
    cursor: ${({ active }) => (active ? "default" : "pointer")};
  }
`;
