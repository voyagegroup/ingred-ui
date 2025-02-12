import * as React from "react";
import { IconProps } from "../../Icon";

const OperatorLessThanOrEqualToIcon: React.FunctionComponent<IconProps> = ({
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
            d="M3.9 19.1V4.9h16.2v14.2zM2 4c0-.6.4-1 1-1h18c.6 0 1 .4 1 1v16c0 .6-.4 1-1 1H3a1 1 0 0 1-1-1zm4.3 7.3c-.3.2-.4.4-.4.7 0 .3.1.5.4.7l3.6 2a.8.8 0 1 0 .8-1.2L8 12l2.6-1.5a.8.8 0 0 0-.8-1.3zm6.6-1.8a.8.8 0 1 0 0 1.5h4.7a.8.8 0 1 0 0-1.5zm0 3.5a.8.8 0 1 0 0 1.5h4.7a.8.8 0 1 0 0-1.5z"
          />
        </svg>
      );
    default:
      return null;
  }
};

export { OperatorLessThanOrEqualToIcon };
