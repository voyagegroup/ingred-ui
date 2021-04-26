import styled from "styled-components";
import { Property } from "csstype";
import { addScrollbarProperties } from "../../utils/scrollbar";
import { ContentTypeStyle } from "./MenuList";
import Typography from "../Typography";

type ContainerProps = {
  inline: boolean;
  maxHeight: Property.MaxHeight;
};

type TextContainerProps = ContentTypeStyle & {
  disabled: boolean;
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
  margin: ${({ theme }) => theme.spacing}px 0;
  padding: ${({ theme }) => theme.spacing}px;
`;

export const Text = styled(Typography)``;

export const TextContainer = styled.div<TextContainerProps>`
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  display: flex;
  align-items: center;
  height: 32px;
  margin: 0 ${({ theme }) => theme.spacing}px;
  padding: 0 ${({ theme }) => theme.spacing}px;
  border-radius: ${({ theme }) => theme.radius}px;
  &:hover {
    ${Text} {
      color: ${({ hover }) => hover.color};
    }
    background-color: ${({ hover }) => hover.background};
  }
  &:active {
    background-color: ${({ active }) => active.background};
  }
`;
