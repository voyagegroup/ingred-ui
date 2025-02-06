import React from "react";
import * as styled from "./styled";
import Icon from "../Icon";
import {
  ContextMenu2,
  ContextMenu2Container,
  ContextMenu2HeadingItem,
  ContextMenu2ButtonItem,
  ContextMenu2SwitchItem,
  ContextMenu2HelpTextItem,
  ContextMenu2SeparatorItem,
  ContextMenu2ButtonControlsItem,
} from "../ContextMenu2";
import Button from "../Button";

////////////////////////////////////////////////////////////////////////////////
// INTERNAL USE ONLY
////////////////////////////////////////////////////////////////////////////////

// 左上コントロール群
export const DataTable2FilterControls = () => {
  return (
    <ContextMenu2Container>
      <ContextMenu2
        width={296}
        trigger={
          <styled.RowMenuFilterTrigger type="button">
            <Icon name="filter" color="currentColor" />
            3列に適用中
          </styled.RowMenuFilterTrigger>
        }
      >
        <ContextMenu2HeadingItem>
          フィルタが適用されている列
        </ContextMenu2HeadingItem>
        <ContextMenu2ButtonItem disabled>名前</ContextMenu2ButtonItem>
        <ContextMenu2SwitchItem checked>ステータス</ContextMenu2SwitchItem>
        <ContextMenu2ButtonItem disabled>メールアドレス</ContextMenu2ButtonItem>
        <ContextMenu2ButtonItem disabled>登録日</ContextMenu2ButtonItem>
        <ContextMenu2SwitchItem checked>タイプ</ContextMenu2SwitchItem>
        <ContextMenu2SwitchItem checked>サイズ</ContextMenu2SwitchItem>
        <ContextMenu2HelpTextItem prepend={<Icon name="question" />}>
          フィルタの適用を変更します
        </ContextMenu2HelpTextItem>
        <ContextMenu2SeparatorItem />
        <ContextMenu2ButtonControlsItem>
          <Button size="small" color="clear">
            キャンセル
          </Button>
          <Button size="small">適用</Button>
        </ContextMenu2ButtonControlsItem>
      </ContextMenu2>
    </ContextMenu2Container>
  );
};
