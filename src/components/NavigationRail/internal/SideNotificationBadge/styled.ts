import styled from "styled-components";

export const Container = styled.span<{ invisible: boolean }>`
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
  transform: ${({ invisible }) => (invisible ? "scale(0)" : "scale(1)")};
  transition: transform 0.3s;
`;
