import * as React from "react";
import { IconProps } from "../../Icon";

const CartSecureIcon: React.FunctionComponent<IconProps> = ({ fill, type }) => {
  switch (type) {
    case "fill":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0,0H24V24H0Z" />
          <path
            fill={fill}
            d="M646.309,434.551v-1a3,3,0,0,0-6,0v1h-1v5a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1v-5Zm-2,0h-2v-1a1.028,1.028,0,0,1,1-1,1,1,0,0,1,1,1Zm-15.023-11.985h-2v-2h3a1,1,0,0,1,1,1v6h13.938l.5-2H633.286v-2h13.72a1,1,0,0,1,.97,1.243l-1.274,5.1a4.977,4.977,0,0,0-8.292,2.647h-1.1v3.015h-7.023a1,1,0,0,1-1-1Zm4,17a2,2,0,1,1-2-2A2,2,0,0,1,633.286,439.566Z"
            transform="translate(-625.286 -418.566)"
          />
        </svg>
      );
    case "line":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0,0H24V24H0Z" />
          <path
            fill={fill}
            d="M-4631-505a2,2,0,0,1-2-2,2,2,0,0,1,2-2,2,2,0,0,1,2,2A2,2,0,0,1-4631-505Zm6-6h-7a1,1,0,0,1-1-1v-12h-2v-2h3a1,1,0,0,1,1,1v12h6v2Zm9.75-7h-2.063l.75-3H-4629v-2h13.72a1.006,1.006,0,0,1,.788.385,1,1,0,0,1,.183.858l-.939,3.757Z"
            transform="translate(4637 528)"
          />
          <path
            fill={fill}
            d="M18,12a3,3,0,0,1,3,3v1h1v5a1,1,0,0,1-1,1H15a1,1,0,0,1-1-1V16h1V15A3,3,0,0,1,18,12Zm2,6H16v2h4Zm-2-4a1.031,1.031,0,0,0-1,1v1h2V15A1,1,0,0,0,18,14Z"
          />
        </svg>
      );
  }
};

export { CartSecureIcon };
