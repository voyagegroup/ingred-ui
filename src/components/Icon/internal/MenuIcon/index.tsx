import * as React from "react";
import { IconProps } from "../../Icon";

const MenuIcon: React.FunctionComponent<IconProps> = ({ type, fill }) => {
  switch (type) {
    case "fill":
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3.24841 4.96185H21.2484V6.96185H3.24841V4.96185ZM3.24841 11.9619H21.2484V13.9619H3.24841V11.9619ZM3.24841 18.9619H21.2484V20.9619H3.24841V18.9619Z"
            fill={fill}
          />
        </svg>
      );
    case "line":
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"
            fill={fill}
          />
        </svg>
      );
  }
};

export { MenuIcon };
