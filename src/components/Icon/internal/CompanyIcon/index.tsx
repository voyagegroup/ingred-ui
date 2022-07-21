import * as React from "react";
import { IconProps } from "../../Icon";

const CompanyIcon: React.FunctionComponent<IconProps> = ({ type, fill }) => {
  switch (type) {
    case "fill":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M0,0H24V24H0Z" fill="none" />
          <path
            fill={fill}
            d="M21,20h2v2H1V20H3V3A1,1,0,0,1,4,2H20a1,1,0,0,1,1,1ZM8,11v2h3V11ZM8,7V9h3V7Zm0,8v2h3V15Zm5,0v2h3V15Zm0-4v2h3V11Zm0-4V9h3V7Z"
          />
        </svg>
      );
    case "line":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M0,0H24V24H0Z" fill="none" />
          <path
            fill={fill}
            d="M21,20h2v2H1V20H3V3A1,1,0,0,1,4,2H20a1,1,0,0,1,1,1Zm-2,0V4H5V20ZM8,11h3v2H8ZM8,7h3V9H8Zm0,8h3v2H8Zm5,0h3v2H13Zm0-4h3v2H13Zm0-4h3V9H13Z"
          />
        </svg>
      );
  }
};

export { CompanyIcon };
