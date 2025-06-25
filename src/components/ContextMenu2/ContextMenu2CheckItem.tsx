import React, {
  forwardRef,
  type ReactNode,
  type ButtonHTMLAttributes,
  useContext,
  useCallback,
  type ReactElement,
} from "react";
import styled from "styled-components";
import { ContextMenu2Context } from "./context";
import Icon from "../Icon";
import type { Props as IconProps } from "../Icon/Icon";
import { useTheme } from "../../themes/useTheme";

// 特に機能を持たない、見た目付きの入れ子メニューのボタン

type ContextMenu2CheckItemProps = {
  checked?: boolean;
  closeOnChange?: boolean;
  prepend?: ReactNode;
  children: ReactNode;
  onChange?: (checked: boolean) => void;
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

const StyledIcon = styled.span`
  margin-left: auto;
`;

const InternalContextMenu2CheckItem = forwardRef<
  HTMLButtonElement,
  ContextMenu2CheckItemProps
>(
  (
    { checked, closeOnChange, prepend, children, onChange, color, ...props },
    ref,
  ) => {
    const theme = useTheme();
    const { close } = useContext(ContextMenu2Context);
    const handleClick = useCallback(() => {
      onChange && onChange(!checked);
      closeOnChange && close();
    }, [checked, close, closeOnChange, onChange]);

    // prependがIconコンポーネントの場合、colorとsizeを自動設定
    const finalPrepend =
      React.isValidElement(prepend) && prepend.type === Icon
        ? React.cloneElement(prepend as ReactElement<IconProps>, {
            color: "currentColor",
            size: "md",
          })
        : prepend;

    return (
      <button type="button" {...props} ref={ref} onClick={handleClick}>
        {finalPrepend && <ButtonPrepend>{finalPrepend}</ButtonPrepend>}
        {children}
        <StyledIcon>
          {checked && (
            <Icon
              name="check_thin"
              color={
                color === "danger"
                  ? theme.palette.danger.main
                  : theme.palette.primary.main
              }
            />
          )}
        </StyledIcon>
      </button>
    );
  },
);
InternalContextMenu2CheckItem.displayName = "ContextMenu2CheckItem";

type Theme = {
  checked?: boolean;
  colors?: "danger" | undefined;
};
export const ContextMenu2CheckItem = styled(
  InternalContextMenu2CheckItem,
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
  ${(props) => `font-weight: ${props.checked ? 700 : 400};`}
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

  &:hover,
  &:focus {
    background: ${({ theme }) => theme.palette.gray.light};
  }

  &:disabled {
    color: ${({ theme }) => theme.palette.text.disabled};
    cursor: not-allowed;

    &:hover {
      background: transparent;
    }
  }
`;
