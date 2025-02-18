import * as React from "react";
import { IconProps } from "../../Icon";

const OperatorDoesNotMatchIcon: React.FunctionComponent<IconProps> = ({
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
            d="M3.9 19.1V4.9h16.2v14.2zM2 4c0-.6.4-1 1-1h18c.6 0 1 .4 1 1v16c0 .6-.4 1-1 1H3a1 1 0 0 1-1-1zm7.1 8.4L11 7.5h2l1 2.7 3.7-1.7a.8.8 0 0 1 .6 1.4l-3.7 1.8 1.8 4.8h-2l-.7-2h-3.4l-.7 2h-2l.7-2-2 1c-.4.2-.8 0-1-.4s0-.9.4-1zm2.6.6h1.4l-.2-.6zm.7-2L12 9.6l-.6 1.7z"
          />
        </svg>
      );
    default:
      return null;
  }
};

export { OperatorDoesNotMatchIcon };
