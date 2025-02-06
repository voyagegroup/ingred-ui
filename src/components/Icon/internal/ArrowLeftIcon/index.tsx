import * as React from "react";
import { IconProps } from "../../Icon";

const ArrowLeftIcon: React.FunctionComponent<IconProps> = ({ fill }) => (
  <svg viewBox="0 0 20 20">
    <path fill={fill} d="m9.1 10 4.1 4.1-1.1 1.2L6.8 10 12 4.7l1.1 1.2z" />
  </svg>
);

export { ArrowLeftIcon };
