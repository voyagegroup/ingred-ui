import * as React from "react";
import { IconProps } from "../../Icon";

const CloseCircleFillIcon: React.FunctionComponent<IconProps> = ({ fill }) => (
  <svg viewBox="0 0 16 16">
    <path
      fill={fill}
      d="M8 14.7A6.7 6.7 0 1 1 8 1.3a6.7 6.7 0 0 1 0 13.4ZM8 7 6.1 5l-1 1 2 1.9-2 1.9 1 1 1.9-2 1.9 2 1-1-2-1.9 2-1.9-1-1L8 7Z"
    />
  </svg>
);

export { CloseCircleFillIcon };
