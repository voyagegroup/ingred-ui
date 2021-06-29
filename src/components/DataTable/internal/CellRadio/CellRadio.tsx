import * as React from "react";
import * as Styled from "./styled";
import RadioButton from "../../../RadioButton";

type Props = React.TdHTMLAttributes<HTMLTableDataCellElement> &
  React.ThHTMLAttributes<HTMLTableHeaderCellElement> & {
    header?: boolean;
    selected?: boolean;
    onClick?: React.ComponentPropsWithoutRef<"input">["onClick"];
  };

export const CellRadio: React.FunctionComponent<Props> = ({
  header = false,
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
      {!header && <RadioButton checked={selected} onClick={handleClick} />}
    </Component>
  );
};
