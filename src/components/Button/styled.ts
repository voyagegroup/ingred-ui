import styled from "styled-components";

import { BaseButton } from "./internal/BaseButton";
import { ButtonColorStyle } from "./Button";

export type ContainerProps = ButtonColorStyle & {
  inline: boolean;
  fontSize: string;
  fontWeight: string;
  height: string;
  horizontalPadding: string;
  href?: string;
  disabled?: boolean;
};

export const ButtonContainer = styled(BaseButton)<ContainerProps>`
  display: ${({ inline }) => (inline ? "inline-flex" : "flex")};
  justify-content: center;
  align-items: center;
  padding-right: ${({ horizontalPadding }) => horizontalPadding};
  padding-left: ${({ horizontalPadding }) => horizontalPadding};
  width: ${({ inline }) => (inline ? "auto" : "100%")};
  height: ${({ height }) => height};
  border-radius: ${({ theme }) => theme.radius}px;
  border: ${({ normal, disabled }) => (disabled ? 0 : normal.border)};
  background: ${({ normal, disabled, theme }) =>
    disabled ? theme.palette.gray.highlight : normal.background};
  color: ${({ normal, disabled, theme }) =>
    disabled ? theme.palette.text.disabled : normal.color};
  text-align: center;
  font-weight: ${({ fontWeight }) => fontWeight};
  font-size: ${({ fontSize }) => fontSize};
  box-shadow: ${({ normal, disabled }) =>
    disabled ? "none" : normal.boxShadow};
  transition: all 0.3s;

  &:hover:not([disabled]) {
    background: ${({ hover }) => hover.background};
  }

  &:active {
    background: ${({ active }) => active.background};
    box-shadow: none;
  }
`;
