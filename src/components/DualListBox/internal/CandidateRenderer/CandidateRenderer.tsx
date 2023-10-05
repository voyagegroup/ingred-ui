import React from "react";
import * as Styled from "./styled";
import { SelectLabel } from "./internal/SelectLabel";
import { Item } from "../../DualListBox";

/**
 * @memo ネストした構造を持つものを扱う場合は、再帰的に処理する必要がある
 */
export const CandidateRenderer: React.FunctionComponent<{
  items: Item[];
  onAdd?: (id: string) => void;
  onRemove?: (id: string) => void;
}> = ({ items, onAdd, onRemove }) => {
  return (
    <Styled.Container>
      {items.map((item) => (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {item.items ? (
            <Styled.AccordionWrapper key={item.id}>
              <Styled.AccordionComponent
                title={
                  <Styled.AccordionTitleWrapper>
                    <SelectLabel
                      label={item.label}
                      item={item}
                      onAdd={onAdd}
                      onRemove={onRemove}
                    />
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
            <Styled.UnselectedItem key={item.id}>
              <SelectLabel
                label={item.label}
                item={item}
                onAdd={onAdd}
                onRemove={onRemove}
              />
            </Styled.UnselectedItem>
          )}
        </>
      ))}
    </Styled.Container>
  );
};
