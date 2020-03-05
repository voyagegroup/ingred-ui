import * as React from "react";
import { IconProps } from "../../Icon";

const ArrowBottomIcon: React.FunctionComponent<IconProps> = ({ fill }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path fill="none" d="M0,0H24V24H0Z" />
    <path
      fill={fill}
      d="M12,15,7.757,10.757,9.172,9.343,12,12.172l2.828-2.829,1.415,1.414Z"
    />
  </svg>
);

export { ArrowBottomIcon };
