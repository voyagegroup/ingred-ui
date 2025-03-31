import styled, { css } from "styled-components";

import { BaseButton } from "./internal/BaseButton";
import { ButtonColorStyle } from "./Button";
import { StyledComponentProps } from "../../utils/styledTypes";

export type ContainerProps = ButtonColorStyle & {
  color: string;
  inline: boolean;
  fontSize: string;
  paddingInline: string;
  borderRadius: string;
  height: string;
  href?: string;
  disabled?: boolean;
} & StyledComponentProps;

export const ButtonContainer = styled(BaseButton)<ContainerProps>`
  display: ${({ inline }) => (inline ? "inline-flex" : "flex")};
  justify-content: center;
  align-items: center;
  height: ${({ height }) => height};
  width: ${({ inline }) => (inline ? "fit-content" : "100%")};
  padding-inline: ${({ paddingInline }) => paddingInline};
  border-radius: ${({ borderRadius }) => borderRadius};
  border: ${({ normal }) => normal.border};
  background: ${({ normal }) => normal.background};
  color: ${({ normal }) => normal.color};
  text-align: center;
  font-size: ${({ fontSize }) => fontSize};
  box-shadow: ${({ normal }) => normal.boxShadow};
  transition: background 0.3s;

  &[disabled] {
    ${({ color }) =>
      color === "clear"
        ? css`
            border: 0;
            background: transparent;
            color: ${({ theme }) => theme.palette.text.disabled};
            box-shadow: none;
          `
        : css`
            border: ${({ theme }) => `1px solid ${theme.palette.divider}`};
            background: ${({ theme }) => theme.palette.gray.light};
            color: ${({ theme }) => theme.palette.text.disabled};
            box-shadow: ${({ theme }) => theme.shadow["3dShadowBasic"]};
          `}
  }

  &:hover:not([disabled]) {
    background: ${({ hover }) => hover.background};
  }

  &:active:not([disabled]) {
    padding-top: 2px;
    background: ${({ active }) => active.background};
    box-shadow: ${({ active }) => active.boxShadow};
  }

  // アイコンのみの場合
  & > span:only-child,
  & > span:only-child > svg {
    flex-shrink: 0;
  }
  &:has(> span:only-child > svg) {
    width: ${({ height }) => height};
  }
`;
