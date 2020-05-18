import * as React from "react";
import { IconProps } from "../../Icon";

const BarChartOutlineIcon: React.FunctionComponent<IconProps> = ({ fill }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        fill={fill}
        d="M3,3H21a1,1,0,0,1,1,1V20a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V4A1,1,0,0,1,3,3ZM4,5V19H20V5Zm3,8H9v4H7Zm4-6h2V17H11Zm4,3h2v7H15Z"
      />
    </svg>
  )
};

export { BarChartOutlineIcon };
