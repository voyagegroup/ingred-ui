import * as React from "react";
import { IconProps } from "../../Icon";

const CameraMovieIcon: React.FunctionComponent<IconProps> = ({
  fill,
  type,
}) => {
  switch (type) {
    case "fill":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0,0H24V24H0Z" />
          <path
            fill={fill}
            d="M13,6V4H5V2H15V6h1a1,1,0,0,1,1,1V9.2l5.213-3.65A.5.5,0,0,1,23,5.96V18.04a.5.5,0,0,1-.787.41L17,14.8V19a1,1,0,0,1-1,1H2a1,1,0,0,1-1-1V7A1,1,0,0,1,2,6ZM5,10v2H7V10Z"
          />
        </svg>
      );
    case "line":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0,0H24V24H0Z" />
          <path
            fill={fill}
            d="M13,6V4H5V2H15V6h1a1,1,0,0,1,1,1V9.2l5.213-3.65A.5.5,0,0,1,23,5.96V18.04a.5.5,0,0,1-.787.41L17,14.8V19a1,1,0,0,1-1,1H2a1,1,0,0,1-1-1V7A1,1,0,0,1,2,6Zm2,2H3V18H15Zm2,4.359,4,2.8V8.84l-4,2.8v.718ZM5,10H7v2H5Z"
          />
        </svg>
      );
  }
};

export { CameraMovieIcon };
