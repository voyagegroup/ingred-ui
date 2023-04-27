import * as React from "react";
import { IconProps } from "../../Icon";

const AdBlockIcon: React.FunctionComponent<IconProps> = ({ fill }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M0,0H24V24H0Z" fill="none" />
    <path
      d="M3.783,2.826,12,1l8.217,1.826A1,1,0,0,1,21,3.8v9.987a6,6,0,0,1-2.672,4.992L12,23,5.672,18.781A6,6,0,0,1,3,13.79V3.8a1,1,0,0,1,.783-.976ZM5,4.6v9.185a4,4,0,0,0,1.781,3.328L12,20.6l5.219-3.48A4,4,0,0,0,19,13.79V4.6L12,3.05Z"
      fill={fill}
    />
    <path
      d="M8.183,7.178l2.673,6.686h-1.8l-.334-.836H5.972l-.334.836h-1.8L6.512,7.178Zm8.023,0v6.686H13.7a2.507,2.507,0,0,1,0-5.014h.835V7.178Zm-1.671,3.343H13.7a.836.836,0,0,0-.1,1.666l.1.006h.836ZM7.348,9.589,6.64,11.357H8.054Z"
      transform="translate(1.762 0.958)"
      fill={fill}
    />
  </svg>
);

export { AdBlockIcon };
