import styled from "styled-components";

export const Container = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing * 2}px 0;
  padding-left: ${({ theme }) => theme.spacing * 7.75}px;

  &:hover {
    background-color: ${({ theme }) => theme.palette.gray.light};
  }

  & > * {
    flex-shrink: 0;
  }
`;

export const TextContainer = styled.div<{
  isActive: boolean;
  hasNotification: boolean;
}>`
  flex-shrink: 1;
  flex-grow: 1;
  display: flex;
  align-items: center;
  min-width: 0;
  margin-right: ${({ theme, hasNotification }) =>
    hasNotification ? 0 : theme.spacing * 2}px;
  color: ${({ theme, isActive }) =>
    isActive ? theme.palette.text.primary : theme.palette.gray.dark};
  font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")};
`;

export const TextWrapper = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
