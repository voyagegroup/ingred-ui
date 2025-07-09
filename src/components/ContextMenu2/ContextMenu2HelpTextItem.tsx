import React, { ReactNode } from "react";
import styled from "styled-components";
import { trimVertical } from "../../styles/typography";

// 特に機能を持たない、見た目付きの ContextMenu2 用の1行テキスト
type Props = {
  className?: string;
  prepend?: ReactNode;
  children: ReactNode;
};

const Text = styled.p<{ $trim?: boolean }>`
  margin: 0;
  ${({ $trim }) => $trim && trimVertical}
`;

export const ContextMenu2HelpTextItem = styled(
  ({ className, prepend, children }: Props) => {
    return (
      <div className={className}>
        {prepend && <div>{prepend}</div>}
        <Text $trim>{children}</Text>
      </div>
    );
  },
)`
  display: flex;
  gap: 4px;
  align-items: center;
  margin-top: 8px;
  padding: 6px 8px;
  /* Slide/Text 12 */
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0;
  color: ${({ theme }) => theme.palette.text.secondary};
`;
