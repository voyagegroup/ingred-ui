import * as React from "react";
import { IconProps } from "../../Icon";

const AddLineIcon: React.FunctionComponent<IconProps> = ({ fill, type }) => {
  switch (type) {
    case "line":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0,0H24V24H0Z" />
          <path
            fill={fill}
            d="M11,11V7h2v4h4v2H13v4H11V13H7V11Zm1,11A10,10,0,1,1,22,12,10,10,0,0,1,12,22Zm0-2a8,8,0,1,0-8-8A8,8,0,0,0,12,20Z"
          />
        </svg>
      );
    case "fill":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0,0H24V24H0Z" />
          <path
            fill={fill}
            d="M12,22A10,10,0,1,1,22,12,10,10,0,0,1,12,22ZM11,11H7v2h4v4h2V13h4V11H13V7H11Z"
          />
        </svg>
      );
  }
};

export { AddLineIcon };
