import * as React from "react";
import { IconProps } from "../../Icon";

const CopyIcon: React.FunctionComponent<IconProps> = ({ fill, type }) => {
  switch (type) {
    case "line":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
          <path d="M0 0h18v18H0z" fill="none" />
          <path
            fill={fill}
            d="M5.667,4.8V2.7A.684.684,0,0,1,6.333,2h8A.684.684,0,0,1,15,2.7v9.8a.684.684,0,0,1-.667.7h-2v2.1a.686.686,0,0,1-.671.7H3.671a.651.651,0,0,1-.474-.2.719.719,0,0,1-.2-.5L3,5.5a.686.686,0,0,1,.671-.7ZM4.335,6.2l0,8.4H11V6.2ZM7,4.8h5.333v7h1.333V3.4H7Z"
          />
        </svg>
      );
    case "fill":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0,0H24V24H0Z" />
          <path
            fill={fill}
            d="M7,6V3A1,1,0,0,1,8,2H20a1,1,0,0,1,1,1V17a1,1,0,0,1-1,1H17v3a1,1,0,0,1-1.007,1H4.007A1,1,0,0,1,3,21L3,7A1,1,0,0,1,4.01,6ZM9,6h8V16h2V4H9Z"
          />
        </svg>
      );
  }
};

export { CopyIcon };
