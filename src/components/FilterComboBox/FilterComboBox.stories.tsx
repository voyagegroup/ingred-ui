import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/client-api";
import { FilterComboBox } from "./index";
import Icon from "../Icon";

const meta = {
  title: "Components/Inputs/FilterComboBox",
  component: FilterComboBox,
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["small", "medium", "large"],
      description: "コンポーネントのサイズバリエーション",
      table: {
        type: { summary: "small | medium | large" },
        defaultValue: { summary: "medium" },
      },
    },
    variant: {
      control: { type: "radio" },
      options: ["light", "dark"],
      description: "コンポーネントの背景色バリエーション",
      table: {
        type: { summary: "light | dark" },
        defaultValue: { summary: "dark" },
      },
    },
    tagVariant: {
      control: { type: "radio" },
      options: ["light", "dark"],
      description: "タグの背景色バリエーション。省略した場合はvariantに応じて自動的に決定（variantが'light'の場合は'dark'、'dark'の場合は'light'）",
      table: {
        type: { summary: "light | dark" },
        defaultValue: { summary: "variantに連動" },
      },
    },
  },
} satisfies Meta<typeof FilterComboBox>;

export default meta;

/**
 * Storybook の Docs の画面では、エンターキーが吸い取られてしまうようです。<br />
 * **キーボード操作を試す場合は、Docs ではない、個別のページで確認してください**
 *
 * 入力内容をリストから選択させるフィルターの入力です。
 * 利用方法は、FilterTagInput の story 内の説明を参照してください。
 *
 * 自動で横 100% に広がります。必要に応じて、親要素の幅を指定してください。
 *
 * ---
 *
 * 選択リストの形式は (string | string[])[] で、「文字列」と「文字列の配列」を混在させることができます。
 * 選択項目が「文字列」の場合は、入力値に含まれる場合フィルタリングされます。
 * 選択項目が「文字列の配列」の場合は、ラベルとしては「文字列の配列[0]」が表示されますが、フィルタリングされる際は「文字列の配列」全体を使ってフィルタリングされます。
 *
 * 例:
 * options の項目が `[ "イルカ", ["パンダ", "ぱんだ", "熊猫"], "ライオン" ]` の場合、ユーザー入力が "ぱんだ"、"パン"、"猫" と入力したときにどの場合にも「パンダ」がフィルタリングされます。
 */
export const Default: StoryObj<typeof meta> = {
  args: {
    values: ["パンダ", "ヒョウ"],
    options: [
      ["ウサギ", "うさぎ", "兎"],
      ["パンダ", "ぱんだ", "熊猫"],
      ["レッサーパンダ", "れっさーぱんだ"],
      "ヒョウ",
      "ライオン",
      "tiger",
      "giraffe",
      ["🐘", "ゾウ", "ぞう", "象"],
      "すごく長い値すごく長い値すごく長い値すごく長い値すごく長い値",
    ],
    selectedIndex: 0,
    selectOptions: [
      {
        icon: <Icon name="operator_match" type="line" color="currentColor" />,
        label: "含む",
      },
      {
        icon: (
          <Icon
            name="operator_does_not_match"
            type="line"
            color="currentColor"
          />
        ),
        label: "含まない",
      },
      {
        icon: (
          <Icon name="operator_contains" type="line" color="currentColor" />
        ),
        label: "いずれかを含む",
      },
    ],
  },
  render: (args) => {
    const [, updateArgs] = useArgs();

    return (
      <>
        <FilterComboBox
          {...args}
          onChange={(values) => updateArgs({ values })}
          onSelectChange={(selectedIndex) => updateArgs({ selectedIndex })}
        />
      </>
    );
  },
};

/**
 * サイズバリエーション
 *
 * - small: 高さ28px
 * - medium: 高さ32px（デフォルト）
 * - large: 高さ40px
 */
export const Sizes: StoryObj<typeof meta> = {
  args: {
    values: ["パンダ", "ヒョウ"],
    options: [
      ["ウサギ", "うさぎ", "兎"],
      ["パンダ", "ぱんだ", "熊猫"],
      ["レッサーパンダ", "れっさーぱんだ"],
      "ヒョウ",
      "ライオン",
      "tiger",
      "giraffe",
      ["🐘", "ゾウ", "ぞう", "象"],
    ],
    selectedIndex: 0,
    selectOptions: [
      {
        icon: <Icon name="operator_match" type="line" color="currentColor" />,
        label: "含む",
      },
      {
        icon: (
          <Icon
            name="operator_does_not_match"
            type="line"
            color="currentColor"
          />
        ),
        label: "含まない",
      },
      {
        icon: (
          <Icon name="operator_contains" type="line" color="currentColor" />
        ),
        label: "いずれかを含む",
      },
    ],
  },
  render: (args) => {
    const [, updateArgs] = useArgs();
    const handleChange = (values: string[]) => updateArgs({ values });
    const handleSelectChange = (selectedIndex: number) =>
      updateArgs({ selectedIndex });

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <FilterComboBox
          {...args}
          size="small"
          onChange={handleChange}
          onSelectChange={handleSelectChange}
        />
        <FilterComboBox
          {...args}
          onChange={handleChange}
          onSelectChange={handleSelectChange}
        />
        <FilterComboBox
          {...args}
          size="large"
          onChange={handleChange}
          onSelectChange={handleSelectChange}
        />
      </div>
    );
  },
};

