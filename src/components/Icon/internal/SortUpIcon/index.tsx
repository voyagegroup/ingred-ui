import * as React from "react";
import { IconProps } from "../../Icon";
import { colors } from "../../../../styles/color";

const SortUpIcon: React.FunctionComponent<IconProps> = ({ fill }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
    <path d="M0 0h18v18H0z" fill="none" />
    <path
      d="M3.168,1.248a1,1,0,0,1,1.664,0l2.131,3.2A1,1,0,0,1,6.131,6H1.869a1,1,0,0,1-.832-1.555Z"
      transform="translate(5 2)"
      fill={fill}
    />
    <path
      d="M3.168,1.248a1,1,0,0,1,1.664,0l2.131,3.2A1,1,0,0,1,6.131,6H1.869a1,1,0,0,1-.832-1.555Z"
      transform="translate(13 16) rotate(180)"
      fill={colors.basic[400]}
    />
  </svg>
);
export { SortUpIcon };
