import * as React from "react";
import { IconProps } from "../../Icon";

const NoLinkIcon: React.FunctionComponent<IconProps> = ({ fill }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path fill="none" d="M0,0H24V24H0Z" />
      <g transform="translate(-697.367 -422.478)">
        <path
          fill={fill}
          d="M709.23,428.684a4,4,0,1,1,5.657,5.657l-1.414,1.414,1.414,1.414,1.414-1.414.07-.069a6,6,0,0,0-8.555-8.416l-1.414,1.414,1.414,1.414Z"
        />
        <path
          fill={fill}
          d="M712.058,430.1h0l-2.128,2.127,1.414,1.414,2.128-2.128Z"
        />
        <path
          fill={fill}
          d="M709.23,440a4,4,0,0,1-5.657-5.657l1.414-1.414-1.414-1.414-1.414,1.414-.069.069a6,6,0,1,0,8.554,8.416L712.058,440l-1.414-1.414Z"
        />
        <path
          fill={fill}
          d="M701.977,427.1l.007-.007h0l-1.414,1.415,6.539,6.54-2.122,2.121,1.415,1.414,2.121-2.121,6.529,6.53,1.407-1.407Z"
        />
      </g>
    </svg>
  );
};

export { NoLinkIcon };
