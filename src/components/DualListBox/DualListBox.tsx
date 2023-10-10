import * as React from "react";
import * as Styled from "./styled";
import { CandidateRenderer } from "./internal/CandidateRenderer";
import { SelectedList } from "./internal/SelectedList";
import Divider from "../Divider/Divider";
import { useTheme } from "../../themes";

export type ItemBase = {
  id: string;
  label: string;
};

export type DualListBoxItemSelectedWithToggle = ItemBase & { checked: boolean };
export type DualListBoxItemSelectedWithoutToggle = ItemBase & {
  checked?: undefined;
};

/**
 * @memo DualListBoxItemSelectedWithToggle をネスト可能にしたものが DualListBoxCandidateItemWithToggle
 */
export type DualListBoxCandidateItemWithToggle =
  DualListBoxItemSelectedWithToggle & {
    items?: DualListBoxCandidateItemWithToggle[];
  };

/**
 * @memo DualListBoxItemSelectedWithoutToggle をネスト可能にしたものが DualListBoxCandidateItemWithoutToggle
 */
export type DualListBoxCandidateItemWithoutToggle =
  DualListBoxItemSelectedWithoutToggle & {
    items?: DualListBoxCandidateItemWithoutToggle[];
  };

export type DualListBoxItem =
  | DualListBoxCandidateItemWithToggle
  | DualListBoxCandidateItemWithoutToggle;

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
 * @memo 内部で状態を保持するための型
 */
export type CandidateItem = DualListBoxItem & { selected?: boolean };

const DualListBox = React.forwardRef<HTMLDivElement, DualListBoxProps>(
  function DualListBox({
    candidateItems: candidateItemsProp,
    selectedItems,
    onAdd,
    onRemove,
    onToggleChange,
  }) {
    const theme = useTheme();

    const candidateItems: CandidateItem[] = React.useMemo(() => {
      return candidateItemsProp.map((item) => {
        if (selectedItems.some((selectedItem) => selectedItem.id === item.id)) {
          return {
            ...item,
            selected: true,
          };
        }
        return item;
      });
    }, [candidateItemsProp, selectedItems]);

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
