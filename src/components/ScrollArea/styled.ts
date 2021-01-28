import styled from "styled-components";
import { Property } from "csstype";
import { addScrollbarProperties } from "../../utils/scrollbar";

type ContainerProp = {
  height: Property.Height;
  maxHeight: Property.MaxHeight;
  minHeight: Property.MinHeight;
};

export const Container = styled.div<ContainerProp>`
  ${({ height, maxHeight, minHeight }) =>
    addScrollbarProperties({ height, maxHeight, minHeight })}
`;
