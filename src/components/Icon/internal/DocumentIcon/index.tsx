import * as React from "react";
import { IconProps } from "../../Icon";

const DocumentIcon: React.FunctionComponent<IconProps> = ({ type, fill }) => {
  switch (type) {
    case "fill":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M0,0H24V24H0Z" fill="none" />
          <path
            d="M19,22H5a3,3,0,0,1-3-3V3A1,1,0,0,1,3,2H17a1,1,0,0,1,1,1V15h4v4A3,3,0,0,1,19,22Zm-1-5v2a1,1,0,0,0,2,0V17ZM6,7V9h8V7Zm0,4v2h8V11Zm0,4v2h5V15Z"
            fill={fill}
          />
        </svg>
      );
    case "line":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M0,0H24V24H0Z" fill="none" />
          <path
            d="M19,22H5a3,3,0,0,1-3-3V3A1,1,0,0,1,3,2H17a1,1,0,0,1,1,1V15h4v4A3,3,0,0,1,19,22Zm-1-5v2a1,1,0,0,0,2,0V17Zm-2,3V4H4V19a1,1,0,0,0,1,1ZM6,7h8V9H6Zm0,4h8v2H6Zm0,4h5v2H6Z"
            fill={fill}
          />
        </svg>
      );
  }
};

export { DocumentIcon };
