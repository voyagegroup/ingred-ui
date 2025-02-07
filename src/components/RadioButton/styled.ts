import styled, { css } from "styled-components";
import { fontSize } from "../Typography/Typography";
import { RadioButtonSize } from "./RadioButton";

export const Wrapper = styled.label<{
  size: RadioButtonSize;
  disabled?: boolean;
}>`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing / 2}px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-size: ${({ size }) =>
    size === RadioButtonSize.SMALL ? `${fontSize.sm}px` : `${fontSize.md}px`};

  ${({ disabled }) =>
    disabled &&
    css`
      color: ${({ theme }) => theme.palette.text.disabled};
    `}

  & > input {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    aspect-ratio: 1;
    width: ${({ size }) => size};
    height: auto;
    opacity: 0;
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  }
`;

type IndicatorProps = {
  size: RadioButtonSize;
  inside: string;
  border: string;
};

export const Indicator = styled.span<IndicatorProps>`
  position: relative;
  display: block;
  flex: 0 0 auto;
  aspect-ratio: 1;
  width: ${({ size }) => size};
  height: auto;
  border-radius: 50%;
  border: ${({ border }) => border} solid
    ${({ theme }) => theme.palette.divider};
  box-shadow: ${({ theme }) => theme.shadow["3dShadowBasic"]};
  transition: all 0.3s ease;
  background: ${({ theme }) => theme.palette.background.default};

  input:checked + & {
    background: ${({ theme }) => theme.palette.primary.main};
    border-color: ${({ theme }) => theme.palette.primary.dark};
    box-shadow: ${({ theme }) => theme.shadow["3dShadowPrimary"]};
  }

  input:disabled + & {
    background: ${({ theme }) => theme.palette.gray.light};
    border-color: ${({ theme }) => theme.palette.text.disabled};
  }

  // 選択時の中心の○部分
  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: block;
    margin: auto;
    border-radius: 50%;
    content: "";
    aspect-ratio: 1;
    width: ${({ inside }) => inside};
    height: auto;
    background: ${({ theme }) => theme.palette.background.default};
    transition-property: background;
  }

  input:disabled + &::after {
    background: ${({ theme }) => theme.palette.gray.light};
  }

  input:disabled:checked + &:after {
    background: ${({ theme }) => theme.palette.text.disabled};
  }
`;

export const Label = styled.span`
  flex: 0 1 auto;
  font-size: inherit;
  color: inherit;
`;
