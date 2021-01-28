import styled from "styled-components";
import { Property } from "csstype";

type Props = {
  filesDraggedOver: boolean;
  width?: Property.Width;
};

export const Container = styled.div<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => (width ? width : "100%")};
  padding: 40px;
  border: 2px
    ${({ theme, filesDraggedOver }) =>
      filesDraggedOver
        ? `solid ${theme.palette.primary.main}`
        : `dashed ${theme.palette.divider}`};
  background-color: ${({ theme, filesDraggedOver }) =>
    filesDraggedOver
      ? theme.palette.background.hint
      : theme.palette.gray.highlight};
  transition: all 0.3s ease-in-out;
  input {
    display: none;
  }
  &:hover {
    cursor: pointer;
    border: 2px solid ${({ theme }) => theme.palette.primary.main};
    background-color: ${({ theme }) => theme.palette.background.hint};
  }
`;

export const TextContainer = styled.div``;
