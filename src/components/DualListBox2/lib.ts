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

export const getAllIds = (children: ReactNode) => {
  return extractAllItems(children).map((item) => item.id);
};

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
