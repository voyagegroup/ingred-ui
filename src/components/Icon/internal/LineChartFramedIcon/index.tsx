import * as React from "react";
import { IconProps } from "../../Icon";

const LineChartFramedIcon: React.FunctionComponent<IconProps> = ({ fill }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        fill={fill}
        d="M18.454,6.293l1.214,1.214-4.9,4.9L12.193,9.832,8.507,13.517,7.293,12.3l4.9-4.9,2.576,2.575Z"
        transform="translate(-1.429 2.273)"
      />
      <g
        style={{ fill: "none", stroke: fill, strokeWidth: "2px" }}
        transform="translate(3 3)"
      >
        <rect style={{ stroke: "none" }} width="18" height="18" rx="1" />
        <rect style={{ fill: "none" }} x="1" y="1" width="16" height="16" />
      </g>
    </svg>
  );
};

export { LineChartFramedIcon };
