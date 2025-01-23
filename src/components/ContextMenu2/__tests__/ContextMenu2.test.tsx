import React from "react";
import "@testing-library/jest-dom";
import { cleanup, fireEvent, act } from "@testing-library/react";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";
import {
  ContextMenu2Container,
  ContextMenu2,
  ContextMenu2HeadingItem,
  ContextMenu2HelpTextItem,
  ContextMenu2TriggerItem,
  ContextMenu2ButtonItem,
  ContextMenu2CheckItem,
  ContextMenu2SwitchItem,
  ContextMenu2TextInputItem,
  ContextMenu2SeparatorItem,
  ContextMenu2ButtonControlsItem,
} from "../";
import Button from "../../Button";
import Icon from "../../Icon";

jest.mock("react-dom", () => {
  const original = jest.requireActual("react-dom");
  return {
    ...original,
    createPortal: (node: any) => node,
  };
});

// MEMO: ResizeObserver is not supported in jsdom
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe("ContextMenu2 component testing", () => {
  afterEach(cleanup);

  test("ContextMenu2", async () => {
    const { asFragment, getByTestId } = renderWithThemeProvider(
      <ContextMenu2Container>
        <ContextMenu2
          trigger={
            <button type="button" data-testid="trigger">
              trigger
            </button>
          }
          width={316}
        >
          <ContextMenu2HeadingItem>ステータスを変更</ContextMenu2HeadingItem>
          <ContextMenu2HelpTextItem prepend={<Icon name="question" />}>
            ヘルプテキスト
          </ContextMenu2HelpTextItem>
          <ContextMenu2SeparatorItem />
          <ContextMenu2ButtonItem
            prepend={<Icon name="import" />}
            onClick={() => {}}
          >
            アイコンボタン
          </ContextMenu2ButtonItem>
          <ContextMenu2ButtonItem onClick={() => {}}>
            ボタン
          </ContextMenu2ButtonItem>
          <ContextMenu2ButtonItem color="danger" onClick={() => {}}>
            赤ボタン
          </ContextMenu2ButtonItem>
          <ContextMenu2
            trigger={
              <ContextMenu2TriggerItem append={100}>
                入れ子トリガー
              </ContextMenu2TriggerItem>
            }
          >
            <ContextMenu2ButtonItem onClick={() => {}}>
              入れ子ボタン
            </ContextMenu2ButtonItem>
          </ContextMenu2>
          <ContextMenu2CheckItem
            checked={true}
            prepend={<Icon name="image" />}
            onChange={() => {}}
          >
            含む
          </ContextMenu2CheckItem>
          <ContextMenu2CheckItem
            checked={false}
            prepend={<Icon name="image" />}
            onChange={() => {}}
          >
            含まない
          </ContextMenu2CheckItem>
          <ContextMenu2CheckItem checked={false} onChange={() => {}}>
            アイコンなしチェック1
          </ContextMenu2CheckItem>
          <ContextMenu2CheckItem checked={false} onChange={() => {}}>
            アイコンなしチェック2
          </ContextMenu2CheckItem>
          <ContextMenu2SwitchItem checked={false} onChange={() => {}}>
            スイッチ
          </ContextMenu2SwitchItem>
          <ContextMenu2TextInputItem
            value="入力内容"
            placeholder="プレイスホルダー"
            onChange={() => {}}
          />
          <ContextMenu2ButtonControlsItem>
            <Button size="small" color="clear">
              キャンセル
            </Button>
            <Button size="small">適用</Button>
          </ContextMenu2ButtonControlsItem>
          <ContextMenu2ButtonItem onClick={() => alert("最後の項目")}>
            最後の項目
          </ContextMenu2ButtonItem>
        </ContextMenu2>
      </ContextMenu2Container>,
    );
    await act(async () => {
      fireEvent.click(getByTestId("trigger"));
    });
    expect(asFragment()).toMatchSnapshot();
  });
});
