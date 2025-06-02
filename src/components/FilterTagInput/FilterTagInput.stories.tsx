import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/client-api";
import { FilterTagInput } from "./index";
import Icon from "../Icon";

const meta: Meta<typeof FilterTagInput> = {
  title: "Components/Inputs/FilterTagInput",
  component: FilterTagInput,
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
};

export default meta;

/**
 * 入力内容がタグ形式で表示される。<br />
 * 設置される領域が狭い場合、入力領域をモーダルで展開する。
 *
 * ---
 *
 * select 形式の「選択内容（`number`）」とタグ形式の「入力内容（`string[]`）」を管理できます。
 *
 * 選択内容は、選択内容の `selectedIndex` により、`0` から始まる整数で管理します。<br />
 * `selectedIndex` は、select の上からの順です。<br />
 * 選択内容が変更されると、`onSelectChange` で、新しい `selectedIndex` が返されます。
 *
 * 入力内容は `string[]` の配列で管理されます。ユーザーが入力を確定し、それがタグとして追加されると、`onChange` で、新しい配列が返されます。
 *
 * select の選択肢は、`selectOptions` として外から与えてください。<br />
 * 例:
 * ```
 * selectOptions={ [
 *   {
 *     icon: (
 *       <Icon name="operator_match" type="line" color={colors.basic[900]} />
 *     ),
 *     label: "含む",
 *   },
 *   {
 *     icon: (
 *       <Icon
 *         name="operator_does_not_match"
 *         type="line"
 *         color={colors.basic[900]}
 *       />
 *     ),
 *     label: "含まない",
 *   },
 * ] }
 * ```
 *
 */
export const Default: StoryObj<typeof meta> = {
  args: {
    title: "任意タイトル",
    values: ["テキスト", "value2", "value3"],
    selectedIndex: 0,
    selectOptions: [
      {
        icon: <Icon name="operator_match" type="line" />,
        label: "含む",
      },
      {
        icon: <Icon name="operator_does_not_match" type="line" />,
        label: "含まない",
      },
      {
        icon: <Icon name="operator_contains" type="line" />,
        label: "いずれかを含む",
      },
      {
        icon: <Icon name="operator_starts_with" type="line" />,
        label: "で始まる",
      },
      {
        icon: <Icon name="operator_ends_with" type="line" />,
        label: "で終わる",
      },
      {
        icon: <Icon name="operator_equal" type="line" />,
        label: "同じ",
      },
      {
        icon: <Icon name="operator_not_equal" type="line" />,
        label: "同じでない",
      },
    ],
  },
  render: (args) => {
    const [, updateArgs] = useArgs();

    return (
      <>
        <FilterTagInput
          {...args}
          onChange={(newValues) => updateArgs({ values: newValues })}
          onSelectChange={(newIndex) => updateArgs({ selectedIndex: newIndex })}
        />
      </>
    );
  },
};

export const Sizes: StoryObj<typeof meta> = {
  args: {
    title: "サイズバリエーション",
    values: ["small", "medium", "large"],
    selectedIndex: 0,
    selectOptions: [
      {
        icon: <Icon name="operator_match" type="line" />,
        label: "含む",
      },
      {
        icon: <Icon name="operator_does_not_match" type="line" />,
        label: "含まない",
      },
    ],
  },
  render: (args) => {
    const [, updateArgs] = useArgs();

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <FilterTagInput
          {...args}
          size="small"
          onChange={(newValues) => updateArgs({ values: newValues })}
          onSelectChange={(newIndex) => updateArgs({ selectedIndex: newIndex })}
        />
        <FilterTagInput
          {...args}
          size="medium"
          onChange={(newValues) => updateArgs({ values: newValues })}
          onSelectChange={(newIndex) => updateArgs({ selectedIndex: newIndex })}
        />
        <FilterTagInput
          {...args}
          size="large"
          onChange={(newValues) => updateArgs({ values: newValues })}
          onSelectChange={(newIndex) => updateArgs({ selectedIndex: newIndex })}
        />
      </div>
    );
  },
};

export const Variants: StoryObj<typeof meta> = {
  args: {
    title: "カラーバリエーション",
    values: ["light", "dark"],
    selectedIndex: 0,
    selectOptions: [
      {
        icon: <Icon name="operator_match" type="line" />,
        label: "含む",
      },
      {
        icon: <Icon name="operator_does_not_match" type="line" />,
        label: "含まない",
      },
    ],
  },
  render: (args) => {
    const [, updateArgs] = useArgs();

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <FilterTagInput
          {...args}
          variant="light"
          onChange={(newValues) => updateArgs({ values: newValues })}
          onSelectChange={(newIndex) => updateArgs({ selectedIndex: newIndex })}
        />
        <FilterTagInput
          {...args}
          variant="dark"
          onChange={(newValues) => updateArgs({ values: newValues })}
          onSelectChange={(newIndex) => updateArgs({ selectedIndex: newIndex })}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'コンポーネントのvariantに応じてタグのvariantが自動的に切り替わります。variantが"light"の場合はタグは"dark"に、variantが"dark"の場合はタグは"light"になります。',
      },
    },
  },
};

export const Disabled: StoryObj<typeof meta> = {
  args: {
    title: "無効状態のサンプル",
    values: ["テキスト", "value2", "value3"],
    selectedIndex: 0,
    disabled: true,
    selectOptions: [
      {
        icon: <Icon name="operator_match" type="line" />,
        label: "含む",
      },
      {
        icon: <Icon name="operator_does_not_match" type="line" />,
        label: "含まない",
      },
    ],
  },
  render: (args) => {
    const [, updateArgs] = useArgs();

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <p style={{ marginBottom: "0.5rem" }}>無効状態</p>
          <FilterTagInput
            {...args}
            onChange={(newValues) => updateArgs({ values: newValues })}
            onSelectChange={(newIndex) =>
              updateArgs({ selectedIndex: newIndex })
            }
          />
        </div>
        <div>
          <p style={{ marginBottom: "0.5rem" }}>通常状態</p>
          <FilterTagInput
            {...args}
            disabled={false}
            onChange={(newValues) => updateArgs({ values: newValues })}
            onSelectChange={(newIndex) =>
              updateArgs({ selectedIndex: newIndex })
            }
          />
        </div>
      </div>
    );
  },
};

export const Error: StoryObj<typeof meta> = {
  args: {
    title: "Filter",
    values: ["value1", "value2"],
    selectedIndex: 0,
    selectOptions: [
      {
        icon: <Icon name="operator_match" type="line" />,
        label: "含む",
      },
      {
        icon: <Icon name="operator_does_not_match" type="line" />,
        label: "含まない",
      },
      {
        icon: <Icon name="operator_contains" type="line" />,
        label: "いずれかを含む",
      },
    ],
    error: true,
  },
  render: (args) => {
    const [values, setValues] = useState(args.values);
    const [selectedIndex, setSelectedIndex] = useState(args.selectedIndex);

    return (
      <FilterTagInput
        {...args}
        values={values}
        selectedIndex={selectedIndex}
        onChange={(newValues, newSelectedIndex) => {
          setValues(newValues);
          setSelectedIndex(newSelectedIndex);
        }}
      />
    );
  },
};
