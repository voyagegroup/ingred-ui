import * as React from "react";
import * as Styled from "./styled";
import { UnselectedRenderer } from "./internal/UnselectedRenderer";
import { SelectedList } from "./internal/SelectedList";
import Divider from "../Divider/Divider";
import { useTheme } from "../../themes";

export type Item = {
  id: string;
  label: string;
  items?: Item[];
  isInverse?: boolean;
};

/**
 * @memo 内部で状態を保持するための型
 */
export type UnselectedItem = Item & { selected?: boolean };

export type DualListBoxProps = {
  unselectedItems: Item[];
  selectedItems: Item[];
  onAdd?: (id: string) => void;
  onRemove?: (id: string) => void;
  onToggleInverse?: (id: string) => void;
};

/**
 * @memo 表示するだけのものを作る
 * @memo is_inverse だったりの部分の設計は後で考える
 *       ちなみに、現時点で children を渡させる気はないので最終的にはこっちで回収する必要がある想定
 * @todo is_inverse の実装
 * @todo 未選択状態の検索機能
 */
const DualListBox: React.FunctionComponent<DualListBoxProps> = ({
  unselectedItems: unselectedItemsProp,
  selectedItems,
  onAdd,
  onRemove,
  onToggleInverse,
}) => {
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
};

export default DualListBox;
