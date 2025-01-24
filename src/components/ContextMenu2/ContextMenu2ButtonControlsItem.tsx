import React, { Children, type ReactNode } from "react";
import styled from "styled-components";

// 特に機能を持たない、見た目付きの横並びボタンレイアウト用のコンテナ

type ContextMenu2ButtonControlsItemProps = {
  className?: string;
  /**
   * ボタン要素
   */
  children: ReactNode;
};

export const ContextMenu2ButtonControlsItem = styled(
  ({ className, children }: ContextMenu2ButtonControlsItemProps) => {
    return (
      <ul className={className}>
        {Children.map(children, (child) => (
          <li>{child}</li>
        ))}
      </ul>
    );
  },
)`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 8px;
  padding: 6px 0;
  margin: 0;
  list-style: none;
`;
