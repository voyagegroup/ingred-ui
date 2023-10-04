import React from "react";
import Flex from "../../../../../Flex/Flex";
import { UnselectedItem } from "../../../../DualListBox";
import Checkbox from "../../../../../Checkbox/Checkbox";
import Typography from "../../../../../Typography/Typography";

export const SelectLabel: React.FunctionComponent<{
  label: string;
  item: UnselectedItem;
  onAdd?: (id: string) => void;
  onRemove?: (id: string) => void;
}> = ({ label, item, onAdd, onRemove }) => {
  return (
    <Flex display="flex" justifyContent="space-between">
      {item.items ? (
        <Typography>{label}</Typography>
      ) : (
        <Checkbox
          checked={item?.selected ?? false}
          // eslint-disable-next-line react/jsx-handler-names
          onClick={() => {
            if (item.selected) {
              onRemove?.(item.id);
              return;
            }
            onAdd?.(item.id);
          }}
        >
          <Typography>{label}</Typography>
        </Checkbox>
      )}
    </Flex>
  );
};
