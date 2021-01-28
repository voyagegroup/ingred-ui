import { Property } from "csstype";
import styled from "styled-components";

type TLengthStyledSystem = string | 0 | number;
export type FlexProps = {
  display?: "flex" | "inline-flex";
  height?: Property.Height<TLengthStyledSystem>;
  alignItems?: Property.AlignItems;
  alignContent?: Property.AlignContent;
  justifyItems?: Property.JustifyItems;
  justifyContent?: Property.JustifyContent;
  flexWrap?: Property.FlexWrap;
  flexDirection?: Property.FlexDirection;
  flex?: Property.Flex<TLengthStyledSystem>;
  flexGrow?: Property.FlexGrow;
  flexShrink?: Property.FlexShrink;
  flexBasis?: Property.FlexBasis<TLengthStyledSystem>;
  justifySelf?: Property.JustifySelf;
  alignSelf?: Property.AlignSelf;
};

const camelToKebab = (string: string) => {
  return string.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
};

export const flexbox = (payload: FlexProps) => {
  let property = "";
  (Object.keys(payload) as (keyof FlexProps)[]).map((key) => {
    if (payload[key] != undefined) {
      property += `${camelToKebab(key)}: ${payload[key]};`;
    }
  });
  return property;
};

const Flex = styled.div<FlexProps>`
  ${flexbox};
`;

export default Flex;
