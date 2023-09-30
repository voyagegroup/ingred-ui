import * as React from "react";
import * as Styled from "./styled";
import { ListRenderer } from "./internal/ListRenderer";
import { SelectedList } from "./internal/SelectedList";

export type Item = {
  id: string;
  label: string;
  items?: Item[];
};

export type UnselectedItem = Item & { selected?: boolean };

export type DualListBoxProps = {
  /** @todo 型定義を分割する */
  unselectedItems: UnselectedItem[];
  selectedItems: Item[];
  onAdd?: (id: string) => void;
  onRemove?: (id: string) => void;
  /** @todo */
  // onToggleInverse: (id: string) => void;
};

/**
 * @memo 表示するだけのものを作る
 * @memo is_inverse だったりの部分の設計は後で考える
 *       ちなみに、現時点で children を渡させる気はないので最終的にはこっちで回収する必要がある想定
 * @todo is_inverse の実装
 * @todo 未選択状態の検索機能
 * @todo selected/unselected の状態はこっちで持ってもいいかも？
 *       unselected の中に要素が存在したら checked にするとか？
 */
const DualListBox: React.FunctionComponent<DualListBoxProps> = ({
  unselectedItems,
  selectedItems,
  onAdd,
  onRemove,
}) => {
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
      <ListRenderer
        items={unselectedItems}
        onAdd={handleAdd}
        onRemove={onRemove}
      />
      <SelectedList items={selectedItems} onRemove={handleRemove} />
    </Styled.Container>
  );
};

export default DualListBox;
