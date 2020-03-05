import * as React from "react";
import { IconProps } from "../../Icon";

const CheckIcon: React.FunctionComponent<IconProps> = ({ fill }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
    <path d="M0,0H18V18H0Z" fill="none" />
    <rect
      fill={fill}
      width="1.721"
      height="6.084"
      transform="translate(2.895 10.011) rotate(-45)"
    />
    <rect
      fill={fill}
      width="1.72"
      height="11.317"
      transform="translate(15.126 3.951) rotate(45)"
    />
  </svg>
);

export { CheckIcon };
