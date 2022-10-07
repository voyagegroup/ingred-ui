import styled from "styled-components";
import { getShadow } from "../../utils/getShadow";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.background.default};
  box-shadow: ${({ theme }) =>
    getShadow(
      5,
      theme.palette.action.shadowOpacity,
      theme.palette.action.shadowBase,
    )};
  border-radius: ${({ theme }) => theme.radius}px;
`;
