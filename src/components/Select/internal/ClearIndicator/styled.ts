import styled from "styled-components";
import { Radius } from "../../../../styles";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.gray.light};
  border-radius: ${Radius.MEDIUM};
  &:hover {
    background-color: ${({ theme }) => theme.palette.gray.main};
  }
  & > div {
    /* css-tlfecz-indicatorContainer */
    padding: 4px;
  }
`;
