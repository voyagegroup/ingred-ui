import React from "react";
import * as Styled from "./styled";
import Accordion from "../../../Accordion/Accordion";
import { SelectLabel } from "./internal/SelectLabel";
import { Item } from "../../DualListBox";

/**
 * @description ネストした構造を持つものを扱う場合は、再帰的に処理する必要がある
 * @memo Accordion のところは add/remove いらないかも？
 */
export const ListRenderer: React.FunctionComponent<{
  items: Item[];
  onAdd?: (id: string) => void;
  onRemove?: (id: string) => void;
}> = ({ items, onAdd, onRemove }) => {
  return (
    <Styled.UnselectedList>
      {items.map((item) => (
        <Styled.UnselectedItem key={item.id}>
          {item.items ? (
            <Accordion
              title={
                <SelectLabel
                  label={item.label}
                  item={item}
                  onAdd={onAdd}
                  onRemove={onRemove}
                />
              }
            >
              <ListRenderer
                items={item.items}
                onAdd={onAdd}
                onRemove={onRemove}
              />
            </Accordion>
          ) : (
            <SelectLabel
              label={item.label}
              item={item}
              onAdd={onAdd}
              onRemove={onRemove}
            />
          )}
        </Styled.UnselectedItem>
      ))}
    </Styled.UnselectedList>
  );
};
