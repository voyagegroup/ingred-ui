import * as React from "react";
import { IconProps } from "../../Icon";

const ProfileIcon: React.FunctionComponent<IconProps> = ({ fill, type }) => {
  switch (type) {
    case "fill":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0,0H24V24H0Z" />
          <path
            fill={fill}
            d="M2,3.993A1,1,0,0,1,2.992,3H21.008A.993.993,0,0,1,22,3.993V20.007a1,1,0,0,1-.992.993H2.992A.993.993,0,0,1,2,20.007ZM6,15v2H18V15ZM6,7v6h6V7Zm8,0V9h4V7Zm0,4v2h4V11ZM8,9h2v2H8Z"
          />
        </svg>
      );
    case "line":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0,0H24V24H0Z" />
          <path
            fill={fill}
            d="M2,3.993A1,1,0,0,1,2.992,3H21.008A.993.993,0,0,1,22,3.993V20.007a1,1,0,0,1-.992.993H2.992A.993.993,0,0,1,2,20.007ZM4,5V19H20V5ZM6,7h6v6H6ZM8,9v2h2V9ZM6,15H18v2H6Zm8-8h4V9H14Zm0,4h4v2H14Z"
          />
        </svg>
      );
  }
};

export { ProfileIcon };
