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

const FullSizeSlideIn = keyframes`
  0% {
    transform: translate(-50%, 0%);
  }
  100% {
    transform: translate(-50%, -48%);
  }
`;
export const ModalContainer = styled(Card)<{ fullSize: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 400px;
  width: ${({ fullSize }) => (fullSize ? "100vw" : "auto")};
  height: ${({ fullSize }) => (fullSize ? "100vh" : "auto")};
  transform: ${({ fullSize }) =>
    fullSize ? `translate(-50%, -48%);` : `translate(-50%, -50%);`};
  border-radius: ${({ fullSize, theme }) =>
    fullSize ? `8px 8px 0 0` : `${theme.radius}px`};
  background-color: ${({ theme }) => theme.palette.background.default};
  animation: ${({ fullSize }) => (fullSize ? FullSizeSlideIn : slideIn)} 0.4s;
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
  fullSize: boolean;
  showFooter: boolean;
};

export const ScrollContainer = styled.div<ScrollContainerProps>`
  height: ${({ fullSize, showFooter, theme }) =>
    fullSize
      ? `calc(100vh - ${theme.spacing * 2 * 2 + 42 + (showFooter ? 61 : 0)}px)`
      : "auto"};
  margin-bottom: ${({ fullSize, showFooter, theme }) =>
    /* MEMO: Height of ModalFooter(padding-top + padding-bottom + Button size="medium") */
    fullSize || !showFooter ? 0 : theme.spacing * 2 * 2 + 42}px;
  ${({ overflowYScroll, fullSize }) =>
    overflowYScroll
      ? addScrollbarProperties({
          maxHeight: fullSize ? "auto" : "calc(80vh - 61px)",
        })
      : css`
          overflow-y: visible;
          max-height: ${fullSize ? "auto" : "calc(80vh - 61px)"};
        `}
`;

export const ModalFooter = styled.div<{ fullSize: boolean }>`
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
  border-radius: ${({ fullSize, theme }) =>
    fullSize ? 0 : `0 0 ${theme.radius}px ${theme.radius}px`};
  margin-bottom: ${({ fullSize }) => (fullSize ? "1.8vh" : "auto")};
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

export const TipContainer = styled.div`
  padding-left: ${({ theme }) => theme.spacing * 0.5}px;
`;

export const TipContentContainer = styled.div`
  min-width: ${({ theme }) =>
    360 - (theme.spacing * 2 * 2 + theme.spacing * 2 + 18)}px;
  max-width: ${({ theme }) =>
    512 - (theme.spacing * 2 * 2 + theme.spacing * 2 + 18)}px;
`;
