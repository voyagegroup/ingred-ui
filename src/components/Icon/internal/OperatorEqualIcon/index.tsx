import * as React from "react";
import { IconProps } from "../../Icon";

const OperatorEqualIcon: React.FunctionComponent<IconProps> = ({
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
            d="M3.9 19.1V4.9h16.2v14.2zM2 4c0-.6.4-1 1-1h18c.6 0 1 .4 1 1v16c0 .6-.4 1-1 1H3a1 1 0 0 1-1-1zm6.8 5.5a.8.8 0 1 0 0 1.5h6.4a.8.8 0 1 0 0-1.5zm0 3.5a.8.8 0 0 0 0 1.5h6.4a.8.8 0 1 0 0-1.5z"
          />
        </svg>
      );
    default:
      return null;
  }
};

export { OperatorEqualIcon };
