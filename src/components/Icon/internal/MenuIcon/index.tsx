import * as React from "react";
import { IconProps } from "../../Icon";

const MenuIcon: React.FunctionComponent<IconProps> = ({ fill }) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z" fill={fill} />
  </svg>
);

export { MenuIcon };
