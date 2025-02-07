import * as React from "react";
import { IconProps } from "../../Icon";

const OperatorStartsWithIcon: React.FunctionComponent<IconProps> = ({
  fill,
  type,
}) => {
  switch (type) {
    case "line":
      return (
        <svg viewBox="0 0 24 24">
          <path
            fill={fill}
            d="M8.5 12.9h2l-1-2.8zm.2-4.7h1.7l2.8 7.6h-1.7l-.6-1.7H8.1l-.6 1.7H5.8zM2 4c0-.6.4-1 1-1h11.7v1.9H3.9v14.2h10.8V21H3c-.6 0-1-.4-1-1zm14.5-1h1.8v1.9h-1.8zm3.6 0h.9c.6 0 1 .4 1 1v1h-1.9zM22 7v2h-1.9V7zm0 4v2h-1.9v-2zm0 4v2h-1.9v-2zm0 4v1c0 .6-.4 1-1 1h-.9v-2zm-3.7 2h-1.8v-1.9h1.8z"
          />
        </svg>
      );
    default:
      return null;
  }
};

export { OperatorStartsWithIcon };