/**
 * カラーバリエーション
 *
 * - variant: コンポーネント全体の背景色
 *   - light: 明るい背景色
 *   - dark: 暗い背景色（デフォルト）
 * - tagVariant: タグの背景色
 *   - 指定なし: 親コンポーネントのvariantに応じて自動的に設定（推奨）
 *   - light: 明るい背景色
 *   - dark: 暗い背景色
 *
 * コンポーネントのvariantに応じてタグのvariantが自動的に切り替わります。
 * variantが"light"の場合はタグは"dark"に、variantが"dark"の場合はタグは"light"になります。
 */
export const Variants: StoryObj<typeof meta> = {
  args: {
    values: ["パンダ", "ヒョウ"],
    options: [
      ["ウサギ", "うさぎ", "兎"],
      ["パンダ", "ぱんだ", "熊猫"],
      ["レッサーパンダ", "れっさーぱんだ"],
      "ヒョウ",
      "ライオン",
    ],
    selectedIndex: 0,
    selectOptions: [
      {
        icon: <Icon name="operator_match" type="line" color="currentColor" />,
        label: "含む",
      },
      {
        icon: (
          <Icon
            name="operator_does_not_match"
            type="line"
            color="currentColor"
          />
        ),
        label: "含まない",
      },
    ],
  },
  render: (args) => {
    const [, updateArgs] = useArgs();
    const handleChange = (values: string[]) => updateArgs({ values });
    const handleSelectChange = (selectedIndex: number) =>
      updateArgs({ selectedIndex });

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <FilterComboBox
          {...args}
          variant="light"
          onChange={handleChange}
          onSelectChange={handleSelectChange}
        />
        <FilterComboBox
          {...args}
          variant="dark"
          onChange={handleChange}
          onSelectChange={handleSelectChange}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'コンポーネントのvariantに応じてタグのvariantが自動的に切り替わります。variantが"light"の場合はタグは"dark"に、variantが"dark"の場合はタグは"light"になります。tagVariantを明示的に指定することで、この自動連動をオーバーライドすることもできます。',
      },
    },
  },
};

/**
 * 無効状態のサンプル
 */
export const Disabled: StoryObj<typeof meta> = {
  args: {
    values: ["パンダ", "ヒョウ"],
    options: [
      ["ウサギ", "うさぎ", "兎"],
      ["パンダ", "ぱんだ", "熊猫"],
      ["レッサーパンダ", "れっさーぱんだ"],
      "ヒョウ",
      "ライオン",
      "tiger",
      "giraffe",
      ["🐘", "ゾウ", "ぞう", "象"],
    ],
    selectedIndex: 0,
    selectOptions: [
      {
        icon: <Icon name="operator_match" type="line" color="currentColor" />,
        label: "含む",
      },
      {
        icon: (
          <Icon
            name="operator_does_not_match"
            type="line"
            color="currentColor"
          />
        ),
        label: "含まない",
      },
      {
        icon: (
          <Icon name="operator_contains" type="line" color="currentColor" />
        ),
        label: "いずれかを含む",
      },
    ],
    disabled: true,
  },
  render: (args) => {
    const [, updateArgs] = useArgs();
    const handleChange = (values: string[]) => updateArgs({ values });
    const handleSelectChange = (selectedIndex: number) =>
      updateArgs({ selectedIndex });

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <p>無効状態</p>
          <FilterComboBox
            {...args}
            onChange={handleChange}
            onSelectChange={handleSelectChange}
          />
        </div>
        <div>
          <p>通常状態</p>
          <FilterComboBox
            {...args}
            disabled={false}
            onChange={handleChange}
            onSelectChange={handleSelectChange}
          />
        </div>
      </div>
    );
  },
};

/**
 * エラー状態
 */
export const Error: StoryObj<typeof meta> = {
  args: {
    values: ["パンダ", "ヒョウ"],
    options: [
      ["ウサギ", "うさぎ", "兎"],
      ["パンダ", "ぱんだ", "熊猫"],
      ["レッサーパンダ", "れっさーぱんだ"],
      "ヒョウ",
      "ライオン",
    ],
    selectedIndex: 0,
    selectOptions: [
      {
        icon: <Icon name="operator_match" type="line" color="currentColor" />,
        label: "含む",
      },
    ],
    error: true,
  },
  render: (args) => {
    const [, updateArgs] = useArgs();

    return (
      <FilterComboBox
        {...args}
        onChange={(values) => updateArgs({ values })}
        onSelectChange={(selectedIndex) => updateArgs({ selectedIndex })}
      />
    );
  },
};
