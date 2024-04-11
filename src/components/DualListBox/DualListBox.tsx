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
  disableCheckbox?: boolean;
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
      disableCheckbox,
      onAdd: handleAdd,
      onRemove: handleRemove,
    } = useLocaleProps({ props: inProps, name: "DualListBox" });

    const theme = useTheme();

    const candidateItems: CandidateItem[] = React.useMemo(
      () => getCandidateItems(candidateItemsProp, selectedItems),
      [candidateItemsProp, selectedItems],
    );

    return (
      <Styled.Container>
        <CandidateRenderer
          disableCheckbox={disableCheckbox}
          items={candidateItems}
          onAdd={handleAdd}
          onRemove={handleRemove}
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
