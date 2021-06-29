import * as React from "react";
import * as Styled from "./styled";
import Checkbox from "../../../Checkbox";

export type Props = React.TdHTMLAttributes<HTMLTableDataCellElement> &
  React.ThHTMLAttributes<HTMLTableHeaderCellElement> & {
    header?: boolean;
    indeterminate?: boolean;
    selected?: boolean;
    onClick?: React.ComponentPropsWithoutRef<"input">["onClick"];
  };

export const CellCheckbox: React.FunctionComponent<Props> = ({
  header = false,
  indeterminate = false,
  selected = false,
  onClick,
  ...rest
}) => {
  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if (onClick) onClick(event);
  };
  const Component = header ? Styled.HeaderCell : Styled.StandardCell;
  return (
    <Component {...rest}>
      <Checkbox
        indeterminate={indeterminate}
        checked={selected}
        onClick={handleClick}
      />
    </Component>
  );
};
