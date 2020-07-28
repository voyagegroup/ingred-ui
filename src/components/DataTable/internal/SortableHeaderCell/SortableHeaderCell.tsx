import * as React from "react";
import * as Styled from "./styled";
import { OrderStatus } from "../../sort";
import Flex from "../../../Flex";
import Typography from "../../../Typography";
import Icon from "../../../Icon";
import { IconName } from "../../../Icon/Icon";
import Spacer from "../../../Spacer";

export type Props = React.ThHTMLAttributes<HTMLTableHeaderCellElement> & {
  sortable?: boolean;
  order?: OrderStatus;
  width?: string;
  children?: React.ReactNode;
  enableRuledLine?: boolean;
};

export const SortableHeaderCell: React.FunctionComponent<Props> = ({
  sortable = false,
  order = null,
  width = "auto",
  enableRuledLine = false,
  children,
  ...rest
}) => {
  let iconName: IconName = "sort_inactive";
  if (order === "desc") iconName = "sort_up";
  if (order === "asc") iconName = "sort_down";
  return (
    <Styled.HeaderCell
      width={width}
      isSortable={sortable}
      enableRuledLine={enableRuledLine}
      {...rest}
    >
      <Flex display="flex" alignItems="center">
        <Typography weight="bold" size="md" component="div">
          {children}
        </Typography>
        {sortable && (
          <>
            <Spacer pl={0.5} />
            <Icon name={iconName} size={"md"} />
          </>
        )}
      </Flex>
    </Styled.HeaderCell>
  );
};
