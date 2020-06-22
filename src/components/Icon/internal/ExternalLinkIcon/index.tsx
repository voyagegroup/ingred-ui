import * as React from "react";
import { IconProps } from "../../Icon";

const ExternalLinkIcon: React.FunctionComponent<IconProps> = ({
  fill,
  type,
}) => {
  switch (type) {
    case "line":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0,0H24V24H0Z" />
          <path
            fill={fill}
            d="M10,6V8H5V19H16V14h2v6a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V7A1,1,0,0,1,4,6ZM21,3v8H19V6.413l-7.793,7.794L9.793,12.793,17.585,5H13V3Z"
          />
        </svg>
      );
    case "fill":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0,0H24V24H0Z" />
          <path
            fill={fill}
            d="M10,6V8H5V19H16V14h2v6a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V7A1,1,0,0,1,4,6ZM21,3v9L17.206,8.207l-6,6L9.793,12.793l6-6L12,3Z"
          />
        </svg>
      );
  }
};

export { ExternalLinkIcon };
