import styled, { css } from "styled-components";
import { getShadow } from "../../utils/getShadow";

export const Container = styled.div<{
  width: string;
}>`
  position: relative;
  width: ${({ width }) => width};
  height: calc(1px * 2 + 22px);
`;

export const ToggleButton = styled.span<{
  checked: boolean;
  disabled: boolean;
}>`
  position: absolute;
  top: 50%;
  left: 4px;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  border-radius: 14px;
  background-color: ${({ checked, disabled, theme }) => {
    let backgroundColor = theme.palette.background.default;
    if (disabled) {
      backgroundColor = theme.palette.gray.light;
    } else if (checked) {
      backgroundColor = theme.palette.primary.main;
    }
    return backgroundColor;
  }};
  border: 1px solid
    ${({ checked, disabled, theme }) =>
    checked && !disabled
      ? theme.palette.primary.dark
      : theme.palette.divider};
  box-shadow: ${({ theme }) =>
    getShadow(
      3,
      theme.palette.action.shadowOpacity,
      theme.palette.action.shadowBase,
    )};
  transition: all 0.3s ease-in-out;
`;

export const LabelText = styled.div`
  position: absolute;
  width: 100%;
  word-break: break-all;
  white-space: nowrap;
  transition: all 0.3s ease-in-out;
`;

export const CheckedLabelText = styled(LabelText)`
  padding-left: 8px;
  opacity: 0;
`;

export const UnCheckedLabelText = styled(LabelText)`
  padding-right: 8px;
  opacity: 1;
`;

type LabelProps = {
  checked: boolean;
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
  background-color: ${({ checked, disabled, theme }) => {
    let backgroundColor = theme.palette.gray.highlight;
    if (disabled) {
      backgroundColor = theme.palette.gray.light;
    } else if (checked) {
      backgroundColor = theme.palette.background.hint;
    }
    return backgroundColor;
  }};
  border: 1px solid
    ${({ checked, disabled, theme }) =>
    checked && !disabled
      ? theme.palette.primary.main
      : theme.palette.divider};
  border-radius: 56px;
  box-shadow: ${({ theme }) =>
    getShadow(
      4,
      theme.palette.action.shadowOpacity,
      theme.palette.action.shadowBase,
    )};
  transition: all 0.3s ease-in-out;

  ${({ checked }) =>
    checked &&
    css`
      & > ${ToggleButton} {
        left: calc(100% - 14px - 6px);
      }
      & > ${CheckedLabelText} {
        opacity: 1;
      }
      & > ${UnCheckedLabelText} {
        opacity: 0;
      }
    `}
`;

export const HiddenInput = styled.input`
  width: 0;
  height: 0;
  visibility: hidden;
`;
