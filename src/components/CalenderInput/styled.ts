import styled from "styled-components";

export const Container = styled.div`
  display: "flex";
  width: 140px;
  padding: 10px 8px;
  border: 0;
  font-size: 14px;
  background-color: ${({ theme }) => theme.palette.background.default};
  border: 1px solid ${({ theme }) => theme.palette.divider};
  border-radius: ${({ theme }) => theme.radius}px;
  border-color: ${({ theme }) => theme.palette.divider};
`;

export const Input = styled.input<{ letterCount: number }>`
  border: none;
  width: ${({ letterCount }) => 8 * letterCount}px;
`;
