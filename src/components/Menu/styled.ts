import styled from "styled-components";

export const Container = styled.div`
  /* Portalの部分はいずれ抽象化された<Modal/>になるためdepth.modalを使用する */
  z-index: ${({ theme }) => theme.depth.modal};
`;
