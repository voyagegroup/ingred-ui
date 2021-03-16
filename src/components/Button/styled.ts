import styled, { css } from "styled-components";

import { BaseButton } from "./internal/BaseButton";
import { ButtonColorStyle, ButtonSize } from "./Button";

import { hexToRgba } from "../../utils/hexToRgba";

export type ContainerProps = ButtonColorStyle & {
  inline: boolean;
  size: ButtonSize;
  fontSize: string;
  fontWeight: string;
  height: string;
  verticalPadding: string;
  horizontalPadding: string;
  href?: string;
  disabled?: boolean;
};

function computePaddingBySize(size: ButtonSize) {
  if (size === "small") {
    return css`
      padding-top: 7px;
      padding-bottom: 5px;
    `;
  } else if (size === "medium") {
    return css`
      padding-top: 11px;
      padding-bottom: 9px;
    `;
  } else {
    return css`
      padding-top: 14px;
      padding-bottom: 12px;
    `;
  }
}

export const ButtonContainer = styled(BaseButton)<ContainerProps>`
  display: ${({ inline }) => (inline ? "inline-flex" : "flex")};
  justify-content: center;
  align-items: center;
  padding: ${({ verticalPadding, horizontalPadding }) =>
    `${verticalPadding} ${horizontalPadding}`};
  width: ${({ inline }) => (inline ? "auto" : "100%")};
  height: ${({ height }) => height};
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
      ? `0px -2px ${hexToRgba(
          theme.palette.black,
          0.16,
        )} inset, 0px 2px ${hexToRgba(theme.palette.black, 0.08)}`
      : normal.boxShadow};
  transition: background 0.3s;

  &:hover:not([disabled]) {
    background: ${({ hover }) => hover.background};
  }

  &:active:not([disabled]) {
    background: ${({ active }) => active.background};
    ${({ size }) => computePaddingBySize(size)}
    box-shadow: ${({ theme }) =>
      `inset 0 2px ${hexToRgba(theme.palette.black, 0.16)}`};
  }
`;
