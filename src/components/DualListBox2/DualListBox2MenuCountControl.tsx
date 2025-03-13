import React from "react";
import styled from "styled-components";
import {
  ContextMenu2,
  ContextMenu2TriggerItem,
  ContextMenu2CheckItem,
} from "../ContextMenu2";

const StyledTriggerItem = styled(ContextMenu2TriggerItem)`
  margin-right: 16px;
`;

type DualListBox2MenuCountControlProps = {
  pageSize: number;
  pageSizeOptions: number[];
  onPageSizeChange: (pageSize: number) => void;
};

export const DualListBox2MenuCountControl = ({
  pageSize,
  pageSizeOptions,
  onPageSizeChange,
}: DualListBox2MenuCountControlProps) => {
  return (
    <ContextMenu2
      width={136}
      trigger={
        <StyledTriggerItem append={pageSize}>
          件数を変更
        </StyledTriggerItem>
      }
    >
      {pageSizeOptions.map((size) => (
        <ContextMenu2CheckItem
          key={size}
          closeOnChange
          checked={pageSize === size}
          onChange={() => onPageSizeChange(size)}
        >
          {size}件
        </ContextMenu2CheckItem>
      ))}
    </ContextMenu2>
  );
}; 