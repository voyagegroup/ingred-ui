import React from "react";
import * as Styled from "./styled";
import { Item } from "../../DualListBox";
import ActionButton from "../../../ActionButton/ActionButton";

export const SelectedList: React.FunctionComponent<{
  items: Item[];
  onRemove?: (id: string) => void;
}> = ({ items, onRemove }) => {
  return (
    <Styled.SelectedList>
      {items.map((item) => (
        <Styled.SelectedItem key={item.id}>
          {item.label}
          {onRemove && (
            <ActionButton icon="delete_bin" onClick={() => onRemove(item.id)}>
              remove
            </ActionButton>
          )}
        </Styled.SelectedItem>
      ))}
    </Styled.SelectedList>
  );
};
