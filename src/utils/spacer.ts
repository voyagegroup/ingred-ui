import { ThemedStyledProps } from "styled-components";
import { Theme } from "../themes";

export type SpacerProps = {
  /** margin */
  m?: number;
  /** margin-top */
  mt?: number;
  /** margin-right */
  mr?: number;
  /** margin-bottom */
  mb?: number;
  /** margin-left */
  ml?: number;
  /** margin-right&margin-left */
  mx?: number;
  /** margin-top&margin-bottom */
  my?: number;

  /** padding */
  p?: number;
  /** padding-top */
  pt?: number;
  /** padding-right */
  pr?: number;
  /** padding-bottom */
  pb?: number;
  /** padding-left */
  pl?: number;
  /** padding-right&padding-left */
  px?: number;
  /** padding-top&padding-bottom */
  py?: number;
};

export const getMargin = (payload: ThemedStyledProps<SpacerProps, Theme>) => {
  const space = payload.theme.spacing;
  const mt = payload.mt || payload.my || payload.m || 0;
  const mr = payload.mr || payload.mx || payload.m || 0;
  const mb = payload.mb || payload.my || payload.m || 0;
  const ml = payload.ml || payload.mx || payload.m || 0;
  return `margin: ${space * mt}px ${space * mr}px ${space * mb}px ${
    space * ml
  }px`;
};

export const getPadding = (payload: ThemedStyledProps<SpacerProps, Theme>) => {
  const space = payload.theme.spacing;
  const pt = payload.pt || payload.py || payload.p || 0;
  const pr = payload.pr || payload.px || payload.p || 0;
  const pb = payload.pb || payload.py || payload.p || 0;
  const pl = payload.pl || payload.px || payload.p || 0;
  return `padding: ${space * pt}px ${space * pr}px ${space * pb}px ${
    space * pl
  }px`;
};

export const spacer = (payload: ThemedStyledProps<SpacerProps, Theme>) => {
  return `
    ${getMargin(payload)};
    ${getPadding(payload)};
  `;
};
