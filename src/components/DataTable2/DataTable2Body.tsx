import React, {
  Children,
  useEffect,
  useContext,
  isValidElement,
  type ReactNode,
} from "react";
import { DataTable2Context } from "./context";

////////////////////////////////////////////////////////////////////////////////
// Public Components
////////////////////////////////////////////////////////////////////////////////
export const DataTable2Body = ({ children }: { children: ReactNode }) => {
  const { rowIds, setRowIds } = useContext(DataTable2Context);
  useEffect(() => {
    const newRowIds: string[] = [];
    Children.forEach(children, (child) => {
      if (!isValidElement(child)) return;
      if (typeof child.props.id !== "string") return;
      newRowIds.push(child.props.id);
    });
    // rowIdsが変化した場合のみsetRowIdsを呼び出す
    if (
      newRowIds.length === rowIds.length &&
      newRowIds.every((id) => rowIds.includes(id))
    )
      return;
    setRowIds(newRowIds);
  }, [children, rowIds, setRowIds]);

  return <tbody>{children}</tbody>;
};
