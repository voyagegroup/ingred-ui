import * as React from "react";
import { IconProps } from "../../Icon";

const MailIcon: React.FunctionComponent<IconProps> = ({ fill, type }) => {
  switch (type) {
    case "fill":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0,0H24V24H0Z" />
          <path
            fill={fill}
            d="M3,3H21a1,1,0,0,1,1,1V20a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V4A1,1,0,0,1,3,3Zm9.06,8.683L5.648,6.238,4.353,7.762l7.72,6.555,7.581-6.56L18.346,6.244l-6.285,5.439Z"
          />
        </svg>
      );
    case "line":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0,0H24V24H0Z" />
          <path
            fill={fill}
            d="M3,3H21a1,1,0,0,1,1,1V20a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V4A1,1,0,0,1,3,3ZM20,7.238l-7.928,7.1L4,7.216V19H20ZM4.511,5l7.55,6.662L19.5,5Z"
          />
        </svg>
      );
  }
};

export { MailIcon };
