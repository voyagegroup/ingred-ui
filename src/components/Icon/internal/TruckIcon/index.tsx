import * as React from "react";
import { IconProps } from "../../Icon";

const TruckIcon: React.FunctionComponent<IconProps> = ({ fill, type }) => {
  switch (type) {
    case "fill":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0,0H24V24H0Z" />
          <path
            fill={fill}
            d="M17,8h3l3,4.056V18H20.965a3.5,3.5,0,0,1-6.93,0H8.965a3.5,3.5,0,0,1-6.93,0H1V6A1,1,0,0,1,2,5H16a1,1,0,0,1,1,1Zm0,2v3h4v-.285L18.992,10Z"
          />
        </svg>
      );
    case "line":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0,0H24V24H0Z" />
          <path
            fill={fill}
            d="M8.965,18a3.5,3.5,0,0,1-6.93,0H1V6A1,1,0,0,1,2,5H16a1,1,0,0,1,1,1V8h3l3,4.056V18H20.965a3.5,3.5,0,0,1-6.93,0ZM15,7H3v8.05A3.5,3.5,0,0,1,8.663,16h5.674A3.527,3.527,0,0,1,15,15.05Zm2,6h4v-.285L18.992,10H17Zm.5,6A1.5,1.5,0,1,0,16,17.5,1.5,1.5,0,0,0,17.5,19ZM7,17.5A1.5,1.5,0,1,0,5.5,19,1.5,1.5,0,0,0,7,17.5Z"
          />
        </svg>
      );
  }
};

export { TruckIcon };
