import styled from "styled-components";
import Typography from "../../Typography";

export const Container = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: ${({ theme }) =>
    `${theme.spacing * 1.5}px ${theme.spacing * 2}px ${theme.spacing * 1.5}px ${
      theme.spacing * 7.75
    }px`};

  &:hover {
    background-color: ${({ theme }) => theme.palette.gray.light};
  }

  & > * {
    flex-shrink: 0;
  }
`;

export const TextContainer = styled.div`
  flex-shrink: 1;
  flex-grow: 1;
  display: flex;
  align-items: center;
  min-width: 0;
`;

export const TextWrapper = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
