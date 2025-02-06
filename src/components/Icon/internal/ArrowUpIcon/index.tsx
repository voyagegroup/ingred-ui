import * as React from "react";
import { IconProps } from "../../Icon";

const ArrowUpIcon: React.FunctionComponent<IconProps> = ({ fill }) => (
  <svg viewBox="0 0 20 20">
    <path fill={fill} d="m10 9.1-4.1 4.1-1.2-1.1L10 6.8l5.3 5.3-1.2 1.1z" />
  </svg>
);

export { ArrowUpIcon };
