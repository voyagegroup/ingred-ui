import React, { useEffect, useState, useRef } from "react";
import { StoryObj } from "@storybook/react";
import {
  ContextMenu2Container,
  ContextMenu2,
  useContextMenu2Anchor,
  ContextMenu2HeadingItem,
  ContextMenu2HelpTextItem,
  ContextMenu2TriggerItem,
  ContextMenu2ButtonItem,
  ContextMenu2CheckItem,
  ContextMenu2SwitchItem,
  ContextMenu2TextInputItem,
  ContextMenu2SeparatorItem,
  ContextMenu2ButtonControlsItem,
} from "./index";
import Button from "../Button";
import ActionButton from "../ActionButton";
import Icon from "../Icon";

export default {
  title: "Components/Navigation/ContextMenu2",
  component: ContextMenu2,
};

export const Overview: StoryObj<typeof ContextMenu2> = {
  render: () => {
    const [checkedIndex, setCheckedIndex] = useState<number>(0);
    const [textValue, setTextValue] = useState<string>("テキスト");
    return (
      <>
        <ContextMenu2Container>
          <ContextMenu2
            trigger={<button type="button">trigger</button>}
            width={316}
          >
            <ContextMenu2SwitchItem
              checked={checkedIndex === 0}
              onChange={(checked) => setCheckedIndex(checked ? 0 : 1)}
            >
              スイッチ1
            </ContextMenu2SwitchItem>
            <ContextMenu2HelpTextItem prepend={<Icon name="question" />}>
              ヘルプテキスト
            </ContextMenu2HelpTextItem>
            <ContextMenu2ButtonItem
              prepend={<Icon name="import" />}
              onClick={() => alert("ダウンロード")}
            >
              ダウンロード
            </ContextMenu2ButtonItem>
            <ContextMenu2SeparatorItem />
            <ContextMenu2HeadingItem>ステータスを変更</ContextMenu2HeadingItem>
            <ContextMenu2ButtonItem onClick={() => alert("有効")}>
              有効にする
            </ContextMenu2ButtonItem>
            <ContextMenu2ButtonItem onClick={() => alert("アーカイブ")}>
              アーカイブする
            </ContextMenu2ButtonItem>
            <ContextMenu2ButtonItem
              color="danger"
              onClick={() => alert("削除する")}
            >
              削除する
            </ContextMenu2ButtonItem>
            <ContextMenu2HeadingItem>入れ子</ContextMenu2HeadingItem>
            <ContextMenu2
              trigger={
                <ContextMenu2TriggerItem append={100}>
                  入れ子トリガー
                </ContextMenu2TriggerItem>
              }
            >
              <ContextMenu2
                trigger={
                  <ContextMenu2TriggerItem append={100}>
                    さらに入れ子トリガー
                  </ContextMenu2TriggerItem>
                }
              >
                {[...Array(10)].map((_, i) => (
                  <ContextMenu2ButtonItem
                    key={i}
                    onClick={() => alert("さらに入れ子")}
                  >
                    さらに入れ子ボタン
                  </ContextMenu2ButtonItem>
                ))}
              </ContextMenu2>
              {[...Array(10)].map((_, i) => (
                <ContextMenu2ButtonItem key={i} onClick={() => alert("入れ子")}>
                  入れ子ボタン
                </ContextMenu2ButtonItem>
              ))}
            </ContextMenu2>
            <ContextMenu2CheckItem
              checked={checkedIndex === 0}
              prepend={<Icon name="image" />}
              onChange={(checked) => {
                if (checked) setCheckedIndex(0);
              }}
            >
              含む
            </ContextMenu2CheckItem>
            <ContextMenu2CheckItem
              checked={checkedIndex === 1}
              prepend={<Icon name="image" />}
              onChange={(checked) => {
                if (checked) setCheckedIndex(1);
              }}
            >
              含まない
            </ContextMenu2CheckItem>
            <ContextMenu2CheckItem
              checked={checkedIndex === 2}
              prepend={<Icon name="image" />}
              onChange={(checked) => {
                if (checked) setCheckedIndex(2);
              }}
            >
              いずれかを含む
            </ContextMenu2CheckItem>

            <ContextMenu2CheckItem
              checked={checkedIndex === 3}
              onChange={(checked) => {
                if (checked) setCheckedIndex(3);
              }}
            >
              アイコンなしチェック1
            </ContextMenu2CheckItem>
            <ContextMenu2CheckItem
              checked={checkedIndex === 4}
              onChange={(checked) => {
                if (checked) setCheckedIndex(4);
              }}
            >
              アイコンなしチェック2
            </ContextMenu2CheckItem>
            <ContextMenu2TextInputItem
              value={textValue}
              placeholder="プレイスホルダー"
              onChange={(event) => setTextValue(event.target.value)}
            />
            <ContextMenu2SeparatorItem />
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
        </ContextMenu2Container>
        <p>
          ContextMenu2 利用時は必ず、ContextMenu2 を ContextMenu2Container
          で括って利用してください。
        </p>
        <p>
          ContextMenu2 には、ContextMenu2***
          コンポーネントを入れて利用してください。
        </p>
        <br />
        <table>
          <tbody>
            <tr>
              <th>ContextMenu2HeadingItem</th>
              <td>ラベル見出し</td>
            </tr>
            <tr>
              <th>ContextMenu2HelpTextItem</th>
              <td>ヘルプテキスト</td>
            </tr>
            <tr>
              <th>ContextMenu2SeparatorItem</th>
              <td>区切り線</td>
            </tr>
            <tr>
              <th>ContextMenu2ButtonItem</th>
              <td>ボタン（押下時コールバックあり）</td>
            </tr>
            <tr>
              <th>ContextMenu2CheckItem</th>
              <td>チェックボックス（チェック時コールバックあり）</td>
            </tr>
            <tr>
              <th>ContextMenu2SwitchItem</th>
              <td>スイッチ（切り替え時コールバックあり）</td>
            </tr>
            <tr>
              <th>ContextMenu2TextInputItem</th>
              <td>テキスト入力欄（入力時コールバックあり）</td>
            </tr>
            <tr>
              <th>ContextMenu2ButtonControlsItem</th>
              <td>Buttonコンポーネントを並べて利用するためのコンテナ</td>
            </tr>
            <tr>
              <th>ContextMenu2TriggerItem</th>
              <td>
                ContextMenu2を入れ子にしたとき用のトリガー（押下時コールバックあり）
              </td>
            </tr>
          </tbody>
        </table>
      </>
    );
  },
};

