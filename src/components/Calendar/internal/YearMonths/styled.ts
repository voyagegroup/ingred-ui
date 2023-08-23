import styled from "styled-components";
import Typography from "../../../Typography/Typography";
import Flex from "../../../Flex/Flex";

export const YearContainer = styled(Typography)`
  padding-bottom: ${({ theme }) => theme.spacing}px;
`;

export const MonthContainer = styled(Flex)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: ${({ theme }) => theme.spacing * 4}px;
  grid-gap: ${({ theme }) => theme.spacing * 1.5}px;
`;

export const Month = styled.button`
  cursor: pointer;
  border: none;
  color: ${({ theme }) => theme.palette.black};
  background: white;
`;
