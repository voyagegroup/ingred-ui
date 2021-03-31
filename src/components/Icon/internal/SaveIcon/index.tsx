import * as React from "react";
import { IconProps } from "../../Icon";

const SaveIcon: React.FunctionComponent<IconProps> = ({ fill, type }) => {
  switch (type) {
    case "fill":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill={fill}
            d="M18,21V13H6v8H4a1,1,0,0,1-1-1V4A1,1,0,0,1,4,3H17l4,4V20a1,1,0,0,1-1,1Zm-2,0H8V15h8Z"
          />
        </svg>
      );
    case "line":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill={fill}
            d="M7,19V13H17v6h2V7.828L16.172,5H5V19ZM4,3H17l4,4V20a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V4A1,1,0,0,1,4,3ZM9,15v4h6V15Z"
          />
        </svg>
      );
  }
};

export { SaveIcon };