export const Triggers: StoryObj<typeof ContextMenu2> = {
  render: () => {
    return (
      <div style={{ display: "flex", gap: 16 }}>
        <ContextMenu2Container>
          <ContextMenu2
            trigger={<ActionButton icon="pencil">trigger</ActionButton>}
            width={316}
          >
            <ContextMenu2ButtonItem onClick={() => alert("ボタン1")}>
              ボタン1
            </ContextMenu2ButtonItem>
            <ContextMenu2ButtonItem onClick={() => alert("ボタン2")}>
              ボタン2
            </ContextMenu2ButtonItem>
          </ContextMenu2>
        </ContextMenu2Container>

        <ContextMenu2Container>
          <ContextMenu2 trigger={<Button>trigger</Button>} width={316}>
            <ContextMenu2ButtonItem onClick={() => alert("ボタン1")}>
              ボタン1
            </ContextMenu2ButtonItem>
            <ContextMenu2ButtonItem onClick={() => alert("ボタン2")}>
              ボタン2
            </ContextMenu2ButtonItem>
          </ContextMenu2>
        </ContextMenu2Container>
      </div>
    );
  },
};

export const WithButton: StoryObj<typeof ContextMenu2> = {
  render: () => {
    return (
      <ContextMenu2Container>
        <ContextMenu2
          trigger={<button type="button">trigger</button>}
          width={316}
        >
          <ContextMenu2ButtonItem
            prepend={<Icon name="import" />}
            onClick={() => alert("ダウンロード")}
          >
            ダウンロード
          </ContextMenu2ButtonItem>
          <ContextMenu2ButtonItem
            prepend={<Icon name="refresh_line" color="active" />}
            onClick={() => alert("色付きアイコン")}
          >
            色付きアイコン
          </ContextMenu2ButtonItem>
          <ContextMenu2SeparatorItem />
          <ContextMenu2HeadingItem>ステータスを変更</ContextMenu2HeadingItem>
          <ContextMenu2ButtonItem onClick={() => alert("有効")}>
            有効にする
          </ContextMenu2ButtonItem>
          <ContextMenu2ButtonItem
            color="danger"
            onClick={() => alert("削除する")}
          >
            削除する
          </ContextMenu2ButtonItem>
        </ContextMenu2>
      </ContextMenu2Container>
    );
  },
};

