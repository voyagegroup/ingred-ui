import styled from "styled-components";
import { Size } from "../../styles";
import { hexToRgba } from "../../utils/hexToRgba";

type ContainerProps = {
  isOpen: boolean;
  height: number;
  offset: number;
  placement: "top" | "bottom";
};

export const Container = styled.div<ContainerProps>`
  position: fixed;
  ${({ isOpen, height, offset, placement }) =>
    `${placement}: ${isOpen ? offset : -height - 10}px`};
  width: 100%;
  backdrop-filter: blur(2px);
  background-color: ${({ theme }) =>
    hexToRgba(theme.palette.background.default, 0.9)};
  border-top: ${Size.Border.Small} solid ${({ theme }) => theme.palette.divider};
  border-bottom: ${Size.Border.Small} solid
    ${({ theme }) => theme.palette.divider};
  transition: all 0.3s;
`;
