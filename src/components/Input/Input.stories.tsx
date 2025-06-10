import * as React from "react";
import Input, { InputProps } from "./Input";
import { StoryObj } from "@storybook/react";
import { Flex, Spacer, Typography } from "..";

export default {
  title: "Components/Inputs/Input",
  component: Input,
  args: {
    placeholder: "プレースホルダー",
  },
  parameters: {
    docs: {
      description: {
        component: `
Inputコンポーネントは、ユーザーからテキスト入力を受け取るためのコンポーネントです。

## 機能
- 複数のサイズ（small, medium, large）
- 複数のバリアント（light, dark）
- hover、focus時のスタイリングの改善
- エラー状態
- マルチライン入力（テキストエリア）
        `,
      },
    },
  },
};

export const Example: StoryObj<InputProps> = {};

export const Sizes: StoryObj<InputProps> = {
  render: () => (
    <Flex display="flex" flexDirection="column" gap={8}>
      <div>
        <Typography weight="bold">Small</Typography>
        <Spacer pt={1} />
        <Input size="small" placeholder="Small input" />
      </div>
      <div>
        <Typography weight="bold">Medium (default)</Typography>
        <Spacer pt={1} />
        <Input size="medium" placeholder="Medium input" />
      </div>
      <div>
        <Typography weight="bold">Large</Typography>
        <Spacer pt={1} />
        <Input size="large" placeholder="Large input" />
      </div>
    </Flex>
  ),
};

export const Variants: StoryObj<InputProps> = {
  render: () => (
    <Flex display="flex" flexDirection="column" gap={8}>
      <div>
        <Typography weight="bold">Light variant (default)</Typography>
        <Spacer pt={1} />
        <Flex display="flex" gap={8}>
          <div>
            <Typography size="sm" color="secondary">
              通常
            </Typography>
            <Spacer pt={1} />
            <Input variant="light" placeholder="Light variant" />
          </div>
          <div>
            <Typography size="sm" color="secondary">
              入力あり
            </Typography>
            <Spacer pt={1} />
            <Input variant="light" value="Light variant value" />
          </div>
          <div>
            <Typography size="sm" color="secondary">
              無効状態
            </Typography>
            <Spacer pt={1} />
            <Input variant="light" disabled placeholder="Disabled" />
          </div>
          <div>
            <Typography size="sm" color="secondary">
              エラー状態
            </Typography>
            <Spacer pt={1} />
            <Input variant="light" error placeholder="Error" />
          </div>
        </Flex>
      </div>
      <div>
        <Typography weight="bold">Dark variant</Typography>
        <Spacer pt={1} />
        <Flex display="flex" gap={8}>
          <div>
            <Typography size="sm" color="secondary">
              通常
            </Typography>
            <Spacer pt={1} />
            <Input variant="dark" placeholder="Dark variant" />
          </div>
          <div>
            <Typography size="sm" color="secondary">
              入力あり
            </Typography>
            <Spacer pt={1} />
            <Input variant="dark" value="Dark variant value" />
          </div>
          <div>
            <Typography size="sm" color="secondary">
              無効状態
            </Typography>
            <Spacer pt={1} />
            <Input variant="dark" disabled placeholder="Disabled" />
          </div>
          <div>
            <Typography size="sm" color="secondary">
              エラー状態
            </Typography>
            <Spacer pt={1} />
            <Input variant="dark" error placeholder="Error" />
          </div>
        </Flex>
      </div>
      <div style={{ marginTop: 8 }}>
        <Typography size="sm">
          ※
          hover、focusの状態を確認するには、実際にフィールドをホバーまたはクリックしてください
        </Typography>
      </div>
    </Flex>
  ),
};

export const FullWidth: StoryObj<InputProps> = {
  render: () => (
    <Flex display="flex" flexDirection="column" gap={8}>
      <div>
        <Typography weight="bold">Default Width</Typography>
        <Spacer pt={1} />
        <Input placeholder="Default width" />
      </div>
      <div>
        <Typography weight="bold">Full Width</Typography>
        <Spacer pt={1} />
        <Input fullWidth placeholder="Full width input" />
      </div>
    </Flex>
  ),
};

export const Textarea: StoryObj<InputProps> = {
  render: () => (
    <Flex display="flex" flexDirection="column" gap={8}>
      <div>
        <Typography weight="bold">標準のテキストエリア</Typography>
        <Spacer pt={1} />
        <Flex display="flex" gap={8}>
          <div>
            <Typography size="sm" color="secondary">
              rows = 3
            </Typography>
            <Spacer pt={1} />
            <Input multiline placeholder="テキストエリア (rows=3)" rows={3} />
          </div>
          <div>
            <Typography size="sm" color="secondary">
              rows = 5
            </Typography>
            <Spacer pt={1} />
            <Input multiline placeholder="テキストエリア (rows=5)" rows={5} />
          </div>
        </Flex>
      </div>
      <div>
        <Typography weight="bold">バリアント (light / dark)</Typography>
        <Spacer pt={1} />
        <Flex display="flex" gap={8}>
          <div>
            <Typography size="sm" color="secondary">
              Light variant
            </Typography>
            <Spacer pt={1} />
            <Input
              multiline
              variant="light"
              placeholder="Light variant textarea"
              rows={4}
            />
          </div>
          <div>
            <Typography size="sm" color="secondary">
              Dark variant
            </Typography>
            <Spacer pt={1} />
            <Input
              multiline
              variant="dark"
              placeholder="Dark variant textarea"
              rows={4}
            />
          </div>
        </Flex>
      </div>
      <div>
        <Typography weight="bold">リサイズ</Typography>
        <Spacer pt={1} />
        <Flex display="flex" gap={8}>
          <div>
            <Typography size="sm" color="secondary">
              リサイズ可能（デフォルト）
            </Typography>
            <Spacer pt={1} />
            <Input multiline placeholder="Resizable textarea" rows={3} />
          </div>
          <div>
            <Typography size="sm" color="secondary">
              リサイズなし
            </Typography>
            <Spacer pt={1} />
            <Input
              multiline
              placeholder="Non-resizable textarea"
              resize="none"
              rows={3}
            />
          </div>
        </Flex>
      </div>
      <div>
        <Typography weight="bold">エラー状態</Typography>
        <Spacer pt={1} />
        <Flex display="flex" gap={8}>
          <div>
            <Typography size="sm" color="secondary">
              エラー
            </Typography>
            <Spacer pt={1} />
            <Input
              multiline
              error
              placeholder="Error state textarea"
              rows={3}
            />
          </div>
        </Flex>
      </div>
    </Flex>
  ),
};
