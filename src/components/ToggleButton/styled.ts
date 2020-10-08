import styled, { css } from "styled-components";

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
  border: 1px solid
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
  width: string;
};

export const Label = styled.label<LabelProps>`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: ${({ width }) => width};
  height: calc(1px * 2 + 22px);
  background-color: ${({ active, disabled, theme }) =>
    active && !disabled
      ? theme.palette.background.hint
      : theme.palette.gray.light};
  border: 1px solid
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

export const LabelText = styled.div<{ position: "right" | "left" }>`
  position: absolute;
  top: 50%;
  ${({ position }) => `${position}: calc(50% - 7px)`};
  transform: translate(
    ${({ position }) => (position === "right" ? "" : "-")}50%,
    -50%
  );
`;
