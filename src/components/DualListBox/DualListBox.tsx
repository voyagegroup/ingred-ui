import * as React from "react";
import * as Styled from "./styled";
import { CandidateRenderer } from "./internal/CandidateRenderer";
import { SelectedList } from "./internal/SelectedList";
import Divider from "../Divider/Divider";
import { useTheme } from "../../themes";

export type ItemBase = {
  id: string;
};

export type DualListBoxItemSelectedWithToggle = ItemBase & { checked: boolean };
export type DualListBoxItemSelectedWithoutToggle = ItemBase & {
  checked?: undefined;
};

/**
 * @memo DualListBoxItemSelectedWithToggle をネスト可能にしたものが DualListBoxCandidateItemWithToggle
 */
export type DualListBoxCandidateItemWithToggle = ItemBase & {
  label?: string;
  items?: DualListBoxCandidateItemWithToggle[];
};

/**
 * @memo DualListBoxItemSelectedWithoutToggle をネスト可能にしたものが DualListBoxCandidateItemWithoutToggle
 */
export type DualListBoxCandidateItemWithoutToggle = ItemBase & {
  label?: string;
  items?: DualListBoxCandidateItemWithoutToggle[];
};

export type DualListBoxItem =
  | DualListBoxCandidateItemWithToggle
  | DualListBoxCandidateItemWithoutToggle;

export type DualListSelectedItem =
  | DualListBoxItemSelectedWithToggle
  | DualListBoxItemSelectedWithoutToggle;

type BaseProps = {
  onAdd?: (id: string) => void;
  onRemove?: (id: string) => void;
};

export type DualListBoxPropsWithToggle = BaseProps & {
  candidateItems: DualListBoxCandidateItemWithToggle[];
  selectedItems: DualListBoxItemSelectedWithToggle[];
  onToggleChange?: (id: string) => void;
};

export type DualListBoxPropsWithoutToggle = BaseProps & {
  candidateItems: DualListBoxCandidateItemWithoutToggle[];
  selectedItems: DualListBoxItemSelectedWithoutToggle[];
  onToggleChange?: undefined;
};

export type DualListBoxProps =
  | DualListBoxPropsWithToggle
  | DualListBoxPropsWithoutToggle;

/**
 * @memo 内部で選択候補の状態を保持するための型
 */
export type CandidateItem = DualListBoxItem & {
  selected?: boolean;
};

/**
 * @memo 内部で選択済みの状態を保持するための型
 */
export type SelectedItem = DualListSelectedItem & {
  label?: string;
};

const DualListBox = React.forwardRef<HTMLDivElement, DualListBoxProps>(
  function DualListBox({
    candidateItems: candidateItemsProp,
    selectedItems: selectedItemsProp,
    onAdd,
    onRemove,
    onToggleChange,
  }) {
    const theme = useTheme();

    const candidateItems: CandidateItem[] = React.useMemo(() => {
      return candidateItemsProp.map((item) => {
        if (item.items) {
          return {
            ...item,
            items: item.items.map((subItem) => {
              if (
                selectedItemsProp.some(
                  (selectedItem) => selectedItem.id === subItem.id,
                )
              ) {
                return {
                  ...subItem,
                  selected: true,
                };
              }
              return subItem;
            }),
          };
        }

        if (
          selectedItemsProp.some((selectedItem) => selectedItem.id === item.id)
        ) {
          return {
            ...item,
            selected: true,
          };
        }

        return item;
      });
    }, [candidateItemsProp, selectedItemsProp]);

    const selectedItems: DualListSelectedItem[] = React.useMemo(() => {
      return selectedItemsProp.map((item) => {
        const targetItem = candidateItems.find(
          (candidateItem) => candidateItem.id === item.id,
        );
        if (targetItem) {
          return {
            ...targetItem,
            checked: item.checked,
          };
        }
        return item;
      });
    }, [candidateItems, selectedItemsProp]);

    const handleAdd = (id: string) => {
      if (onAdd) {
        onAdd(id);
      }
    };

    const handleRemove = (id: string) => {
      if (onRemove) {
        onRemove(id);
      }
    };

    return (
      <Styled.Container>
        <CandidateRenderer
          items={candidateItems}
          onAdd={handleAdd}
          onRemove={onRemove}
        />
        <Divider color={theme.palette.divider} orientation="vertical" />
        <SelectedList
          items={selectedItems}
          onRemove={handleRemove}
          onToggleChange={onToggleChange}
        />
      </Styled.Container>
    );
  },
);

export default DualListBox;
