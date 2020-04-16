import * as React from "react";
import * as Styled from "./styled";
import { OrderStatus } from "../../sort";
import Flex from "../../../Flex";
import Typography from "../../../Typography";
import Icon from "../../../Icon";
import { IconName } from "../../../Icon/Icon";

export type Props = React.ThHTMLAttributes<HTMLTableHeaderCellElement> & {
  sortable?: boolean;
  order?: OrderStatus;
  width?: string;
  children?: React.ReactNode;
};

export const SortableHeaderCell: React.FunctionComponent<Props> = ({
  sortable = false,
  order = null,
  width = "auto",
  children,
  ...rest
}) => {
  let iconName: IconName = "sort_inactive";
  if (order === "desc") iconName = "sort_up";
  if (order === "asc") iconName = "sort_down";
  return (
    <Styled.HeaderCell width={width} isSortable={sortable} {...rest}>
      <Flex display="flex" alignItems="flex-start">
        <Typography color="secondary" weight="bold" size="md" component="span">
          {children}
        </Typography>
        {sortable && (
          <Styled.IconContainer>
            <Icon name={iconName} size={"md"} />
          </Styled.IconContainer>
        )}
      </Flex>
    </Styled.HeaderCell>
  );
};