export const WithCheck: StoryObj<typeof ContextMenu2> = {
  render: () => {
    const [checkedIndex, setCheckedIndex] = useState<number[]>([]);
    const handleCheck = (index: number) => {
      if (checkedIndex.includes(index)) {
        setCheckedIndex(checkedIndex.filter((i) => i !== index));
      } else {
        setCheckedIndex([...checkedIndex, index]);
      }
    };
    return (
      <ContextMenu2Container>
        <ContextMenu2
          trigger={<button type="button">trigger</button>}
          width={316}
        >
          <ContextMenu2CheckItem
            checked={checkedIndex.includes(0)}
            prepend={<Icon name="image" />}
            onChange={() => handleCheck(0)}
          >
            含む
          </ContextMenu2CheckItem>
          <ContextMenu2CheckItem
            checked={checkedIndex.includes(1)}
            prepend={<Icon name="image" />}
            onChange={() => handleCheck(1)}
          >
            含まない
          </ContextMenu2CheckItem>
          <ContextMenu2CheckItem
            checked={checkedIndex.includes(2)}
            prepend={<Icon name="image" />}
            onChange={() => handleCheck(2)}
          >
            いずれかを含む
          </ContextMenu2CheckItem>

          <ContextMenu2CheckItem
            checked={checkedIndex.includes(3)}
            onChange={() => handleCheck(3)}
          >
            アイコンなしチェック1
          </ContextMenu2CheckItem>
          <ContextMenu2CheckItem
            checked={checkedIndex.includes(4)}
            onChange={() => handleCheck(4)}
          >
            アイコンなしチェック2
          </ContextMenu2CheckItem>
        </ContextMenu2>
      </ContextMenu2Container>
    );
  },
};
export const WithCheckAsRadio: StoryObj<typeof ContextMenu2> = {
  render: () => {
    const [checkedIndex, setCheckedIndex] = useState<number>(0);
    return (
      <ContextMenu2Container>
        <ContextMenu2
          trigger={<button type="button">trigger</button>}
          width={316}
        >
          <ContextMenu2CheckItem
            checked={checkedIndex === 0}
            prepend={<Icon name="image" />}
            onChange={(checked) => {
              if (checked) setCheckedIndex(0);
            }}
          >
            含む
          </ContextMenu2CheckItem>
          <ContextMenu2CheckItem
            checked={checkedIndex === 1}
            prepend={<Icon name="image" />}
            onChange={(checked) => {
              if (checked) setCheckedIndex(1);
            }}
          >
            含まない
          </ContextMenu2CheckItem>
          <ContextMenu2CheckItem
            checked={checkedIndex === 2}
            prepend={<Icon name="image" />}
            onChange={(checked) => {
              if (checked) setCheckedIndex(2);
            }}
          >
            いずれかを含む
          </ContextMenu2CheckItem>

          <ContextMenu2CheckItem
            checked={checkedIndex === 3}
            onChange={(checked) => {
              if (checked) setCheckedIndex(3);
            }}
          >
            アイコンなしチェック1
          </ContextMenu2CheckItem>
          <ContextMenu2CheckItem
            checked={checkedIndex === 4}
            onChange={(checked) => {
              if (checked) setCheckedIndex(4);
            }}
          >
            アイコンなしチェック2
          </ContextMenu2CheckItem>
        </ContextMenu2>
      </ContextMenu2Container>
    );
  },
};

export const WithSwitch: StoryObj<typeof ContextMenu2> = {
  render: () => {
    const [checkedIndex, setCheckedIndex] = useState<number[]>([]);
    const handleCheck = (index: number) => {
      if (checkedIndex.includes(index)) {
        setCheckedIndex(checkedIndex.filter((i) => i !== index));
      } else {
        setCheckedIndex([...checkedIndex, index]);
      }
    };
    return (
      <ContextMenu2Container>
        <ContextMenu2
          trigger={<button type="button">trigger</button>}
          width={316}
        >
          <ContextMenu2SwitchItem
            checked={checkedIndex.includes(0)}
            onChange={() => handleCheck(0)}
          >
            スイッチ1
          </ContextMenu2SwitchItem>
          <ContextMenu2SwitchItem
            checked={checkedIndex.includes(1)}
            onChange={() => handleCheck(1)}
          >
            スイッチ2
          </ContextMenu2SwitchItem>
          <ContextMenu2SwitchItem
            disabled
            checked={checkedIndex.includes(2)}
            onChange={() => handleCheck(2)}
          >
            スイッチ3（無効）
          </ContextMenu2SwitchItem>
          <ContextMenu2SwitchItem
            checked={checkedIndex.includes(3)}
            onChange={() => handleCheck(3)}
          >
            スイッチ4
          </ContextMenu2SwitchItem>
          <ContextMenu2HelpTextItem prepend={<Icon name="question" />}>
            フィルタの適用を変更します
          </ContextMenu2HelpTextItem>
        </ContextMenu2>
      </ContextMenu2Container>
    );
  },
};

