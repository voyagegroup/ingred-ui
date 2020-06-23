import * as React from "react";
import { IconProps } from "../../Icon";

const FilterIcon: React.FunctionComponent<IconProps> = ({ fill, type }) => {
  switch (type) {
    case "fill":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0,0H24V24H0Z" />
          <path fill={fill} d="M10,14,4,5V3H20V5l-6,9v6l-4,2Z" />
        </svg>
      );
    case "line":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" d="M0,0H24V24H0Z" />
          <path
            fill={fill}
            d="M12.333,13.035v5.474L9,20.333v-7.3L4,4.825V3H17.333V4.825ZM6,4.825l4.663,7.658L15.33,4.825Z"
            transform="translate(1.333 1)"
          />
        </svg>
      );
  }
};

export { FilterIcon };
