import React from "react";
import Flex from "../../../../../Flex/Flex";
import { CandidateItem, DualListBoxItem } from "../../../../DualListBox";
import Checkbox from "../../../../../Checkbox/Checkbox";

export const SelectLabel: React.FunctionComponent<{
  item: CandidateItem;
  disableCheckbox?: boolean;
  onAdd?: (item: DualListBoxItem) => void;
  onRemove?: (item: DualListBoxItem) => void;
  children: React.ReactNode;
}> = ({ children, disableCheckbox = false, item, onAdd, onRemove }) => {
  return (
    <Flex display="flex" justifyContent="space-between">
      {item.items || disableCheckbox ? (
        children
      ) : (
        <Checkbox
          checked={item?.selected ?? false}
          // eslint-disable-next-line react/jsx-handler-names
          onClick={() => {
            if (item.selected) {
              onRemove?.(item);
              return;
            }
            onAdd?.(item);
          }}
        >
          {children}
        </Checkbox>
      )}
    </Flex>
  );
};
