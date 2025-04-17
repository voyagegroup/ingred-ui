import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/client-api";
import { FilterSelectInput } from "./index";
import Icon from "../Icon";

const meta: Meta<typeof FilterSelectInput> = {
  title: "Components/Inputs/FilterSelectInput",
  component: FilterSelectInput,
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["small", "medium", "large"],
      description: "Size of the input",
    },
    variant: {
      control: { type: "radio" },
      options: ["light", "dark"],
      description: "Color variation",
    },
    searchPlaceholder: {
      control: {
        type: "text",
      },
      description: "検索窓のプレースホルダーテキスト",
    },
    disabled: {
      control: { type: "radio" },
      options: [true, false],
      description: "Whether the input is disabled",
    },
    error: {
      control: { type: "radio" },
      options: [true, false],
      description: "Whether to display error state",
    },
  },
} satisfies Meta<typeof FilterSelectInput>;

export default meta;

/**
 * 入力内容をリストから選択させるフィルターの入力です。
 * 利用方法は、FilterTagInput の story 内の説明を参照してください。
 *
 * 自動で横 100% に広がります。必要に応じて、親要素の幅を指定してください。
 */
export const Default: StoryObj<typeof meta> = {
  args: {
    value: "項目1",
    options: [
      "項目1",
      "value2",
      "すごく長い値すごく長い値すごく長い値すごく長い値すごく長い値",
      ...Array.from({ length: 20 }, (_, i) => `value${i + 3}`),
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
      {
        icon: (
          <Icon name="operator_starts_with" type="line" color="currentColor" />
        ),
        label: "で始まる",
      },
      {
        icon: (
          <Icon name="operator_ends_with" type="line" color="currentColor" />
        ),
        label: "で終わる",
      },
      {
        icon: <Icon name="operator_equal" type="line" color="currentColor" />,
        label: "同じ",
      },
      {
        icon: (
          <Icon name="operator_not_equal" type="line" color="currentColor" />
        ),
        label: "同じでない",
      },
    ],
  },
  render: (args) => {
    const [, updateArgs] = useArgs();

    return (
      <>
        <FilterSelectInput
          {...args}
          onChange={(newValue) => updateArgs({ value: newValue })}
          onSelectChange={(newIndex) => updateArgs({ selectedIndex: newIndex })}
        />
        <div style={{ maxWidth: 200 }}>
          ↓親で幅を指定した例
          <FilterSelectInput
            {...args}
            onChange={(newValue) => updateArgs({ value: newValue })}
            onSelectChange={(newIndex) =>
              updateArgs({ selectedIndex: newIndex })
            }
          />
        </div>
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
    value: "項目1",
    options: [
      "項目1",
      "value2",
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
    const handleChange = (value: string) => updateArgs({ value });
    const handleSelectChange = (selectedIndex: number) =>
      updateArgs({ selectedIndex });

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <FilterSelectInput
          {...args}
          size="small"
          onChange={handleChange}
          onSelectChange={handleSelectChange}
        />
        <FilterSelectInput
          {...args}
          onChange={handleChange}
          onSelectChange={handleSelectChange}
        />
        <FilterSelectInput
          {...args}
          size="large"
          onChange={handleChange}
          onSelectChange={handleSelectChange}
        />
      </div>
    );
  },
};

export const Variants: StoryObj<typeof meta> = {
  args: {
    value: "選択肢1",
    options: ["選択肢1", "選択肢2", "選択肢3"],
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

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <FilterSelectInput
          {...args}
          variant="light"
          onChange={(newValue) => updateArgs({ value: newValue })}
          onSelectChange={(newIndex) => updateArgs({ selectedIndex: newIndex })}
        />
        <FilterSelectInput
          {...args}
          variant="dark"
          onChange={(newValue) => updateArgs({ value: newValue })}
          onSelectChange={(newIndex) => updateArgs({ selectedIndex: newIndex })}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'コンポーネントのvariantに応じてタグのvariantが自動的に切り替わります。variantが"light"の場合はタグは"dark"に、variantが"dark"の場合はタグは"light"になります。',
      },
    },
  },
};

/**
 * 無効化状態のサンプル
 */
export const Disabled: StoryObj<typeof meta> = {
  args: {
    value: "項目1",
    options: ["項目1", "項目2", "項目3"],
    selectedIndex: 0,
    disabled: true,
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
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>無効化状態</div>
        <FilterSelectInput
          {...args}
          onChange={(newValue) => updateArgs({ value: newValue })}
          onSelectChange={(newIndex) => updateArgs({ selectedIndex: newIndex })}
        />
        <div>通常状態</div>
        <FilterSelectInput
          {...args}
          disabled={false}
          onChange={(newValue) => updateArgs({ value: newValue })}
          onSelectChange={(newIndex) => updateArgs({ selectedIndex: newIndex })}
        />
      </div>
    );
  },
};

export const Error: StoryObj<typeof meta> = {
  args: {
    value: "value1",
    options: ["value1", "value2"],
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
    error: true,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    const [selectedIndex, setSelectedIndex] = useState(args.selectedIndex);

    return (
      <FilterSelectInput
        {...args}
        value={value}
        selectedIndex={selectedIndex}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        onSelectChange={(newIndex) => {
          setSelectedIndex(newIndex);
        }}
      />
    );
  },
};

