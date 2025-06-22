import styled, { css } from "styled-components";

import { BaseButton } from "./internal/BaseButton";
import type { ButtonColorStyle, ButtonSize } from "./Button";
import { trimVertical } from '../../styles/typography';

// アイコンの具体的なサイズをここで定義
const iconPixelSize = {
  small: '16px',
  medium: '18px',
  large: '20px',
};

export type ContainerProps = ButtonColorStyle & {
  color: string;
  inline: boolean;
  fontSize: string;
  paddingInline: string;
  borderRadius: string;
  height: string;
  href?: string;
  disabled?: boolean;
};

export const Text = styled.div`
  ${trimVertical}
`;

export const ButtonContainer = styled(BaseButton)<
  ContainerProps & { size: ButtonSize }
>`
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

  & > span,
  & svg {
    width: ${({ size }) => iconPixelSize[size]};
    height: ${({ size }) => iconPixelSize[size]};
  }

  & > span {
    display: inline-flex;
    align-items: center;
  }

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
