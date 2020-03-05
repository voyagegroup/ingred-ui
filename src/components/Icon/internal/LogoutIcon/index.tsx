import * as React from "react";
import { IconProps } from "../../Icon";

const LogoutIcon: React.FunctionComponent<IconProps> = ({ fill }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path fill="none" d="M0,0H24V24H0Z" />
    <path
      fill={fill}
      d="M4,18H6v2H18V4H6V6H4V3A1,1,0,0,1,5,2H19a1,1,0,0,1,1,1V21a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1Zm2-7h7v2H6v3L1,12,6,8Z"
    />
  </svg>
);

export { LogoutIcon };
