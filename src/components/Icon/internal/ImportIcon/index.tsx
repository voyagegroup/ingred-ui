import * as React from "react";
import { IconProps } from "../../Icon";

const ImportIcon: React.FunctionComponent<IconProps> = ({ fill, type }) => {
  switch (type) {
    case "line":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
          <path d="M0 0h18v18H0z" fill="none" />
          <path
            fill={fill}
            d="M10.25,8.25H14l-4.5,4.5L5,8.25H8.75V3h1.5ZM3.5,15h12V9.75H17v6a.75.75,0,0,1-.75.75H2.75A.75.75,0,0,1,2,15.75v-6H3.5Z"
            transform="translate(-0.5 -0.75)"
          />
        </svg>
      );
    case "fill":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0,0H24V24H0Z" />
          <path
            fill={fill}
            d="M4,19H20V12h2v8a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V12H4ZM14,9h5l-7,7L5,9h5V3h4Z"
          />
        </svg>
      );
  }
};

export { ImportIcon };
