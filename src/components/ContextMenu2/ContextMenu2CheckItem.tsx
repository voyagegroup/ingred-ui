import React, {
  forwardRef,
  type ReactNode,
  type ButtonHTMLAttributes,
} from "react";
import styled from "styled-components";
import { colors } from "../../styles";

// 特に機能を持たない、見た目付きの入れ子メニューのボタン

type ContextMenu2CheckItemProps = {
  checked?: boolean;
  prepend?: ReactNode;
  children: ReactNode;
  onChange?: (checked: boolean) => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonPrepend = styled.span`
  color: ${colors.basic[900]};
`;
const CheckMark = styled(
  ({ className, checked }: { className?: string; checked: boolean }) => (
    <svg width="18" height="19" viewBox="0 0 18 19" className={className}>
      <path
        fill={checked ? colors.blue[500] : "none"}
        d="m7.5 11.7 6.9-6.9 1 1.1-7.9 8L2.7 9l1-1 3.8 3.6Z"
      />
    </svg>
  ),
)`
  margin-left: auto;
`;

const InternalContextMenu2CheckItem = forwardRef<
  HTMLButtonElement,
  ContextMenu2CheckItemProps
>(({ checked, prepend, children, onChange, ...props }, ref) => {
  const handleClick = () => {
    if (onChange) onChange(!checked);
  };

  return (
    <button type="button" {...props} ref={ref} onClick={handleClick}>
      {prepend && <ButtonPrepend>{prepend}</ButtonPrepend>}
      {children}
      <CheckMark checked={checked ?? false} />
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
`;
