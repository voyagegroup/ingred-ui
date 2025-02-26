import React, { ReactNode } from "react";
import styled from "styled-components";
import { colors } from "../../styles";

// 特に機能を持たない、見た目付きの ContextMenu2 用の1行テキスト
type Props = {
  className?: string;
  prepend?: ReactNode;
  children: ReactNode;
};

const Text = styled.p`
  margin: 0;
`;

export const ContextMenu2HelpTextItem = styled(
  ({ className, prepend, children }: Props) => {
    return (
      <div className={className}>
        {prepend && <div>{prepend}</div>}
        <Text>{children}</Text>
      </div>
    );
  },
)`
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 6px 8px;
  /* Slide/Text 12 */
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0;
  color: ${colors.basic[700]};
`;
