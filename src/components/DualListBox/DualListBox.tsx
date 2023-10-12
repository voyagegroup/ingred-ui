import * as React from "react";
import * as Styled from "./styled";
import { CandidateRenderer } from "./internal/CandidateRenderer";
import { SelectedList } from "./internal/SelectedList";
import Divider from "../Divider/Divider";
import { useTheme } from "../../themes";
import { getCandidateItems } from "./utils";

type DualListBoxItemId = string;

type DualListBoxItemSelectedWithToggle = {
  id: DualListBoxItemId;
  label: string;
  checked: boolean;
};

type DualListBoxItemSelected = {
  id: DualListBoxItemId;
  label: string;
  checked?: undefined;
};

export type DualListBoxItem = {
  id: DualListBoxItemId;
  label: string;
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

const DualListBox = React.forwardRef<HTMLDivElement, DualListBoxProps>(
  function DualListBox({
    candidateItems: candidateItemsProp,
    selectedItems: selectedItems,
    onAdd,
    onRemove,
    onToggleChange,
  }) {
    const theme = useTheme();

    const candidateItems: CandidateItem[] = React.useMemo(
      () => getCandidateItems(candidateItemsProp, selectedItems),
      [candidateItemsProp, selectedItems],
    );

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
