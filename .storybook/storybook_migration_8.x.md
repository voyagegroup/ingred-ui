# Storybook 8.x 移行ガイド

## 概要
このドキュメントは、ingred-uiプロジェクトのStorybookを7系から8系（例：8.6.12）へ移行する際のノウハウ・注意点・サンプルをまとめたものです。

---

## 移行手順・主な変更点

### 1. コンポーネントの移行例（Button.stories.tsxの場合）

#### 変更前（v7系）
```tsx
import { StoryObj } from "@storybook/react";
import { Markdown } from "@storybook/blocks";
import { Title, ArgsTable, Stories } from "@storybook/addon-docs";

export default {
  title: "Components/Inputs/Button",
  components: Button,
  // ...
};

const Template: StoryObj<ButtonProps> = {
  render: (args) => <Button {...args} />,
};

export const Primary: StoryObj<ButtonProps> = {
  ...Template,
  args: { children: "primary" },
};
```

#### 変更後（v8系）
```tsx
import { Meta, StoryObj } from "@storybook/react";
import { Controls, Stories, Title, Markdown } from "@storybook/blocks";

const meta: Meta<typeof Button> = {
  title: "Components/Inputs/Button",
  component: Button,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <div>
            <Markdown>
              {`ここに説明文やサンプルコード`}
            </Markdown>
            <Controls />
            <Stories includePrimary title="Samples" />
          </div>
        </>
      ),
    },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const PrimaryButton: Story = {
  args: {
    children: "primary",
  },
};
```

---

### 2. 主な変更点まとめ

#### ドキュメントコンポーネントの変更
- `ArgsTable` → `Controls`
- `Markdown` → `Markdown`（`@storybook/blocks`からインポート）
- `Description`は不要、`Markdown`のみでOK
- `Primary`コンポーネントの追加

#### 型定義の変更
- `Meta`型の使用
- `Story`型の統一
- `Template`パターンの簡略化

#### 命名規則
- コンポーネント名の競合を避ける（例：`Primary` → `PrimaryButton`）
- `component`プロパティを使う（`components`ではない）
- `export default meta`形式

---

### 3. 移行時の注意点

1. **型エラーの対応**
   - 必須のpropsが正しく設定されているか確認
   - 型定義が正確に行われているか確認
2. **ドキュメントの構造**
   - 新しいドキュメントコンポーネントの正しい使用
   - マークダウンの記述方法の変更
3. **コンポーネント間の依存関係**
   - 共通のユーティリティや型定義の更新
   - 他のコンポーネントへの影響確認
4. **よくあるエラーと対処法**
   - `Description`のchildrenやmarkdownプロパティでエラー → `Markdown`コンポーネントのみを使う
   - JSX構造エラー → タグの閉じ忘れや、説明文の中のコードブロックの記法に注意
   - `component`と`components`のtypoに注意

---

## 参考リンク
- [Storybook 8.0 Migration Guide（公式）](https://storybook.js.org/docs/migration-guide)
- [@storybook/blocks ドキュメント](https://storybook.js.org/docs/writing-docs/docs-blocks)
- [Button.stories.tsx](../src/components/Button/Button.stories.tsx)（移行例） 