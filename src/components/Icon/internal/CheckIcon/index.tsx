import * as React from "react";
import { IconProps } from "../../Icon";

const CheckIcon: React.FunctionComponent<IconProps> = ({ fill }) => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill={fill}
      d="M7.58548 13.5995C7.96729 13.9813 8.58632 13.9813 8.96813 13.5995L11.032 11.5356C11.0341 11.5336 11.0361 11.5315 11.0381 11.5295L18.7206 3.84699C19.1024 3.46519 19.1024 2.84615 18.7206 2.46434L16.6567 0.400431C16.2749 0.0186228 15.6558 0.0186225 15.274 0.400431L8.27678 7.39768L4.7262 3.84711C4.3444 3.4653 3.72536 3.46531 3.34355 3.84711L1.27964 5.91103C0.897834 6.29283 0.897834 6.91187 1.27964 7.29367L7.58548 13.5995Z"
      transform="translate(0 3.1125)"
    />
  </svg>
);

export { CheckIcon };
