import styled from "styled-components";
import { SpacerProps, spacer } from "../../utils/spacer";
import { DivElementProps } from "../../utils/reactElementTypes";

const Spacer = styled.div<SpacerProps & DivElementProps>`
  ${spacer};
`;

export default Spacer;
