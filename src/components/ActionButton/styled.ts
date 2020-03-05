import styled from "styled-components";
import { Radius, Space } from "../../styles";

export const Container = styled.button`
  display: flex;
  align-items: center;
  padding: ${Space / 2}px;
  outline: none;
  border: 0;
  cursor: pointer;
  background-color: ${({ theme }) => theme.palette.background.hint};
  border-radius: ${Radius.SMALL};
`;
