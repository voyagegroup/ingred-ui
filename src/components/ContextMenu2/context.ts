import { createContext } from "react";

export const ContextMenu2Context = createContext<{
  isRoot: boolean;
  activeIndex: number | null;
  maxActiveIndex: number;
  setActiveIndex: (index: number | null) => void;
  close: () => void;
}>({
  isRoot: false,
  activeIndex: null,
  maxActiveIndex: -1,
  setActiveIndex: () => {},
  close: () => {},
});
