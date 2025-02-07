import * as React from "react";
import { IconProps } from "../../Icon";

const ExpandDiagonalSFillIcon: React.FunctionComponent<IconProps> = ({
  fill,
}) => (
  <svg viewBox="0 0 16 16">
    <path
      fill={fill}
      d="M12.7 3.3h-5l2 2-4.3 4.4-2-2v5h5l-2.1-2 4.3-4.4 2 2v-5Z"
    />
  </svg>
);

export { ExpandDiagonalSFillIcon };
