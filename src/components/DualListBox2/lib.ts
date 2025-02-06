import { createContext, Children, isValidElement, type ReactNode } from "react";
import { DualListBox2Item } from "./DualListBox2Item";
import type { Item } from "./types";

export const DualListBox2Context = createContext<{
  filterWords: string[];
  includedIds: string[];
  excludedIds: string[];
  activeSection: string | null;
  onIncludedChange: (includedIds: string[]) => void;
  onExcludedChange: (excludedIds: string[]) => void;
  setActiveSection: (activeSection: string | null) => void;
}>({
  filterWords: [],
  includedIds: [],
  excludedIds: [],
  activeSection: null,
  onIncludedChange: (_) => {},
  onExcludedChange: (_) => {},
  setActiveSection: (_) => {},
});

export const DualListBox2GroupContext = createContext<{
  groupName: string;
}>({ groupName: "" });

// children の中を再帰的に探索して、引数で渡したコールバックを実行する
export const traverseChildren = (
  children: ReactNode,
  callback: (child: ReactNode) => void,
): void => {
  Children.forEach(children, (child) => {
    callback(child);
    if (!isValidElement(child) || !child.props.children) return;
    traverseChildren(child.props.children, callback);
  });
};

// children の中から DualListBox2Item のみを抽出して、
// Item （id、ラベル、所属するセクション・アコーディオンの名前）の配列に変換する
export const extractAllItems = (children: ReactNode) => {
  const items: Item[] = [];
  traverseChildren(children, (child) => {
    if (
      isValidElement(child) &&
      typeof child.type !== "string" &&
      "displayName" in child.type &&
      child.type.displayName === DualListBox2Item.displayName
    ) {
      items.push({
        id: child.props.id,
        label: child.props.children,
        groupName: child.props.groupName,
      });
    }
  });
  return items;
};

// children の中から DualListBox2Item の id を抽出して配列にして返す
export const getAllIds = (children: ReactNode) => {
  return extractAllItems(children).map((item) => item.id);
};

// DualListBox2 用のユーティリティー関数。
// フラットな Item の配列を受け取って、groupName ごとに分けた配列に変換する
// DualListBox2 の children を作る際に便利。
type groupedItems = { groupName?: string; items: Item[] };
export const toGroupedItems = (items: Item[]) => {
  const groupedItems: groupedItems[] = items.reduce(
    (acc: groupedItems[], item) => {
      const group = acc.find((group) => group.groupName === item.groupName);
      if (group) {
        group.items.push(item);
      } else {
        acc.push({ groupName: item.groupName, items: [item] });
      }
      return acc;
    },
    [],
  );
  return groupedItems;
};
