import styled from "styled-components";

export const DropdownIndicator = styled.div<{ menuIsOpen: boolean }>`
  transition: transform 150ms;
  transform: ${({ menuIsOpen }) => (menuIsOpen ? "rotate(180deg)" : "")};
`;
