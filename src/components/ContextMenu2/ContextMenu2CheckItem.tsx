import React, {
  forwardRef,
  type ReactNode,
  type ButtonHTMLAttributes,
  useContext,
  useCallback,
  type ReactElement,
} from "react";
import styled from "styled-components";
import { colors } from "../../styles";
import { ContextMenu2Context } from "./context";
import Icon from "../Icon";
import type { Props as IconProps } from "../Icon/Icon";

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
  /* アイコンのデフォルトサイズと色を設定 */
  svg {
    width: 18px;
    height: 18px;
  }

  /* span要素のサイズも設定 */
  span {
    width: 18px;
    height: 18px;
  }

  /* disabled状態の時の色 */
  button:disabled & {
    color: ${colors.basic[400]};
  }
`;

const StyledIcon = styled.span`
  margin-left: auto;
`;

const InternalContextMenu2CheckItem = forwardRef<
  HTMLButtonElement,
  ContextMenu2CheckItemProps
>(({ checked, closeOnChange, prepend, children, onChange, ...props }, ref) => {
  const { close } = useContext(ContextMenu2Context);
  const handleClick = useCallback(() => {
    onChange && onChange(!checked);
    closeOnChange && close();
  }, [checked, close, closeOnChange, onChange]);

  // prependがIconコンポーネントの場合、colorを自動設定
  const prependWithColor =
    React.isValidElement(prepend) && prepend.type === Icon
      ? React.cloneElement(prepend as ReactElement<IconProps>, {
          color: "currentColor",
        })
      : prepend;

  return (
    <button type="button" {...props} ref={ref} onClick={handleClick}>
      {prepend && <ButtonPrepend>{prependWithColor}</ButtonPrepend>}
      {children}
      <StyledIcon>
        {checked && <Icon name="check_thin" color={colors.blue[500]} />}
      </StyledIcon>
    </button>
  );
});
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
  color: ${({ color }) =>
    color === "danger" ? colors.red[500] : colors.basic[900]};
  background: transparent;
  transition: background 0.2s;

  &:focus {
    outline: none;
  }

  &:hover,
  &:focus {
    background: ${colors.basic[200]};
  }

  &:disabled {
    color: ${colors.basic[400]};
    cursor: not-allowed;

    &:hover {
      background: transparent;
    }
  }
`;
