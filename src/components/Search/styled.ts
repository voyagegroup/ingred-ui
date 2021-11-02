import styled from "styled-components";

export const Container = styled.div``;

export const ModalStyle = styled.div`
  width: 80vw;
  background: white;
`;

// width: 50vw とか？
export const FadeContainer = styled.div`
  position: absolute;
  padding: 20px;
  top: 50%;
  left: 50%;
  height: 70vh;
  width: 70vw;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 10px;
`;

export const ScrollContainer = styled.div`
  padding: 8px 0;
  height: 75%;
  max-height: 75%;
  min-height: 75%;
`;

export const PagerContainer = styled.div`
  padding-top: 12px;
  padding-bottom: 12px;
  display: flex;
  justify-content: center;
`;

export const TextContainer = styled.p`
  margin: 12px 0;
  padding: 8px;
  font-size: 1rem;
  border-radius: 10px;
  &:hover {
    background-color: ${({ theme }) => `${theme.palette.gray.light}`};
    transition: 0.5s;
  }
`;

export const UnderLineContainer = styled.div`
  height: 0.1px;
  background-color: ${({ theme }) => `${theme.palette.gray.light}`};
`;
