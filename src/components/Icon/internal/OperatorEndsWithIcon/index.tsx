import * as React from "react";
import { IconProps } from "../../Icon";

const OperatorEndsWithIcon: React.FunctionComponent<IconProps> = ({
  fill,
  type,
}) => {
  switch (type) {
    case "line":
      return (
        <svg viewBox="0 0 24 24">
          <path
            fill={fill}
            d="M15.5 12.9h-2l1-2.8zm-.2-4.7h-1.7l-2.8 7.6h1.7l.6-1.7h2.8l.6 1.7h1.7zM22 4c0-.6-.4-1-1-1H9.3v1.9h10.8v14.2H9.3V21H21c.6 0 1-.4 1-1zM7.5 3H5.7v1.9h1.8zM3.9 3H3c-.6 0-1 .4-1 1v1h1.9zM2 7v2h1.9V7zm0 4v2h1.9v-2zm0 4v2h1.9v-2zm0 4v1c0 .6.4 1 1 1h.9v-2zm3.7 2h1.8v-1.9H5.7z"
          />
        </svg>
      );
    default:
      return null;
  }
};

export { OperatorEndsWithIcon };
