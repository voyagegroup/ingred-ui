import styled from "styled-components";

export const Container = styled.div``;

export const ModalStyle = styled.div`
  width: 80vw;
  background: white;
`;

// width: 50vw とか？
export const FadeContainer = styled.div`
  position: absolute;
  padding: 20px 20px 0;
  top: 50%;
  left: 50%;
  height: 70vh;
  width: 70vw;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 10px;
`;

export const FieldContainer = styled.div`
  position: relative;
  height: 100%;
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
  background-color: white;
  justify-content: center;
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
`;
