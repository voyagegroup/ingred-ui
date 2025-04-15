import React, {
  forwardRef,
  useCallback,
  useContext,
  type ReactNode,
  type ButtonHTMLAttributes,
  type MouseEvent,
} from "react";
import { ContextMenu2Context } from "./context";
import styled from "styled-components";
import { colors } from "../../styles";

// 特に機能を持たない、見た目付きの入れ子メニューのボタン

type ContextMenu2ButtonItemProps = {
  pressed?: boolean;
  prepend?: ReactNode;
  children: ReactNode;
  closeOnClick?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonAppend = styled.span`
  color: ${colors.basic[700]};
`;

const InternalContextMenu2ButtonItem = forwardRef<
  HTMLButtonElement,
  ContextMenu2ButtonItemProps
>(({ pressed, prepend, children, closeOnClick, onClick, ...props }, ref) => {
  const { close } = useContext(ContextMenu2Context);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      onClick && onClick(event);
      closeOnClick && close();
    },
    [closeOnClick, close, onClick],
  );
  return (
    <button
      type="button"
      {...props}
      ref={ref}
      data-pressed={pressed}
      onClick={handleClick}
    >
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
  align-items: center;
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

  &[data-pressed="true"],
  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    color: ${({ color }) =>
      color === "danger" ? colors.red[500] : colors.basic[900]};
    background: ${({ color }) =>
      color === "danger" ? colors.red[100] : colors.basic[200]};
  }
`;
