import styled from "styled-components";
import { Radius } from "../../styles";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.background.default};
  box-shadow: 0px 0px 16px ${({ theme }) => theme.palette.gray.main}65;
  border-radius: ${Radius.SMALL};
`;
