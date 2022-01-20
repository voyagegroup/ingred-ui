import * as React from "react";
import { IconProps } from "../../Icon";

const BidStrapIcon: React.FunctionComponent<IconProps> = ({ fill }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <defs>
      <clipPath>
        <rect width="13.729" height="20" fill={fill} />
      </clipPath>
    </defs>
    <rect width="24" height="24" fill="none" />
    <g transform="translate(5.137 2)">
      <g clipPath="url(#clip-path)">
        <path
          d="M13.729,5.718A5.718,5.718,0,1,0,3.051,8.56a6.139,6.139,0,1,0,8.181,1.88,5.717,5.717,0,0,0,2.5-4.722M9.594,7.8l-.972,4.33A3.033,3.033,0,1,1,4.7,11.192l.967-4.308A2.614,2.614,0,1,1,9.594,7.8"
          fill={fill}
        />
        <path
          d="M27.455,36.133a1.31,1.31,0,0,1-.284-.032,1.294,1.294,0,0,1-.979-1.545l1.418-6.318a1.293,1.293,0,1,1,2.524.566l-1.418,6.318a1.294,1.294,0,0,1-1.261,1.01"
          transform="translate(-21.071 -21.931)"
          fill={fill}
        />
      </g>
    </g>
  </svg>
);

export { BidStrapIcon };
