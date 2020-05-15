import styled from "styled-components";
import Button from "../Button";
import { Popper } from "../Popper";

export const ButtonContainer = styled.div`
  display: inline-flex;
`;

export const MainButton = styled(Button)`
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
`;

export const SplitToggle = styled(Button)`
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-left: 1px solid #054baf;
  padding: 0 ${({ theme, size }) => size === "small" ? 0 : theme.spacing}px;
  min-width: auto;
`;

export const SingleButton = styled(Button)`
  padding-right: ${({ theme, size }) => size === "small" ? theme.spacing / 2 : theme.spacing}px;
  min-width: auto;
`;

export const MenuPopper = styled(Popper)`
  z-index: ${({ theme }) => theme.depth.dropdownMenu};
`;
