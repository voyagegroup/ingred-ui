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
    // 表示されている行 ( Children ) の ids が変更されていない場合は rowIds を更新しない
    if (
      newRowIds.length === rowIds.length &&
      newRowIds.every((id) => rowIds.includes(id))
    )
      return;
    setRowIds(newRowIds);
  }, [children, rowIds, setRowIds]);

  return <tbody>{children}</tbody>;
};
