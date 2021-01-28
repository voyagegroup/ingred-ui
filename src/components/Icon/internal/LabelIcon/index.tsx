import * as React from "react";
import { IconProps } from "../../Icon";

const LabelIcon: React.FC<IconProps> = ({ fill, type }) => {
  switch (type) {
    case "line":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M0,0H24V24H0Z" fill="none" />
          <path
            fill={fill}
            d="M10.9,2.1l9.9,1.415,1.414,9.9-9.192,9.192a1,1,0,0,1-1.414,0l-9.9-9.9a1,1,0,0,1,0-1.414Zm.707,2.122L3.828,12l8.486,8.485,7.778-7.778-1.06-7.425-7.425-1.06Zm2.12,6.364a2,2,0,1,1,2.829,0A2,2,0,0,1,13.727,10.586Z"
          />
        </svg>
      );
    case "fill":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M0,0H24V24H0Z" fill="none" />
          <path
            fill={fill}
            d="M10.9,2.1l9.9,1.415,1.414,9.9-9.192,9.192a1,1,0,0,1-1.414,0l-9.9-9.9a1,1,0,0,1,0-1.414Zm2.828,8.486a2,2,0,1,0,0-2.828,2,2,0,0,0,0,2.828Z"
          />
        </svg>
      );
  }
};

export { LabelIcon };
