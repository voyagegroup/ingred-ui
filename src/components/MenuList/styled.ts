import styled from "styled-components";
import { Property } from "csstype";
import { addScrollbarProperties } from "../../utils/scrollbar";

type ContainerProps = {
  inline: boolean;
  maxHeight: Property.MaxHeight;
};

export const Container = styled.div<ContainerProps>`
  display: ${({ inline }) => (inline ? "inline-block" : "block")};
  padding: ${({ theme }) => theme.spacing}px 0;
  border-radius: ${({ theme }) => theme.radius}px;
  background-color: ${({ theme }) => theme.palette.background.default};
  ${({ maxHeight }) => addScrollbarProperties({ maxHeight })}
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  background: ${({ theme }) => theme.palette.gray.highlight};
  padding: 0 ${({ theme }) => theme.spacing}px;
`;

export const TextContainer = styled.div<{ disabled?: boolean }>`
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  display: flex;
  align-items: center;
  color: ${({ disabled, theme }) =>
    disabled ? theme.palette.text.disabled : "auto"};
  height: 32px;
  margin: 0 ${({ theme }) => theme.spacing}px;
  padding: 0 ${({ theme }) => theme.spacing}px;
  border-radius: ${({ theme }) => theme.radius}px;
  &:hover {
    background-color: ${({ disabled, theme }) =>
      disabled ? "auto" : theme.palette.gray.light};
  }
  &:active {
    background-color: ${({ disabled, theme }) =>
      disabled ? "auto" : theme.palette.gray.main};
  }
`;
