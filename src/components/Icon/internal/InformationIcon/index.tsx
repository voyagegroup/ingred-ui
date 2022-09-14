import * as React from "react";
import { IconProps } from "../../Icon";

const InformationIcon: React.FunctionComponent<IconProps> = ({
  type,
  fill,
}) => {
  switch (type) {
    case "fill":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <rect fill="none" />
          <path
            d="M16723,12664a10,10,0,1,1,10-10A9.937,9.937,0,0,1,16723,12664Zm-1-11h0v5h2v-5Zm0-4h0v2h2v-2Z"
            transform="translate(-16711 -12642)"
            fill={fill}
          />
        </svg>
      );
    case "line":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <rect fill="none" />
          <g
            transform="translate(2 2)"
            fill="none"
            stroke={fill}
            strokeWidth="2"
          >
            <circle cx="10" cy="10" r="10" stroke="none" />
            <circle cx="10" cy="10" r="9" fill="none" />
          </g>
          <path
            d="M16713,12653v-2h2v2Zm0-4v-5h2v5Z"
            transform="translate(16726 12660) rotate(180)"
            fill={fill}
          />
        </svg>
      );
  }
};

export { InformationIcon };
