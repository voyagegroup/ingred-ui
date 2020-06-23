import * as React from "react";
import { IconProps } from "../../Icon";

const DeleteBinIcon: React.FunctionComponent<IconProps> = ({ fill, type }) => {
  switch (type) {
    case "line":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
          <path d="M0,0H18V18H0Z" fill="none" />
          <path
            fill={fill}
            d="M13.25,5H17V6.5H15.5v9.75a.75.75,0,0,1-.75.75H4.25a.75.75,0,0,1-.75-.75V6.5H2V5H5.75V2.75A.75.75,0,0,1,6.5,2h6a.75.75,0,0,1,.75.75ZM14,6.5H5v9h9ZM7.25,8.75h1.5v4.5H7.25Zm3,0h1.5v4.5h-1.5Zm-3-5.25V5h4.5V3.5Z"
            transform="translate(-0.5 -0.5)"
          />
        </svg>
      );
    case "fill":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0,0H24V24H0Z" />
          <path
            fill={fill}
            d="M17,6h5V8H20V21a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V8H2V6H7V3A1,1,0,0,1,8,2h8a1,1,0,0,1,1,1ZM9,11v6h2V11Zm4,0v6h2V11ZM9,4V6h6V4Z"
          />
        </svg>
      );
  }
};

export { DeleteBinIcon };
