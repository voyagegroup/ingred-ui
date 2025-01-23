import React, {
  forwardRef,
  type ReactNode,
  type ButtonHTMLAttributes,
} from "react";
import styled from "styled-components";
import { colors } from "../../styles";

// 特に機能を持たない、見た目付きの入れ子メニューのボタン

type ContextMenu2ButtonItemProps = {
  prepend?: ReactNode;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonAppend = styled.span`
  color: ${colors.basic[700]};
`;

const InternalContextMenu2ButtonItem = forwardRef<
  HTMLButtonElement,
  ContextMenu2ButtonItemProps
>(({ prepend, children, ...props }, ref) => {
  return (
    <button type="button" {...props} ref={ref}>
      {prepend && <ButtonAppend>{prepend}</ButtonAppend>}
      {children}
    </button>
  );
});
InternalContextMenu2ButtonItem.displayName = "ContextMenu2ButtonItem";

type Theme = {
  colors?: "danger" | undefined;
};
export const ContextMenu2ButtonItem = styled(
  InternalContextMenu2ButtonItem,
)<Theme>`
  display: flex;
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
  color: ${({ color }) =>
    color === "danger" ? colors.red[500] : colors.basic[900]};
  background: transparent;
  transition: background 0.2s;

  &:focus {
    outline: none;
  }

  &:disabled {
    color: ${colors.basic[400]};
  }

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    color: ${({ color }) => (color === "danger" ? "#fff" : colors.basic[900])};
    background: ${({ color }) =>
      color === "danger" ? colors.red[500] : colors.basic[200]};
  }
`;
