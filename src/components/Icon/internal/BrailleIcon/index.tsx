import * as React from "react";
import { IconProps } from "../../Icon";

const BrailleIcon: React.FunctionComponent<IconProps> = ({ fill }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g transform="translate(24) rotate(90)">
      <path fill="none" d="M0,0H24V24H0Z" />
      <path
        fill={fill}
        d="M3.887,10.5a.887.887,0,1,0,.887.887A.89.89,0,0,0,3.887,10.5Zm8.87,0a.887.887,0,1,0,.887.887A.89.89,0,0,0,12.757,10.5Zm-4.435,0a.887.887,0,1,0,.887.887A.89.89,0,0,0,8.322,10.5Z"
        transform="translate(3.774 2.709)"
      />
      <path
        fill={fill}
        d="M3.887,10.5a.887.887,0,1,0,.887.887A.89.89,0,0,0,3.887,10.5Zm8.87,0a.887.887,0,1,0,.887.887A.89.89,0,0,0,12.757,10.5Zm-4.435,0a.887.887,0,1,0,.887.887A.89.89,0,0,0,8.322,10.5Z"
        transform="translate(3.774 -1.291)"
      />
    </g>
  </svg>
);

export { BrailleIcon };
