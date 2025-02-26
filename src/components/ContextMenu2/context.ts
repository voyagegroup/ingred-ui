import { createContext } from "react";

export const ContextMenu2Context = createContext({
  isRoot: false,
  close: () => {},
});
