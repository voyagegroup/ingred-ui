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
      const props = child.props as { id?: string };
      if (typeof props.id !== "string") return;
      newRowIds.push(props.id);
    });
    if (newRowIds.filter((id) => !rowIds.includes(id)).length === 0) return;
    setRowIds(newRowIds);
  }, [children, rowIds, setRowIds]);

  return <tbody>{children}</tbody>;
};
