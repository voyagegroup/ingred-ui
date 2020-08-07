import styled from "styled-components";

import { flexbox, FlexboxProps } from "../Flex/Flex";
import { spacer, SpacerProps } from "../../utils/spacerUtils";

type Props = {
  width?: string;
  maxWidth?: string;
  minWidth?: string;
};

const Card = styled.div<SpacerProps & FlexboxProps & Props>`
  border-radius: ${({ theme }) => theme.radius}px;
  background-color: ${({ theme }) => theme.palette.background.default};
  width: ${({ width }) => width || "auto"};
  min-width: ${({ minWidth }) => minWidth || "auto"};
  max-width: ${({ maxWidth }) => maxWidth || "auto"};
  ${spacer}
  ${flexbox}
`;

export default Card;
