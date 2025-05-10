import React from "react";
import styled from "styled-components";
import { colors } from "../../styles";

// 特に機能を持たない、見た目付きの ContextMenu2 用の「見出し」

type HeadingItemProps = {
  className?: string;
  children: React.ReactNode;
};

export const ContextMenu2HeadingItem = styled(
  ({ className, children }: HeadingItemProps) => {
    return <p className={className}>{children}</p>;
  },
)`
  border-radius: 4px;
  padding: 4px 8px;
  margin-bottom: 8px;
  font-weight: 700;
  font-size: 12px;
  color: ${colors.basic[900]};
  background: ${colors.basic[100]};

  &:not(:first-child) {
    margin-top: 8px;
  }
`;
