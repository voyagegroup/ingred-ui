import * as React from "react";
import { IconProps } from "../../Icon";

const LineChartFramedIcon: React.FunctionComponent<IconProps> = ({
  fill,
  type,
}) => {
  switch (type) {
    case "line":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M0,0H24V24H0Z" fill="none" />
          <path
            style={{ fill }}
            d="M18.454,6.293l1.214,1.214-4.9,4.9L12.193,9.832,8.507,13.517,7.293,12.3l4.9-4.9,2.576,2.575Z"
            transform="translate(-1.429 2.273)"
          />
          <g
            style={{ stroke: fill, strokeWidth: "2px" }}
            fill="none"
            transform="translate(2 3)"
          >
            <rect style={{ stroke: "none" }} width="20" height="18" rx="1" />
            <rect fill="none" x="1" y="1" width="18" height="16" />
          </g>
        </svg>
      );
    case "fill":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M0,0H24V24H0Z" fill="none" />
          <path
            fill={fill}
            d="M-4335-778h-18a1,1,0,0,1-1-1v-16a1,1,0,0,1,1-1h18a1,1,0,0,1,1,1v16A1,1,0,0,1-4335-778Zm-10.373-11.324-5.445,4.9,1.349,1.214,4.1-3.686,2.862,2.576,5.444-4.9-1.349-1.214-4.1,3.685Z"
            transform="translate(4356 799)"
          />
        </svg>
      );
  }
};

export { LineChartFramedIcon };
