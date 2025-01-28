import * as React from "react";
import { IconProps } from "../../Icon";

const ArrowRightIcon: React.FunctionComponent<IconProps> = ({ fill }) => (
  <svg viewBox="0 0 20 20">
    <path fill={fill} d="M10.9 10 6.8 5.9l1.1-1.2 5.3 5.3L8 15.3l-1.1-1.2z" />
  </svg>
);

export { ArrowRightIcon };
