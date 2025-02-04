import * as React from "react";
import { IconProps } from "../../Icon";

const FilterIcon: React.FunctionComponent<IconProps> = ({ fill }) => (
  <svg viewBox="0 0 24 24">
    <path fill={fill} d="M10 18h4v-2h-4v2ZM3 6v2h18V6H3Zm3 7h12v-2H6v2Z" />
  </svg>
);

export { FilterIcon };
