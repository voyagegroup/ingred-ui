import * as CSS from "csstype";
import styled from "styled-components";

type TLengthStyledSystem = string | 0 | number;
export type FlexboxProps = {
  display?: "flex";
  height?: CSS.HeightProperty<TLengthStyledSystem>;
  alignItems?: CSS.AlignItemsProperty;
  alignContent?: CSS.AlignContentProperty;
  justifyItems?: CSS.JustifyItemsProperty;
  justifyContent?: CSS.JustifyContentProperty;
  flexWrap?: CSS.FlexWrapProperty;
  flexDirection?: CSS.FlexDirectionProperty;
  flex?: CSS.FlexProperty<TLengthStyledSystem>;
  flexGrow?: CSS.GlobalsNumber;
  flexShrink?: CSS.GlobalsNumber;
  flexBasis?: CSS.FlexBasisProperty<TLengthStyledSystem>;
  justifySelf?: CSS.JustifySelfProperty;
  alignSelf?: CSS.AlignSelfProperty;
};

const camelToKebab = (string: string) => {
  return string.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
};

export const flexbox = (payload: FlexboxProps) => {
  let property = "";
  (Object.keys(payload) as (keyof FlexboxProps)[]).map((key) => {
    if (payload[key] != undefined) {
      property += `${camelToKebab(key)}: ${payload[key]};`;
    }
  });
  return property;
};

const Flex = styled.div<FlexboxProps>`
  ${flexbox};
`;

export default Flex;
