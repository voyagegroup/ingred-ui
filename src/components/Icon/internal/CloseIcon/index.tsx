import * as React from "react";
import { IconProps } from "../../Icon";

const CloseIcon: React.FunctionComponent<IconProps> = ({ fill }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <rect
      fill={fill}
      width="5.142"
      height="23.141"
      rx="2.571"
      transform="translate(18.364 2) rotate(45)"
    />
    <rect
      fill={fill}
      width="5.143"
      height="23.141"
      rx="2.571"
      transform="translate(2 5.636) rotate(-45)"
    />
  </svg>
);

export { CloseIcon };
