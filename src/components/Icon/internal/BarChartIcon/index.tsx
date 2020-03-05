import * as React from "react";
import { IconProps } from "../../Icon";

const BarChartIcon: React.FunctionComponent<IconProps> = ({ type, fill }) => {
  switch (type) {
    case "fill":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <rect fill="none" width="24" height="24" />
          <path fill={fill} d="M2,13H8v8H2ZM9,3h6V21H9Zm7,5h6V21H16Z" />
        </svg>
      );
    case "line":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0,0H24V24H0Z" />
          <path
            fill={fill}
            d="M2,13H8v8H2ZM16,8h6V21H16ZM9,3h6V21H9ZM4,15v4H6V15ZM11,5V19h2V5Zm7,5v9h2V10Z"
          />
        </svg>
      );
  }
};

export { BarChartIcon };
