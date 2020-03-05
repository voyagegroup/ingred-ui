import * as React from "react";
import { IconProps } from "../../Icon";

const ForbidIcon: React.FunctionComponent<IconProps> = ({ fill }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
      <path d="M0,0H18V18H0Z" fill="none" />
      <path
        fill={fill}
        d="M6523,4625a7,7,0,1,1,7,7A7.008,7.008,0,0,1,6523,4625Zm7,5.6a5.6,5.6,0,0,0,4.422-9.033l-7.854,7.854A5.573,5.573,0,0,0,6530,4630.6Zm-5.6-5.6a5.572,5.572,0,0,0,1.178,3.433l7.854-7.855A5.6,5.6,0,0,0,6524.4,4625Z"
        transform="translate(-6521.011 -4616.011)"
      />
    </svg>
  );
};

export { ForbidIcon };
