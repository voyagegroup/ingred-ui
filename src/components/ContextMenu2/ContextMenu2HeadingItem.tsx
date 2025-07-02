import React from "react";
import styled from "styled-components";

// 特に機能を持たない、見た目付きの ContextMenu2 用の「見出し」

export const ContextMenu2HeadingItem = styled(({ className, children }) => {
  return <p className={className}>{children}</p>;
})`
  border-radius: 4px;
  padding: 4px 8px;
  margin-bottom: 8px;
  font-weight: 700;
  font-size: 12px;
  color: ${({ theme }) => theme.palette.black};
  background: ${({ theme }) => theme.palette.gray.highlight};

  &:not(:first-child) {
    margin-top: 8px;
  }
`;
