import * as React from "react";
import * as Styled from "./styled";
import { CandidateRenderer } from "./internal/CandidateRenderer";
import { SelectedList } from "./internal/SelectedList";
import Divider from "../Divider/Divider";
import { useTheme } from "../../themes";
import { getCandidateItems } from "./utils";
import { useLocaleProps } from "../../hooks/useLocaleProps";

export type DualListBoxItem = {
  id: string;
  content: React.ReactNode;
};

export type DualListBoxCandidateItem = DualListBoxItem & {
  items?: DualListBoxCandidateItem[];
};

export type DualListBoxProps = {
  candidateItems: DualListBoxCandidateItem[];
  selectedItems: DualListBoxItem[];
  onAdd?: (item: DualListBoxItem) => void;
  onRemove?: (item: DualListBoxItem) => void;
};

/**
 * @memo 内部で選択候補の状態を保持するための型
 */
export type CandidateItem = DualListBoxCandidateItem & {
  selected?: boolean;
};

const DualListBox = React.forwardRef<HTMLDivElement, DualListBoxProps>(
  function DualListBox(inProps) {
    const {
      candidateItems: candidateItemsProp,
      selectedItems,
      selectedItemTitle,
      onAdd,
      onRemove,
    } = useLocaleProps({ props: inProps, name: "DualListBox" });

    const theme = useTheme();

    const candidateItems: CandidateItem[] = React.useMemo(
      () => getCandidateItems(candidateItemsProp, selectedItems),
      [candidateItemsProp, selectedItems],
    );

    const handleAdd = (item: DualListBoxItem) => {
      if (onAdd) {
        onAdd(item);
      }
    };

    const handleRemove = (item: DualListBoxItem) => {
      if (onRemove) {
        onRemove(item);
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
        />
      </Styled.Container>
    );
  },
);

export default DualListBox;
