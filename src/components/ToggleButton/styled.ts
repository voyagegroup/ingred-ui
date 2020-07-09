import styled, { css } from "styled-components";
import { Size } from "../../styles";

// TODO: styled-componentsにする
export const Container = styled.div<{ active: boolean; disabled: boolean }>`
  position: relative;
  height: calc(${Size.Border.Small} * 2 + 22px);
  .react-switch-checkbox {
    width: 0;
    height: 0;
    visibility: hidden;
  }

  .react-switch-label {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    width: 56px;
    height: calc(${Size.Border.Small} * 2 + 22px);
    background-color: ${({ active, disabled, theme }) =>
      active && !disabled
        ? theme.palette.background.hint
        : theme.palette.gray.highlight};
    border: ${Size.Border.Small} solid
      ${({ active, disabled, theme }) =>
        active && !disabled
          ? theme.palette.primary.main
          : theme.palette.divider};
    border-radius: 56px;
    transition: background-color 0.2s, border-color 0.2s;
  }

  .react-switch-label .react-switch-button {
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
        active && !disabled
          ? theme.palette.primary.main
          : theme.palette.divider};
  }

  ${({ active }) =>
    active &&
    css`
      .react-switch-label .react-switch-button {
        left: calc(100% - 2px);
        transform: translateX(-100%);
      }
    `}

  .react-switch-label:active .react-switch-button {
    width: 22px;
  }
`;

const BaseLabel = styled.span<{ disabled: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  font-weight: bold;
`;

export const LeftLabel = styled(BaseLabel)`
  left: 7px;
  color: ${({ disabled, theme }) =>
    disabled ? theme.palette.text.disabled : theme.palette.primary.main};
`;

export const RightLabel = styled(BaseLabel)`
  right: 7px;
  color: ${({ disabled, theme }) =>
    theme.palette.text[disabled ? "disabled" : "secondary"]};
`;
