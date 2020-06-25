import styled from "styled-components";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.background.default};
  th {
    white-space: nowrap;
  }
`;

// ItemEmptyの表示はホバー時に背景色が変わってほしくないので別でスタイリング
export const ItemEmptyRowContainer = styled.tr``;
