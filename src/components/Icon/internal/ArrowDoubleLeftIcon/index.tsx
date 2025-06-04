import * as React from "react";
import { IconProps } from "../../Icon";

const ArrowDoubleLeftIcon: React.FunctionComponent<IconProps> = ({ fill }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <path
        d="M5.00005 11.7929L11.2072 5.58581L12.6214 7.00002L7.82845 11.7929L12.6213 16.5858L11.2071 18L5.00005 11.7929ZM10.6499 11.7929L16.857 5.58582L18.2712 7.00003L13.4784 11.7929L18.2712 16.5858L16.857 18L10.6499 11.7929Z"
        fill={fill}
      />
    </svg>
  );
};

export { ArrowDoubleLeftIcon };
