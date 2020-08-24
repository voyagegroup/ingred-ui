import * as React from "react";
import { IconProps } from "../../Icon";

const AlartIcon: React.FunctionComponent<IconProps> = ({ fill, type }) => {
  switch (type) {
    case "fill":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0,0H24V24H0Z" />
          <path
            fill={fill}
            d="M12.866,3l9.526,16.5a1,1,0,0,1-.866,1.5H2.474a1,1,0,0,1-.866-1.5L11.134,3a1,1,0,0,1,1.732,0ZM11,16v2h2V16Zm0-7v5h2V9Z"
          />
        </svg>
      );
    case "line":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0,0H24V24H0Z" />
          <path
            fill={fill}
            d="M12.866,3l9.526,16.5a1,1,0,0,1-.866,1.5H2.474a1,1,0,0,1-.866-1.5L11.134,3a1,1,0,0,1,1.732,0ZM4.206,19H19.794L12,5.5,4.206,19ZM11,16h2v2H11Zm0-7h2v5H11Z"
          />
        </svg>
      );
  }
};

export { AlartIcon };
