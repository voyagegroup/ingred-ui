import styled, { keyframes } from "styled-components";
import { Size, Radius } from "../../styles";
import Card from "../Card";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${({ theme }) => theme.depth.modal};
`;

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
export const ModalContainer = styled(Card)<{ fullSize: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 400px; /* 削除モーダルなどコンテンツが少ない場合の最小単位を入れておく(400は仮) */
  width: ${({ fullSize }) => (fullSize ? "90vw" : "auto")};
  height: ${({ fullSize }) => (fullSize ? "90vh" : "auto")};
  transform: translate(-50%, -50%);
  border-radius: ${Radius.MEDIUM};
  background-color: ${({ theme }) => theme.palette.background.default};
  animation: ${slideIn} 0.4s;
`;

export const ScrollContainer = styled.div<{ overflowYScroll: boolean }>`
  max-height: 80vh;
  padding-bottom: ${({ theme }) =>
    theme.spacing * 2 * 2 +
    40}px; /* ModalFooterの高さ(padding上下 + Button size="medium"の高さ) */
  overflow-y: ${({ overflowYScroll }) =>
    overflowYScroll ? "scroll" : "visible"};
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing * 3}px;
  border-bottom: ${Size.Border.Small} solid
    ${({ theme }) => theme.palette.gray.light};
`;

export const TitleContainer = styled.div`
  max-width: 70%;
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
    ${({ theme }) => theme.spacing * 4}px;
  background-color: ${({ theme }) => theme.palette.gray.light};
  border-radius: 0 0 ${Radius.MEDIUM} ${Radius.MEDIUM};
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
