import styled from "styled-components";
import { Property } from "csstype";
import { addScrollbarProperties } from "../../utils/scrollbar";
import { ContentTypeStyle } from "./MenuList";
import Typography from "../Typography";

type ContainerProps = {
  inline: boolean;
  maxHeight: Property.MaxHeight;
};

type IconProps = {
  disabled: boolean;
};

type ListContainerProps = ContentTypeStyle & {
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

export const Icon = styled.div<IconProps>`
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export const Text = styled(Typography)``;

export const MenuContainer = styled.div<ListContainerProps>`
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  display: flex;
  align-items: center;
  height: 32px;
  margin: 0 ${({ theme }) => theme.spacing}px;
  padding: 0 ${({ theme }) => theme.spacing}px;
  border-radius: ${({ theme }) => theme.radius}px;
  &:disabled {
    ${Icon} {
      opacity: 0.5;
    }
  }
  &:hover {
    background-color: ${({ hover }) => hover.background};
    ${Icon} path:only-child {
      fill: ${({ hover }) => hover.color};
    }
    ${Icon} path:not(:first-child) {
      fill: ${({ hover }) => hover.color};
    }
    ${Text} {
      color: ${({ hover }) => hover.color};
    }
  }
  &:active {
    background-color: ${({ active }) => active.background};
    ${Icon} path:only-child {
      fill: ${({ hover }) => hover.color};
    }
    ${Icon} path:not(:first-child) {
      fill: ${({ hover }) => hover.color};
    }
    ${Text} {
      color: ${({ active }) => active.color};
    }
  }
`;
