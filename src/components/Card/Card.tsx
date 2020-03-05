import { Radius } from "../../styles";
import { spacer, SpacerProps } from "../Spacer/Spacer";
import { flexbox, FlexboxProps } from "../Flex/Flex";
import styled from "styled-components";

type Props = {
  width?: string;
  maxWidth?: string;
  minWidth?: string;
};
const Card = styled.div<SpacerProps & FlexboxProps & Props>`
  border-radius: ${Radius.MEDIUM};
  background-color: ${({ theme }) => theme.palette.background.default};
  width: ${({ width }) => width || "auto"};
  min-width: ${({ minWidth }) => minWidth || "auto"};
  max-width: ${({ maxWidth }) => maxWidth || "auto"};
  ${spacer}
  ${flexbox}
`;

export default Card;
