import React, {
  forwardRef,
  type ReactNode,
  type ButtonHTMLAttributes,
} from "react";
import styled from "styled-components";
import { colors } from "../../styles";
import { getShadow } from "../../utils/getShadow";

// 特に機能を持たない、見た目付きの入れ子メニューのボタン

type ContextMenu2SwitchItemProps = {
  checked?: boolean;
  disabled?: boolean;
  children: ReactNode;
  onChange: (checked: boolean) => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const SwitchTruck = styled.span<{
  checked: boolean;
  disabled: boolean;
}>`
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  width: 40px;
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

  &:where(button:disabled *) {
    opacity: 0;
  }
`;

const SwitchThumb = styled.span<{
  checked: boolean;
  disabled: boolean;
}>`
  position: absolute;
  top: 50%;
  left: ${({ checked }) => (checked ? "calc(100% - 14px - 6px)" : "4px")};
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

const InternalContextMenu2SwitchItem = forwardRef<
  HTMLButtonElement,
  ContextMenu2SwitchItemProps
>(({ checked = false, disabled = false, children, ...props }, ref) => {
  const handleOnClick = () => {
    props.onChange(!checked);
  };

  return (
    <button
      type="button"
      {...props}
      ref={ref}
      disabled={disabled}
      onClick={handleOnClick}
    >
      {children}
      <SwitchTruck checked={checked} disabled={disabled}>
        <SwitchThumb checked={checked} disabled={disabled} />
      </SwitchTruck>
    </button>
  );
});
InternalContextMenu2SwitchItem.displayName = "ContextMenu2SwitchItem";

type Theme = {
  checked?: boolean | undefined;
};
export const ContextMenu2SwitchItem = styled(
  InternalContextMenu2SwitchItem,
)<Theme>`
  display: flex;
  justify-content: space-between;
  gap: 4px;
  box-sizing: border-box;
  width: 100%;
  padding: 6px 8px;
  border: 0;
  border-radius: 6px;
  /* UI/Text 14 */
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: left;
  color: ${({ disabled, color }) => {
    if (disabled) return colors.basic[400];
    if (color === "danger") return colors.red[500];
    return colors.basic[900];
  }};
  background: transparent;
  transition: background 0.2s;

  &:focus {
    outline: none;
  }

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    background: ${colors.basic[200]};
  }
`;
