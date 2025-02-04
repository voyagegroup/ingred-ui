import * as React from "react";
import { IconProps } from "../../Icon";

const OperatorMatchIcon: React.FunctionComponent<IconProps> = ({
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
            d="M3.9 19.1V4.9h16.2v14.2zM2 4c0-.6.4-1 1-1h18c.6 0 1 .4 1 1v16c0 .6-.4 1-1 1H3a1 1 0 0 1-1-1zm11.1 9h-2.3L12 9.7zm0-5.5H11l-3.4 9h2l.7-2h3.4l.6 2h2.1z"
          />
        </svg>
      );
    default:
      return null;
  }
};

export { OperatorMatchIcon };
