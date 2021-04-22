import * as React from "react";
import * as Styled from "./styled";
import Checkbox from "../../../Checkbox";

export type Props = React.TdHTMLAttributes<HTMLTableDataCellElement> &
  React.ThHTMLAttributes<HTMLTableHeaderCellElement> & {
    header?: boolean;
    indeterminate?: boolean;
    selected?: boolean;
    onClick?: React.ComponentPropsWithRef<"input">["onClick"];
  };

export const CellCheckbox: React.FunctionComponent<Props> = ({
  header = false,
  indeterminate = false,
  selected = false,
  onClick,
  ...rest
}) => {
  const Component = header ? Styled.HeaderCell : Styled.StandardCell;
  return (
    <Component {...rest}>
      <Checkbox
        indeterminate={indeterminate}
        checked={selected}
        onClick={
          typeof onClick === "undefined"
            ? (event) => event.stopPropagation()
            : onClick
        }
      />
    </Component>
  );
};
