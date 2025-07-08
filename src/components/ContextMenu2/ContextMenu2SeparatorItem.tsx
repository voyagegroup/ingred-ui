import React from "react";
import styled from "styled-components";

// 特に機能を持たない、見た目付きの ContextMenu2 用の区切り線

export const ContextMenu2SeparatorItem = styled(({ className }) => {
  return <hr className={className} />;
})`
  margin: 8px 0;
  color: ${({ theme }) => theme.palette.gray.light};
  border-top: 1px solid currentColor;
  border-bottom: 0;
  border-inline: 0;
`;
