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

const FullSizeSlideIn = keyframes`
  0% {
    transform: translate(-50%, 0%);
  }
  100% {
    transform: translate(-50%, -48%);
  }
`;

export const ModalContainer = styled(Card)`
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 400px;
  width: 100vw;
  height: 100vh;
  transform: translate(-50%, -48%);
  border-radius: 8px 8px 0 0;
  background-color: ${({ theme }) => theme.palette.background.default};
  animation: ${FullSizeSlideIn} 0.4s;
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
  margin-bottom: ${({ showFooter, theme }) =>
    /* MEMO: Height of ModalFooter(padding-top + padding-bottom + Button size="medium") */
    !showFooter ? 0 : theme.spacing * 2 * 2 + 42}px;
  ${({ overflowYScroll, showFooter, theme }) =>
    overflowYScroll
      ? addScrollbarProperties({
          maxHeight: "auto",
          height: `calc(100vh - ${
            theme.spacing * 2 * 2 + 42 + (showFooter ? 61 : 0)
          }px)`,
        })
      : css`
          overflow-y: visible;
          max-height: auto;
          height: calc(
            100vh - ${theme.spacing * 2 * 2 + 42 + (showFooter ? 61 : 0)}px
          );
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
  border-radius: 0;
  margin-bottom: 1.8vh;
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
