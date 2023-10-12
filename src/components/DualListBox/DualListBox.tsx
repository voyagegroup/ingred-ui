import * as React from "react";
import * as Styled from "./styled";
import { CandidateRenderer } from "./internal/CandidateRenderer";
import { SelectedList } from "./internal/SelectedList";
import Divider from "../Divider/Divider";
import { useTheme } from "../../themes";
import { getCandidateItems } from "./utils";
import { useLocaleProps } from "../../hooks/useLocaleProps";

type DualListBoxItemId = string;

type DualListBoxItemSelectedWithToggle = {
  id: DualListBoxItemId;
  checked: boolean;
};

type DualListBoxItemSelected = {
  id: DualListBoxItemId;
  checked?: undefined;
};

export type DualListBoxItem = {
  id: DualListBoxItemId;
  label?: string;
  items?: DualListBoxItem[];
};

export type DualListBoxSelectedItem =
  | DualListBoxItemSelectedWithToggle
  | DualListBoxItemSelected;

type BaseProps = {
  candidateItems: DualListBoxItem[];
  onAdd?: (id: DualListBoxItemId) => void;
  onRemove?: (id: DualListBoxItemId) => void;
};

export type DualListBoxProps = BaseProps &
  (
    | {
        selectedItems: DualListBoxItemSelected[];
        onToggleChange?: undefined;
      }
    | {
        selectedItems: DualListBoxItemSelectedWithToggle[];
        onToggleChange: (id: DualListBoxItemId) => void;
      }
  );

/**
 * @memo 内部で選択候補の状態を保持するための型
 */
export type CandidateItem = DualListBoxItem & {
  selected?: boolean;
};

/**
 * @memo 内部で選択済みの状態を保持するための型
 */
export type SelectedItem = DualListBoxSelectedItem & {
  label?: string;
};

const DualListBox = React.forwardRef<HTMLDivElement, DualListBoxProps>(
  function DualListBox(inProps) {
    const {
      candidateItems: candidateItemsProp,
      selectedItems: selectedItemsProp,
      selectedItemTitle,
      onAdd,
      onRemove,
      onToggleChange,
    } = useLocaleProps({ props: inProps, name: "DualListBox" });

    const theme = useTheme();

    const candidateItems: CandidateItem[] = React.useMemo(
      () => getCandidateItems(candidateItemsProp, selectedItemsProp),
      [candidateItemsProp, selectedItemsProp],
    );

    const selectedItems: DualListBoxSelectedItem[] = React.useMemo(() => {
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
          selectedItemTitle={selectedItemTitle}
          onRemove={handleRemove}
          onToggleChange={onToggleChange}
        />
      </Styled.Container>
    );
  },
);

export default DualListBox;
