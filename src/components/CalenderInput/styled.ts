import styled from "styled-components";

export const Container = styled.div`
  display: "flex";
  width: 140px;
  padding: 8px 8px;

  font-size: 14px;
  background-color: ${({ theme }) => theme.palette.background.default};
  border: 1px solid ${({ theme }) => theme.palette.divider};
  border-radius: ${({ theme }) => theme.radius}px;
  border-color: ${({ theme }) => theme.palette.divider};
`;

export const Input = styled.input<{ letterCount: number }>`
  text-align: right;
  border: none;
  width: ${({ letterCount }) => 8 * letterCount}px;
  padding: 2px 0px;
  &:focus {
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.white};
    outline: none;
  }
`;
