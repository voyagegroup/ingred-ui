import styled from "styled-components";
import { Space } from "../../styles";
import { ActionButtonColorStyle } from "./ActionButton";

type ContainerProps = ActionButtonColorStyle;

export const Container = styled.button<ContainerProps>`
  display: flex;
  align-items: center;
  padding: ${Space * 0.75}px ${Space}px;
  border: 0;
  cursor: ${({ disabled }) => (disabled ? "none" : "pointer")};
  border-radius: ${({ theme }) => theme.radius}px;
  background-color: ${({ normal }) => normal.background};
  white-space: nowrap;
  transition: all 0.3s;

  &:hover {
    background-color: ${({ hover }) => hover.background};
  }
`;
