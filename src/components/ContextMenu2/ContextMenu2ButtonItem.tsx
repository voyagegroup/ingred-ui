import React, {
  forwardRef,
  useCallback,
  useContext,
  type ReactNode,
  type ButtonHTMLAttributes,
  type MouseEvent,
  type ReactElement,
} from "react";
import { ContextMenu2Context } from "./context";
import styled from "styled-components";
import Icon from "../Icon";
import type { Props as IconProps } from "../Icon/Icon";

// 特に機能を持たない、見た目付きの入れ子メニューのボタン

type ContextMenu2ButtonItemProps = {
  pressed?: boolean;
  prepend?: ReactNode;
  children: ReactNode;
  closeOnClick?: boolean;
  color?: "danger" | undefined;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonPrepend = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  /* disabled状態の時の色 */
  button:disabled & {
    color: ${({ theme }) => theme.palette.text.disabled};
  }
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

  // prependがIconコンポーネントの場合、colorとsizeを自動設定
  const finalPrepend =
    React.isValidElement(prepend) && prepend.type === Icon
      ? React.cloneElement(prepend as ReactElement<IconProps>, {
          color:
            (prepend as ReactElement<IconProps>).props.color || "currentColor",
          size: "md",
        })
      : prepend;

  return (
    <button
      type="button"
      {...props}
      ref={ref}
      data-pressed={pressed}
      onClick={handleClick}
    >
      {finalPrepend && <ButtonPrepend>{finalPrepend}</ButtonPrepend>}
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
  padding: 8px;
  border: 0;
  border-radius: 6px;
  /* UI/Text 14 */
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: left;
  color: ${({ color, theme }) =>
    color === "danger" ? theme.palette.danger.main : theme.palette.black};
  background: transparent;
  transition: background 0.2s;

  &:focus {
    outline: none;
  }

  &:disabled {
    color: ${({ theme }) => theme.palette.text.disabled};
  }

  &[data-pressed="true"],
  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    color: ${({ color, theme }) =>
      color === "danger" ? theme.palette.danger.main : theme.palette.black};
    background: ${({ color, theme }) =>
      color === "danger"
        ? theme.palette.danger.highlight
        : theme.palette.gray.light};
  }
`;
