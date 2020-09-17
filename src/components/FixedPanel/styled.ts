import styled from "styled-components";

type ContainerProps = {
  isOpen: boolean;
  height: number;
  offset: number;
  placement: "top" | "bottom";
};

export const Container = styled.div<ContainerProps>`
  position: fixed;
  ${({ isOpen, height, offset, placement }) =>
    `${placement}: ${
      isOpen
        ? `${offset}px`
        : `${height !== 0 ? `calc(${-height}px - 10px)` : "-100vh"}`
    }`};
  width: 100%;
  background-color: ${({ theme }) => theme.palette.background.default};
  border-top: 1px solid ${({ theme }) => theme.palette.gray.light};
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray.light};
  transition: all 0.3s;
  z-index: 1;
`;
