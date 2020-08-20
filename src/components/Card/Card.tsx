import styled from "styled-components";

import { flexbox, FlexProps } from "../Flex/Flex";
import { spacer, SpacerProps } from "../../utils/spacerUtils";

export type CardProps = SpacerProps &
  FlexProps & {
    width?: string;
    maxWidth?: string;
    minWidth?: string;
  };

const Card = styled.div<CardProps>`
  border-radius: ${({ theme }) => theme.radius}px;
  background-color: ${({ theme }) => theme.palette.background.default};
  width: ${({ width }) => width || "auto"};
  min-width: ${({ minWidth }) => minWidth || "auto"};
  max-width: ${({ maxWidth }) => maxWidth || "auto"};
  ${spacer}
  ${flexbox}
`;

export default Card;
