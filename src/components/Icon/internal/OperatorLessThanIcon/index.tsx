import * as React from "react";
import { IconProps } from "../../Icon";

const OperatorLessThanIcon: React.FunctionComponent<IconProps> = ({
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
            d="M3.9 19.1V4.9h16.2v14.2zM2 4c0-.6.4-1 1-1h18c.6 0 1 .4 1 1v16c0 .6-.4 1-1 1H3a1 1 0 0 1-1-1zm9.2 8 3 1.7c.4.3.5.7.3 1s-.7.6-1 .4l-4.2-2.4A.8.8 0 0 1 9 12c0-.3.2-.5.4-.7L13.5 9a.8.8 0 0 1 .7 1.4z"
          />
        </svg>
      );
    default:
      return null;
  }
};

export { OperatorLessThanIcon };
