import * as React from "react";
import { IconProps } from "../../Icon";

const ArrowLeftIcon: React.FunctionComponent<IconProps> = ({ fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    transform="rotate(90)"
  >
    <path fill="none" d="M0,0H24V24H0Z" />
    <path
      fill={fill}
      d="M13.414,16.886,7.757,11.228,9.644,9.343l3.771,3.772,3.771-3.772,1.887,1.885Z"
      transform="translate(-1.414 -1.114)"
    />
  </svg>
);

export { ArrowLeftIcon };
