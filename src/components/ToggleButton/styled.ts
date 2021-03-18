import styled, { css } from "styled-components";
import { hexToRgba } from "../../utils/hexToRgba";

export const Container = styled.div<{
  active: boolean;
  disabled: boolean;
  width: string;
}>`
  position: relative;
  width: ${({ width }) => width};
  height: calc(1px * 2 + 22px);
`;

export const ToggleButton = styled.span<{ active: boolean; disabled: boolean }>`
  content: "";
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 4px;
  width: 14px;
  height: 14px;
  border-radius: 14px;
  transition: all 0.3s;
  background-color: ${({ active, disabled, theme }) => {
    let backgroundColor = theme.palette.background.default;
    if (disabled) {
      backgroundColor = theme.palette.gray.light;
    } else if (active) {
      backgroundColor = theme.palette.primary.main;
    }
    return backgroundColor;
  }};
  border: 1px solid
    ${({ active, disabled, theme }) =>
      active && !disabled ? theme.palette.primary.main : theme.palette.divider};
  box-shadow: ${({ theme }) =>
    `0 -2px ${hexToRgba(theme.palette.black, 0.16)} inset, 0px 2px ${hexToRgba(
      theme.palette.black,
      0.08,
    )}`};

  ${({ active }) =>
    active &&
    css`
      & {
        left: calc(100% - 4px);
        transform: translate(-100%, -50%);
      }
    `}
`;

type LabelProps = {
  active: boolean;
  disabled: boolean;
  width: string;
};

export const Label = styled.label<LabelProps>`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  width: ${({ width }) => width};
  height: calc(1px * 2 + 22px);
  background-color: ${({ active, disabled, theme }) => {
    let backgroundColor = theme.palette.gray.highlight;
    if (disabled) {
      backgroundColor = theme.palette.gray.light;
    } else if (active) {
      backgroundColor = theme.palette.background.hint;
    }
    return backgroundColor;
  }};
  border: 1px solid
    ${({ active, disabled, theme }) =>
      active && !disabled ? theme.palette.primary.main : theme.palette.divider};
  border-radius: 56px;
  box-shadow: ${({ theme }) =>
    `0 2px ${hexToRgba(theme.palette.black, 0.08)} inset`};
  transition: background-color 0.3s ease, border-color 0.3s ease;

  &:active > ${ToggleButton} {
    width: 22px;
  }
`;

export const HiddenInput = styled.input`
  width: 0;
  height: 0;
  visibility: hidden;
`;

export const LabelText = styled.div<{ position: "right" | "left" }>`
  position: absolute;
  top: 50%;
  ${({ position }) => `${position}: calc(50% - 7px)`};
  transform: translate(
    ${({ position }) => (position === "right" ? "" : "-")}50%,
    -50%
  );
`;
