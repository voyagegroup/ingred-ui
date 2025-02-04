import { createContext, Children, isValidElement, type ReactNode } from "react";
import { DualListBox2Item } from "./DualListBox2Item";

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

export const getAllIds = (children: ReactNode) => {
  const allIds: string[] = [];
  traverseChildren(children, (child) => {
    if (
      isValidElement(child) &&
      typeof child.type !== "string" &&
      "displayName" in child.type &&
      child.type.displayName === DualListBox2Item.displayName
    )
      allIds.push(child.props.id);
  });
  return allIds;
};
