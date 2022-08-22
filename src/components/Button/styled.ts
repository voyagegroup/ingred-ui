import styled from "styled-components";

import { BaseButton } from "./internal/BaseButton";
import { ButtonColorStyle } from "./Button";
import { getShadowWithColor } from "../../utils/getShadowWithColor";

export type ContainerProps = ButtonColorStyle & {
  inline: boolean;
  fontSize: string;
  fontWeight: string;
  verticalPadding: string;
  horizontalPadding: string;
  paddingTopAtActive: string;
  paddingBottomAtActive: string;
  href?: string;
  disabled?: boolean;
};

export const ButtonContainer = styled(BaseButton)<ContainerProps>`
  display: ${({ inline }) => (inline ? "inline-flex" : "flex")};
  justify-content: center;
  align-items: center;
  padding: ${({ verticalPadding, horizontalPadding }) =>
    `${verticalPadding} ${horizontalPadding}`};
  width: ${({ inline }) => (inline ? "auto" : "100%")};
  border-radius: ${({ theme }) => theme.radius}px;
  border: ${({ normal, disabled, theme }) =>
    disabled ? `1px solid ${theme.palette.divider}` : normal.border};
  background: ${({ normal, disabled, theme }) =>
    disabled ? theme.palette.gray.light : normal.background};
  color: ${({ normal, disabled, theme }) =>
    disabled ? theme.palette.text.disabled : normal.color};
  text-align: center;
  font-weight: ${({ fontWeight }) => fontWeight};
  font-size: ${({ fontSize }) => fontSize};
  box-shadow: ${({ normal, disabled, theme }) =>
    disabled
      ? getShadowWithColor(theme.shadows, 1, theme.palette.black)
      : normal.boxShadow};
  transition: background 0.3s;

  &:hover:not([disabled]) {
    background: ${({ hover }) => hover.background};
  }

  &:active:not([disabled]) {
    padding-top: ${({ paddingTopAtActive }) => paddingTopAtActive};
    padding-bottom: ${({ paddingBottomAtActive }) => paddingBottomAtActive};
    background: ${({ active }) => active.background};
    box-shadow: ${({ active }) => active.boxShadow};
  }
`;
