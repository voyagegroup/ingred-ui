import React, { forwardRef, type ReactNode } from "react";
import styled from "styled-components";
import Icon from "../Icon";
import { trimVertical } from "../../styles/typography";

// 特に機能を持たない、見た目付きの入れ子メニューのトリガー

type ContextMenu2TriggerItemProps = {
  append?: ReactNode;
  children: ReactNode;
};

const TriggerLabel = styled.span`
  margin-right: auto;
  /* UI/Text 14*/
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: left;
  color: ${({ theme }) => theme.palette.black};
`;

const TriggerAppend = styled.span`
  margin-left: auto;
  /* UI/Text 13 */
  font-weight: 400;
  font-size: 13px;
  color: ${({ theme }) => theme.palette.text.secondary};
  ${trimVertical}
`;

const InternalContextMenu2TriggerItem = forwardRef<
  HTMLButtonElement,
  ContextMenu2TriggerItemProps
>(({ append, children, ...props }, ref) => {
  return (
    <button type="button" {...props} ref={ref}>
      <TriggerLabel>{children}</TriggerLabel>
      {append && <TriggerAppend>{append}</TriggerAppend>}
      <span style={{ marginLeft: "4px" }}>
        <Icon name="arrow_right" />
      </span>
    </button>
  );
});
InternalContextMenu2TriggerItem.displayName = "ContextMenu2TriggerItem";
export const ContextMenu2TriggerItem = styled(InternalContextMenu2TriggerItem)`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 8px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  transition: background 0.2s;

  &:focus {
    outline: none;
  }

  &:hover,
  &:focus,
  &[aria-expanded="true"] {
    background: ${({ theme }) => theme.palette.gray.light};
  }
`;

// styled-componentsで作成されたコンポーネントにも明示的にdisplayNameを設定
ContextMenu2TriggerItem.displayName = "ContextMenu2TriggerItem";
