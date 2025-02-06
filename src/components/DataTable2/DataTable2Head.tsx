import React, { Children, isValidElement, type ReactNode } from "react";
import * as styled from "./styled";
import { ColumnContext } from "./context";

////////////////////////////////////////////////////////////////////////////////
// Public Components
////////////////////////////////////////////////////////////////////////////////
type DataTable2HeadProps = {
  children: ReactNode;
};

export const DataTable2Head = ({ children }: DataTable2HeadProps) => {
  return (
    <>
      {/* 幅を決めるための <col/> 展開する。<th> 自体には width を指定しない */}
      <colgroup>
        <col style={{ width: 34 }} />
        {Children.map(children, (child, i) => {
          if (!isValidElement(child)) return null;
          return <col key={i} style={{ width: child.props.width }} />;
        })}
      </colgroup>
      <styled.DataTable2Header>
        <tr>
          <th aria-label="empty cell" />
          {Children.map(children, (child, i) => {
            return (
              <ColumnContext.Provider value={{ index: i }}>
                {child}
              </ColumnContext.Provider>
            );
          })}
        </tr>
      </styled.DataTable2Header>
    </>
  );
};
