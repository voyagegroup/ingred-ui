import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
`;

export const SelectedHeader = styled.div`
  background-color: ${({ theme }) => theme.palette.gray.highlight};
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
  border-radius: ${({ theme }) => `0 ${theme.spacing}px 0 0`};
  padding: ${({ theme }) => `${theme.spacing * 1.5}px ${theme.spacing * 2}px`};
  position: sticky;
  top: 0;
`;

export const SelectedList = styled.ul``;

export const SelectedItem = styled.li`
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
  padding: ${({ theme }) => theme.spacing * 2}px;
  list-style: none;
  display: flex;
  justify-content: space-between;
`;

export const RemoveButton = styled.button`
  background-color: ${({ theme }) => theme.palette.gray.light};
  border: none;
  border-radius: ${({ theme }) => theme.spacing * 0.5}px;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing * 0.5}px;
`;

export const Action = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing * 2}px;
`;
