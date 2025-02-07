import * as React from "react";
import { IconProps } from "../../Icon";

const OperatorGreaterThanIcon: React.FunctionComponent<IconProps> = ({
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
            d="M3.9 19.1V4.9h16.2v14.2zM2 4c0-.6.4-1 1-1h18c.6 0 1 .4 1 1v16c0 .6-.4 1-1 1H3a1 1 0 0 1-1-1zm10.3 8-3 1.7a.8.8 0 0 0 .8 1.4l4.1-2.4c.3-.2.4-.4.4-.7 0-.3-.1-.5-.4-.7L10.1 9a.8.8 0 0 0-.8 1.4z"
          />
        </svg>
      );
    default:
      return null;
  }
};

export { OperatorGreaterThanIcon };
