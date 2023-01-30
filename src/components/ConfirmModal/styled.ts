import styled, { keyframes, css } from "styled-components";
import { addScrollbarProperties } from "../../utils/scrollbar";
import Card from "../Card";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
export const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* TODO: color */
  background-color: #001326cb;
  animation: ${fadeIn} 0.4s;
`;

const slideIn = keyframes`
  0% {
    transform: translate(-50%, calc(-50% + 8px));
  }
  100% {
    transform: translate(-50%, -50%);
  }
`;

export const ModalContainer = styled(Card)`
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 400px;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
  border-radius: ${({ theme }) => `${theme.radius}px`};
  background-color: ${({ theme }) => theme.palette.background.default};
  animation: ${slideIn} 0.4s;
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing * 2}px
    ${({ theme }) => theme.spacing * 3}px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray.light};
`;

export const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 70%;
`;

type ScrollContainerProps = {
  overflowYScroll: boolean;
  showFooter: boolean;
};

export const ScrollContainer = styled.div<ScrollContainerProps>`
  height: auto;
  margin-bottom: ${({ showFooter, theme }) =>
    /* MEMO: Height of ModalFooter(padding-top + padding-bottom + Button size="medium") */
    !showFooter ? 0 : theme.spacing * 2 * 2 + 42}px;
  ${({ overflowYScroll }) =>
    overflowYScroll
      ? addScrollbarProperties({
          maxHeight: "calc(80vh - 61px)",
        })
      : css`
          overflow-y: visible;
          max-height: "calc(80vh - 61px)";
        `}
`;

export const ModalFooter = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding: ${({ theme }) => theme.spacing * 2}px
    ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.gray.highlight};
  border-radius: ${({ theme }) => `0 0 ${theme.radius}px ${theme.radius}px`};
  margin-bottom: auto;
`;

export const IconContainer = styled.div`
  cursor: pointer;
`;

export const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
