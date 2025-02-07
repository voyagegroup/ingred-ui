import * as React from "react";
import { IconProps } from "../../Icon";

const OperatorNotEqualIcon: React.FunctionComponent<IconProps> = ({
  fill,
  type,
}) => {
  switch (type) {
    case "line":
      return (
        <svg viewBox="0 0 24 24">
          <path
            fill={fill}
            fillRule="evenodd"
            d="M3.9 19.1V4.9h16.2v14.2zM2 4c0-.6.4-1 1-1h18c.6 0 1 .4 1 1v16c0 .6-.4 1-1 1H3a1 1 0 0 1-1-1zm12.6 2.6c.4.2.6.6.4 1l-1 1.9h1.2a.8.8 0 1 1 0 1.5h-1.8l-1 2h2.8a.8.8 0 1 1 0 1.5h-3.5L10.5 17a.8.8 0 1 1-1.5-.6l1-1.9H8.7a.8.8 0 0 1 0-1.5h1.8l1-2H8.8a.8.8 0 1 1 0-1.5h3.5L13.5 7c.2-.4.7-.6 1.1-.4z"
          />
        </svg>
      );
    default:
      return null;
  }
};

export { OperatorNotEqualIcon };
