import * as React from "react";
import { IconProps } from "../../Icon";

const OperatorContainsIcon: React.FunctionComponent<IconProps> = ({
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
            d="M3.9 19.1V4.9h16.2v14.2zM2 4c0-.6.4-1 1-1h18c.6 0 1 .4 1 1v16c0 .6-.4 1-1 1H3a1 1 0 0 1-1-1zm7.6 8.9h-2l1-2.8zm-.1-4.7H7.8l-2.9 7.6h1.7l.6-1.7H10l.6 1.7H16l1-.1.8-.4a2 2 0 0 0 .9-1.7 2 2 0 0 0-.4-1.2c-.2-.4-.6-.6-1-.7.3-.2.6-.4.7-.7.2-.2.3-.5.3-.9s0-.7-.2-.9l-.5-.6a2 2 0 0 0-.7-.3h-4.6v7.5zm6.2 3H14V9.6h2l.3.2.3.2v.5c0 .3 0 .5-.2.7l-.7.2zm0 3.3H14v-2h1.8c.4 0 .6 0 .9.2.2.1.3.4.3.8l-.1.5-.3.3-.4.1h-.4z"
          />
        </svg>
      );
    default:
      return null;
  }
};

export { OperatorContainsIcon };
