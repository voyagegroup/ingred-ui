import styled from "styled-components";

export const ThreeDotsWrapper = styled.div`
  width: 28px;
  height: 28px;
  margin: 0 ${({ theme }) => theme.spacing * 0.5}px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  letter-spacing: 1.5px;
  font-size: 12px;
  font-weight: bold;
`;
