import React, {
  forwardRef,
  type ReactNode,
  type ButtonHTMLAttributes,
  useContext,
  useCallback,
} from "react";
import styled from "styled-components";
import { colors } from "../../styles";
import { ContextMenu2Context } from "./context";
import Icon from "../Icon";

// 特に機能を持たない、見た目付きの入れ子メニューのボタン

type ContextMenu2CheckItemProps = {
  checked?: boolean;
  closeOnChange?: boolean;
  prepend?: ReactNode;
  children: ReactNode;
  onChange?: (checked: boolean) => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonPrepend = styled.span`
  color: ${colors.basic[900]};
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

  return (
    <button type="button" {...props} ref={ref} onClick={handleClick}>
      {prepend && <ButtonPrepend>{prepend}</ButtonPrepend>}
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
  padding: 6px 8px;
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
