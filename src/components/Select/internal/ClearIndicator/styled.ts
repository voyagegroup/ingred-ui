import styled from "styled-components";
import { Radius } from "../../../../styles";
import { colors } from "../../../../styles/color";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.gray.light};
  border-radius: ${Radius.SMALL};
  &:hover {
    background-color: ${colors.basic[300]};
  }
  & > div {
    /* css-tlfecz-indicatorContainer */
    padding: 4px;
  }
`;
