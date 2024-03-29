import * as React from "react";
import { IconProps } from "../../Icon";

const ImageCheckIcon: React.FunctionComponent<IconProps> = ({ type, fill }) => {
  switch (type) {
    case "fill":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
          <path
            d="M23 17.0502L21.5826 15.636L18.039 19.1715L15.9128 17.0502L14.4954 18.4644L18.039 22L23 17.0502Z"
            fill={fill}
          />
          <path
            d="M3 5H19V14H21V3.9934C21 3.44495 20.556 3 20.0082 3H1.9918C1.45531 3 1 3.44476 1 3.9934V20.0066C1 20.5551 1.44405 21 1.9918 21H13V14H17.9916L13.7065 9.70641C13.3159 9.31591 12.6828 9.31595 12.2923 9.70649L3 19V5Z"
            fill={fill}
          />
          <path
            d="M5 9C5 10.1046 5.89543 11 7 11C8.10457 11 9 10.1046 9 9C9 7.89543 8.10457 7 7 7C5.89543 7 5 7.89543 5 9Z"
            fill={fill}
          />
        </svg>
      );
    case "line":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
          <path
            d="M1 20.0066C1 20.5551 1.44507 21 1.99407 21H13.0192V19H5.83949L13.0275 11.8284L15.1989 13.9948H18.0337L13.0275 9L3.00458 19V5H19.0412V13.9948H21.0458V3.9934C21.0458 3.44495 20.6008 3 20.0518 3H1.99407C1.45635 3 1 3.44476 1 3.9934V20.0066Z"
            fill={fill}
          />
          <path
            d="M5.00917 9C5.00917 10.1046 5.90665 11 7.01375 11C8.12085 11 9.01833 10.1046 9.01833 9C9.01833 7.89543 8.12085 7 7.01375 7C5.90665 7 5.00917 7.89543 5.00917 9Z"
            fill={fill}
          />
          <path
            d="M23 17.0502L21.5826 15.636L18.039 19.1716L15.9128 17.0502L14.4953 18.4645L18.039 22L23 17.0502Z"
            fill={fill}
          />
        </svg>
      );
  }
};

export { ImageCheckIcon };
