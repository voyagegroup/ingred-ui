import React from "react";
import Flex from "../../../../../Flex/Flex";
import { CandidateItem, DualListBoxItem } from "../../../../DualListBox";
import Checkbox from "../../../../../Checkbox/Checkbox";
import Typography from "../../../../../Typography/Typography";

export const SelectLabel: React.FunctionComponent<{
  item: CandidateItem;
  onAdd?: (item: DualListBoxItem) => void;
  onRemove?: (item: DualListBoxItem) => void;
  children: React.ReactNode;
}> = ({ children, item, onAdd, onRemove }) => {
  return (
    <Flex display="flex" justifyContent="space-between">
      {item.items || !onAdd ? (
        <Typography>{children}</Typography>
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
          <Typography>{children}</Typography>
        </Checkbox>
      )}
    </Flex>
  );
};
