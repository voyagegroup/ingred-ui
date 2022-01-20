import * as React from "react";
import { IconProps } from "../../Icon";

const FluctIcon: React.FunctionComponent<IconProps> = ({ fill }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <rect fill="none" />
    <g transform="translate(35.338 35.338)">
      <path
        d="M10,0A10,10,0,1,0,20,10,10,10,0,0,0,10,0ZM9.131,18.377a8.362,8.362,0,0,1-3.6-1.242l3.531-6.115h4.314ZM14.29,9.443H1.6a8.355,8.355,0,0,1,.722-2.893H15.96ZM10,1.578a8.414,8.414,0,0,1,6.752,3.393H3.249A8.413,8.413,0,0,1,10,1.578ZM1.642,11.021h5.6L4.271,16.166A8.406,8.406,0,0,1,1.642,11.021Zm9.318,7.345L17.724,6.649A8.417,8.417,0,0,1,10.96,18.366Z"
        transform="translate(-33.338 -33.338)"
        fill={fill}
      />
    </g>
  </svg>
);

export { FluctIcon };
