import React from "react";
import { StoryObj } from "@storybook/react";
import { Title, ArgsTable, Stories } from "@storybook/addon-docs";
import Badge from "./Badge";
import Icon from "../Icon";

export default {
  title: "Components/Data Display/Badge",
  components: Badge,
  parameters: {
    docs: {
      source: { language: "tsx" },
      page: () => (
        <>
          <Title />
          <ArgsTable of={Badge} />
          <Stories includePrimary title="Stories" />
        </>
      ),
      description: {
        component: `
Badgeコンポーネントは、ステータスやカテゴリ、通知などを表示するための小さなラベルコンポーネントです。

## 特徴

- 3つのタイプ（normal, pill, signal）をサポート
- 6つのカラーバリエーション（primary, secondary, success, warning, danger, basic）
- 2つのサイズ（small, medium）
- アイコンとテキストを組み合わせ可能
- さまざまなコンテキストに合わせたスタイリング

## 使用例

- ステータス表示
- 数値の表示（カウンターなど）
- カテゴリの表示
- 新機能や更新の通知
        `,
      },
    },
  },
  argTypes: {
    color: {
      control: { type: "select" },
      options: [
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
        "basic",
      ],
    },
    size: {
      control: { type: "select" },
      options: ["medium", "small"],
    },
  },
};

const Template: StoryObj<typeof Badge> = {
  render: (args) => <Badge {...args} />,
};

export const Normal: StoryObj<typeof Badge> = {
  ...Template,
  args: {
    color: "primary",
    children: "ノーマル",
  },
  parameters: {
    docs: {
      description: {
        story: `
ノーマルタイプのバッジは、標準的な角丸の四角形のバッジです。
シンプルな表示に適しており、デフォルトのバッジタイプです。
基本的な情報表示やステータス表示に使用します。
        `,
      },
    },
  },
};

export const NormalWithIcon: StoryObj<typeof Badge> = {
  ...Template,
  args: {
    color: "success",
    children: "アイコン付き",
    icon: <Icon name="image" size="sm" color="currentColor" />,
  },
  parameters: {
    docs: {
      description: {
        story: `
アイコン付きバッジは、テキストの左側にアイコンを表示します。
視覚的な情報を追加することで、バッジの意味をより直感的に伝えることができます。
バッジのサイズに応じて、アイコンサイズも自動的に調整されます。
        `,
      },
    },
  },
};

export const Pill: StoryObj<typeof Badge> = {
  ...Template,
  args: {
    type: "pill",
    color: "secondary",
    children: "ピルタイプ",
  },
  parameters: {
    docs: {
      description: {
        story: `
ピルタイプのバッジは、両端が丸い形状をしています。
丸みを帯びたデザインで、視覚的に柔らかい印象を与えます。
タグやラベルのような使用方法に適しています。
カラーバリエーションは通常のバッジと同じですが、色の濃さが異なります。
        `,
      },
    },
  },
};

export const Signal: StoryObj<typeof Badge> = {
  ...Template,
  args: {
    type: "signal",
    color: "success",
    children: "ステータス",
  },
  parameters: {
    docs: {
      description: {
        story: `
シグナルタイプのバッジは、テキストの左側にカラードットを表示します。
主にステータスを表示するために使用され、ドットの色によって状態を視覚的に示します。
軽量なステータス表示に適しており、システム状態やプロセス状態の表示に最適です。
枠線付きのデザインで、他のバッジタイプと異なる視覚的特徴を持っています。
        `,
      },
    },
  },
};

export const SizesComparison: StoryObj<typeof Badge> = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Badge color="primary" size="medium">
        Medium サイズ
      </Badge>
      <Badge color="primary" size="small">
        Small サイズ
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Badgeコンポーネントは2つのサイズをサポートしています：

- **Medium (デフォルト)**: 標準的なサイズで、一般的な用途に適しています。高さ24px、フォントサイズ13px。
- **Small**: よりコンパクトなサイズで、スペースが限られている場所や補足的な情報の表示に適しています。高さ22px（normalタイプ）または20px（pillタイプ）、フォントサイズ12px。

サイズによって、パディング、ギャップ、ドットサイズ、アイコンサイズなどの値も調整されます。
        `,
      },
    },
  },
};

export const ColorVariations: StoryObj<typeof Badge> = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <Badge color="primary">Primary</Badge>
      <Badge color="secondary">Secondary</Badge>
      <Badge color="success">Success</Badge>
      <Badge color="warning">Warning</Badge>
      <Badge color="danger">Danger</Badge>
      <Badge color="basic">Basic</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Badgeコンポーネントは6つのカラーバリエーションをサポートしています：

- **Primary**: 主要なアクション、ハイライト、ブランドカラーの表現に使用
- **Secondary**: 補助的な情報、二次的な重要性の表現に使用
- **Success**: 成功、完了、有効などのポジティブな状態の表現に使用
- **Warning**: 警告、注意が必要な状態の表現に使用
- **Danger**: エラー、危険、無効などのネガティブな状態の表現に使用
- **Basic**: 基本的な情報、ニュートラルな表現に使用

各カラータイプは、バッジのタイプ（normal, pill, signal）によって適切な色調に調整されます。
        `,
      },
    },
  },
};
