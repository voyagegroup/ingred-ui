import * as React from "react";
import * as Styled from "./styled";
import { UnselectedRenderer } from "./internal/UnselectedRenderer";
import { SelectedList } from "./internal/SelectedList";
import Divider from "../Divider/Divider";
import { useTheme } from "../../themes";

export type ItemBase = {
  id: string;
  label: string;
};

export type ItemWithInverse = ItemBase & { isInverse: boolean } & {
  items?: (ItemBase & { isInverse: boolean })[];
};
export type ItemWithoutInverse = ItemBase & { isInverse?: undefined } & {
  items?: (ItemBase & { isInverse?: undefined })[];
};

export type Item = ItemWithInverse | ItemWithoutInverse;

/**
 * @memo 内部で状態を保持するための型
 */
export type UnselectedItem = Item & { selected?: boolean };

type BaseProps = {
  onAdd?: (id: string) => void;
  onRemove?: (id: string) => void;
};

export type DualListBoxProps =
  | (BaseProps & {
      unselectedItems: ItemWithInverse[];
      selectedItems: ItemWithInverse[];
      onToggleInverse?: (id: string) => void;
    })
  | (BaseProps & {
      unselectedItems: ItemWithoutInverse[];
      selectedItems: ItemWithoutInverse[];
      onToggleInverse?: undefined;
    });

const DualListBox = React.forwardRef<HTMLDivElement, DualListBoxProps>(
  function DualListBox({
    unselectedItems: unselectedItemsProp,
    selectedItems,
    onAdd,
    onRemove,
    onToggleInverse,
  }) {
    const theme = useTheme();

    const unselectedItems: UnselectedItem[] = React.useMemo(() => {
      return unselectedItemsProp.map((item) => {
        if (selectedItems.some((selectedItem) => selectedItem.id === item.id)) {
          return {
            ...item,
            selected: true,
          };
        }
        return item;
      });
    }, [unselectedItemsProp, selectedItems]);

    const handleAdd = React.useCallback(
      (id: string) => {
        if (onAdd) {
          onAdd(id);
        }
      },
      [onAdd],
    );

    const handleRemove = React.useCallback(
      (id: string) => {
        if (onRemove) {
          onRemove(id);
        }
      },
      [onRemove],
    );

    return (
      <Styled.Container>
        <UnselectedRenderer
          items={unselectedItems}
          onAdd={handleAdd}
          onRemove={onRemove}
        />
        <Divider color={theme.palette.divider} orientation="vertical" />
        <SelectedList
          items={selectedItems}
          onRemove={handleRemove}
          onToggleInverse={onToggleInverse}
        />
      </Styled.Container>
    );
  },
);

export default DualListBox;
