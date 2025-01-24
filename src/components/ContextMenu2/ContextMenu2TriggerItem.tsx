import React, { forwardRef, type ReactNode } from "react";
import styled from "styled-components";
import { colors } from "../../styles";
import Icon from "../Icon";

// 特に機能を持たない、見た目付きの入れ子メニューのトリガー

type ContextMenu2TriggerItemProps = {
  append?: ReactNode;
  children: ReactNode;
};

const TriggerAppend = styled.span`
  margin-left: auto;
  /* UI/Text 13 */
  font-weight: 400;
  font-size: 13px;
  line-height: 19px;
  color: ${colors.basic[700]};
`;

const InternalContextMenu2TriggerItem = forwardRef<
  HTMLButtonElement,
  ContextMenu2TriggerItemProps
>(({ append, children, ...props }, ref) => {
  return (
    <button type="button" {...props} ref={ref}>
      {children}
      {append && <TriggerAppend>{append}</TriggerAppend>}
      <Icon name="arrow_right" />
    </button>
  );
});
InternalContextMenu2TriggerItem.displayName = "ContextMenu2TriggerItem";
export const ContextMenu2TriggerItem = styled(InternalContextMenu2TriggerItem)`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 6px 8px;
  border: 0;
  border-radius: 6px;
  /* UI/Text 14*/
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: left;
  color: ${colors.basic[900]};
  background: transparent;
  transition: background 0.2s;

  &:focus {
    outline: none;
  }

  &:hover,
  &:focus,
  &[aria-expanded="true"] {
    background: ${colors.basic[200]};
  }
`;
