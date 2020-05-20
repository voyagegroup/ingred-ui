import * as React from "react";
import { IconProps } from "../../Icon";

const ArrowDoubleRightIcon: React.FunctionComponent<IconProps> = ({ fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 18"
      transform="rotate(180)"
    >
      <path d="M0,0H18V18H0Z" fill="none" />
      <path
        fill={fill}
        d="M12,15,7.757,10.757,9.172,9.343,12,12.172l2.828-2.829,1.415,1.414Z"
        transform="translate(23.171 -2.829) rotate(90)"
      />
      <path
        fill={fill}
        d="M12,15,7.757,10.757,9.172,9.343,12,12.172l2.828-2.829,1.415,1.414Z"
        transform="translate(19.171 -2.829) rotate(90)"
      />
    </svg>
  );
};

export { ArrowDoubleRightIcon };
