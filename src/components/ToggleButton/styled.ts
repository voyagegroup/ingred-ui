import styled, { css } from "styled-components";
import { Size } from "../../styles";

export const Container = styled.div<{ active: boolean; disabled: boolean }>`
  position: relative;
  height: calc(${Size.Border.Small} * 2 + 22px);
`;

type ToggleButtonProps = {
  active: boolean;
  disabled: boolean;
};

export const ToggleButton = styled.span<ToggleButtonProps>`
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  border-radius: 18px;
  transition: 0.2s;
  background-color: ${({ active, disabled, theme }) => {
    let backgroundColor = theme.palette.background.default;
    if (disabled) {
      backgroundColor = theme.palette.gray.light;
    } else if (active) {
      backgroundColor = theme.palette.primary.main;
    }
    return backgroundColor;
  }};
  border: ${Size.Border.Small} solid
    ${({ active, disabled, theme }) =>
      active && !disabled ? theme.palette.primary.main : theme.palette.divider};

  ${({ active }) =>
    active &&
    css`
      & {
        left: calc(100% - 2px);
        transform: translateX(-100%);
      }
    `}
`;

type LabelProps = {
  active: boolean;
  disabled: boolean;
};

export const Label = styled.label<LabelProps>`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 54px;
  height: calc(${Size.Border.Small} * 2 + 22px);
  background-color: ${({ active, disabled, theme }) =>
    active && !disabled
      ? theme.palette.background.hint
      : theme.palette.gray.highlight};
  border: ${Size.Border.Small} solid
    ${({ active, disabled, theme }) =>
      active && !disabled ? theme.palette.primary.main : theme.palette.divider};
  border-radius: 56px;
  transition: background-color 0.2s, border-color 0.2s;

  &:active > ${ToggleButton} {
    width: 22px;
  }
`;

export const HiddenInput = styled.input`
  width: 0;
  height: 0;
  visibility: hidden;
`;

type LabelTextProps = {
  disabled: boolean;
  position: "right" | "left";
};

export const LabelText = styled.div<LabelTextProps>`
  position: absolute;
  top: 50%;
  ${({ position }) => `${position}: calc(50% - 7px)`};
  transform: translate(
    ${({ position }) => (position === "right" ? "" : "-")}50%,
    -50%
  );
  color: ${({ disabled, position, theme }) => {
    if (disabled) return theme.palette.text.disabled;
    return position === "right"
      ? theme.palette.text.secondary
      : theme.palette.primary.main;
  }};
  font-size: 12px;
  font-weight: bold;
`;
