import * as React from "react";
import { IconProps } from "../../Icon";

const ArrowDownIcon: React.FunctionComponent<IconProps> = ({ fill }) => (
  <svg viewBox="0 0 20 20">
    <path fill={fill} d="m10 10.9 4.1-4.1 1.2 1.1-5.3 5.3L4.7 8l1.2-1.1z" />
  </svg>
);

export { ArrowDownIcon };
