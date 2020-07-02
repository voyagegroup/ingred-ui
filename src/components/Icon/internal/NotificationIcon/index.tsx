import * as React from "react";
import { IconProps } from "../../Icon";

const NotificationIcon: React.FunctionComponent<IconProps> = ({
  type,
  fill,
}) => {
  switch (type) {
    case "fill":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            fill={fill}
            d="M20,17h2v2H2V17H4V10a8,8,0,1,1,16,0ZM9,21h6v2H9Z"
          />
        </svg>
      );
    case "line":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0 0h24v24H0V0z" />
          <path
            fill={fill}
            d="M20,17h2v2H2V17H4V10a8,8,0,1,1,16,0Zm-2,0V10A6,6,0,1,0,6,10v7ZM9,21h6v2H9Z"
          />
        </svg>
      );
  }
};

export { NotificationIcon };
