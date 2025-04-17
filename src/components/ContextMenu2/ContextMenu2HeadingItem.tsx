import React from "react";
import styled from "styled-components";
import { colors } from "../../styles";

// 特に機能を持たない、見た目付きの ContextMenu2 用の「見出し」

export const ContextMenu2HeadingItem = styled(({ className, children }) => {
  return <p className={className}>{children}</p>;
})`
  border-radius: 4px;
  padding: 4px 8px;
  margin-bottom: 4px;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 1.4;
  color: ${colors.basic[900]};
  background: ${colors.basic[100]};

  &:not(:first-child) {
    margin-top: 4px;
  }
`;
