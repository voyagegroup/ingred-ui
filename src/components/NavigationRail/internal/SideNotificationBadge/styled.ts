import styled from "styled-components";

export const Container = styled.span`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  height: 20px;
  min-width: 20px;
  line-height: 1;
  padding: 0 6px;
  border-radius: 10rem;
  color: ${({ theme }) => theme.palette.text.white};
  background-color: ${({ theme }) => theme.palette.danger.main};
  font-size: 10.5px;
  font-weight: bold;
  transition: transform 0.3s;
`;
