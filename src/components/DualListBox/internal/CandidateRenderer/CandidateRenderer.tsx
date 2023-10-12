import React from "react";
import * as Styled from "./styled";
import { SelectLabel } from "./internal/SelectLabel";
import { DualListBoxItem } from "../../DualListBox";

/**
 * @memo ネストした構造を持つものを扱う場合は、再帰的に処理する必要がある
 */
export const CandidateRenderer: React.FunctionComponent<{
  items: DualListBoxItem[];
  onAdd?: (id: string) => void;
  onRemove?: (id: string) => void;
}> = ({ items, onAdd, onRemove }) => {
  return (
    <Styled.Container>
      {items.map((item, i) => (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {item.items ? (
            <Styled.AccordionWrapper key={item.id}>
              <Styled.AccordionComponent
                title={
                  <Styled.AccordionTitleWrapper>
                    <SelectLabel item={item} onAdd={onAdd} onRemove={onRemove}>
                      {item.label}
                    </SelectLabel>
                  </Styled.AccordionTitleWrapper>
                }
              >
                <CandidateRenderer
                  items={item.items}
                  onAdd={onAdd}
                  onRemove={onRemove}
                />
              </Styled.AccordionComponent>
            </Styled.AccordionWrapper>
          ) : (
            <Styled.UnselectedItem
              key={item.id}
              isLastIndex={i + 1 === items.length}
            >
              <SelectLabel item={item} onAdd={onAdd} onRemove={onRemove}>
                {item.label}
              </SelectLabel>
            </Styled.UnselectedItem>
          )}
        </>
      ))}
    </Styled.Container>
  );
};
