import styled, { css } from "styled-components";
import { hexToRgba } from "../../utils/hexToRgba";

export const Container = styled.div<{
  width: string;
}>`
  position: relative;
  width: ${({ width }) => width};
  height: calc(1px * 2 + 22px);
`;

export const ToggleButton = styled.span<{ active: boolean; disabled: boolean }>`
  position: absolute;
  top: 50%;
  left: 4px;
  transform: translateY(-50%);
  width: 14px;
  height: 14px;
  border-radius: 14px;
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
      active && !disabled ? theme.palette.primary.dark : theme.palette.divider};
  box-shadow: ${({ theme }) =>
    `0 -2px ${hexToRgba(theme.palette.black, 0.16)} inset, 0px 1px ${hexToRgba(
      theme.palette.black,
      0.08,
    )}`};
  transition: all 0.3s ease-in-out;
`;

export const LabelText = styled.div`
  position: absolute;
  width: 100%;
  word-break: break-all;
  white-space: nowrap;
  transition: all 0.3s ease-in-out;
`;

export const ActiveLabelText = styled(LabelText)`
  padding-left: 8px;
  opacity: 0;
`;

export const InActiveLabelText = styled(LabelText)`
  padding-right: 8px;
  opacity: 1;
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
  transition: all 0.3s ease-in-out;

  ${({ active }) =>
    active &&
    css`
      & > ${ToggleButton} {
        left: calc(100% - 14px - 4px);
      }
      & > ${ActiveLabelText} {
        opacity: 1;
      }
      & > ${InActiveLabelText} {
        opacity: 0;
      }
    `}
`;

export const HiddenInput = styled.input`
  width: 0;
  height: 0;
  visibility: hidden;
`;
