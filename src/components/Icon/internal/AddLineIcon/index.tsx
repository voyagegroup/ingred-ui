import * as React from "react";
import { IconProps } from "../../Icon";

const AddLineIcon: React.FunctionComponent<IconProps> = ({ fill }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
      <g fill="none" stroke={fill}>
        <circle cx="9" cy="9" r="9" stroke="none" />
        <circle cx="9" cy="9" r="8" fill="none" />
      </g>
      <rect width="8" height="2" transform="translate(5 8)" fill={fill} />
      <rect
        width="8"
        height="2"
        transform="translate(10 5) rotate(90)"
        fill={fill}
      />
    </svg>
  );
};

export { AddLineIcon };