export const WithTextInput: StoryObj<typeof ContextMenu2> = {
  render: () => {
    const [open, setOpen] = useState<boolean>(false);
    const [textValue, setTextValue] = useState<string>("テキスト");
    return (
      <>
        <p>
          開閉のコントロールを制御したい場合には、open と onOpenChange
          を使用してください。
        </p>
        <ContextMenu2Container>
          <ContextMenu2
            trigger={<button type="button">trigger</button>}
            width={316}
            open={open}
            onOpenChange={setOpen}
          >
            <ContextMenu2TextInputItem
              value={textValue}
              placeholder="プレイスホルダー"
              onChange={(event) => setTextValue(event.target.value)}
            />

            <ContextMenu2ButtonControlsItem>
              <Button size="small" color="clear" onClick={() => setOpen(false)}>
                キャンセル
              </Button>
              <Button
                size="small"
                onClick={() => {
                  alert(textValue);
                  setOpen(false);
                }}
              >
                適用
              </Button>
            </ContextMenu2ButtonControlsItem>
          </ContextMenu2>
        </ContextMenu2Container>
      </>
    );
  },
};

export const Nest: StoryObj<typeof ContextMenu2> = {
  render: () => {
    return (
      <ContextMenu2Container>
        <ContextMenu2
          trigger={<button type="button">trigger</button>}
          width={316}
        >
          <ContextMenu2HeadingItem>ルート</ContextMenu2HeadingItem>
          <ContextMenu2
            trigger={
              <ContextMenu2TriggerItem append={100}>
                入れ子トリガー
              </ContextMenu2TriggerItem>
            }
          >
            <ContextMenu2HeadingItem>2段目</ContextMenu2HeadingItem>
            <ContextMenu2
              trigger={
                <ContextMenu2TriggerItem append={100}>
                  さらに入れ子トリガー
                </ContextMenu2TriggerItem>
              }
            >
              <ContextMenu2HeadingItem>3段目</ContextMenu2HeadingItem>
              {[...Array(10)].map((_, i) => (
                <ContextMenu2ButtonItem
                  key={i}
                  onClick={() => alert("さらに入れ子")}
                >
                  さらに入れ子ボタン
                </ContextMenu2ButtonItem>
              ))}
            </ContextMenu2>
            {[...Array(10)].map((_, i) => (
              <ContextMenu2ButtonItem key={i} onClick={() => alert("入れ子")}>
                入れ子ボタン
              </ContextMenu2ButtonItem>
            ))}
          </ContextMenu2>
        </ContextMenu2>
      </ContextMenu2Container>
    );
  },
};

export const Anchor: StoryObj<typeof ContextMenu2> = {
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    const { position, setPosition } = useContextMenu2Anchor();
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
      if (!ref.current) return;
      const el = ref.current;
      const onDocumentClick = (event: MouseEvent) => {
        if (open) {
          setOpen(false);
          return;
        }

        setPosition({ x: event.clientX, y: event.clientY });
        // 一更新前の状態でチラ見えしてしまうため、1フレーム後に切り替え
        requestAnimationFrame(() => setOpen(true));
      };

      el.addEventListener("click", onDocumentClick);

      return () => {
        el.removeEventListener("click", onDocumentClick);
      };
    }, [open, setPosition]);
    return (
      <div ref={ref} style={{ height: 500, background: "orange" }}>
        <p>領域内をクリックしてください</p>
        {JSON.stringify(position)}
        <ContextMenu2Container>
          <ContextMenu2 open={open} trigger={position} width={316}>
            <ContextMenu2HeadingItem>ルート</ContextMenu2HeadingItem>
            <ContextMenu2
              trigger={
                <ContextMenu2TriggerItem append={100}>
                  入れ子トリガー
                </ContextMenu2TriggerItem>
              }
            >
              <ContextMenu2HeadingItem>2段目</ContextMenu2HeadingItem>
              {[...Array(10)].map((_, i) => (
                <ContextMenu2ButtonItem key={i} onClick={() => alert("入れ子")}>
                  入れ子ボタン
                </ContextMenu2ButtonItem>
              ))}
            </ContextMenu2>
          </ContextMenu2>
        </ContextMenu2Container>
      </div>
    );
  },
};
