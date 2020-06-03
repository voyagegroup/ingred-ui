import styled from "styled-components";
import Button from "../Button";

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
  border-left: 1px solid ${({ theme }) => theme.palette.primary.deepDark};
  padding: 0 ${({ theme, size }) => (size === "small" ? 0 : theme.spacing)}px;
  min-width: auto;
  &:disabled {
    border-left: 1px solid ${({ theme }) => theme.palette.divider};
  }
`;

export const SingleButton = styled(Button)`
  padding-right: ${({ theme, size }) =>
    size === "small" ? theme.spacing / 2 : theme.spacing}px;
  min-width: auto;
`;

export const MenuPopper = styled.div`
  /* Portalの部分はいずれ抽象化された<Modal/>になるためdepth.modalを使用する */
  z-index: ${({ theme }) => theme.depth.modal};
`;
