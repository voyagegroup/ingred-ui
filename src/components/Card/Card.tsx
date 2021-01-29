import styled from "styled-components";
import { Property } from "csstype";

import { flexbox, FlexProps } from "../Flex/Flex";
import { spacer, SpacerProps } from "../../utils/spacer";

export type CardProps = SpacerProps &
  FlexProps & {
    width?: Property.Width;
    maxWidth?: Property.MaxWidth;
    minWidth?: Property.MinWidth;
  };

const Card = styled.div<CardProps>`
  border-radius: ${({ theme }) => theme.radius}px;
  background-color: ${({ theme }) => theme.palette.background.default};
  width: ${({ width }) => width || "auto"};
  min-width: ${({ minWidth }) => minWidth || "auto"};
  max-width: ${({ maxWidth }) => maxWidth || "auto"};
  border: 1px solid ${({ theme }) => theme.palette.gray.light};
  ${spacer}
  ${flexbox}
`;

export default Card;
