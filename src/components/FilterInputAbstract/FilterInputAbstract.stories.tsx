import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { FilterInputAbstract } from "./FilterInputAbstract";
import Icon from "../Icon";

const meta = {
  title: "Components/Inputs/FilterInputAbstract",
  component: FilterInputAbstract,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "サイズバリエーション",
      table: {
        type: { summary: "small | medium | large" },
        defaultValue: { summary: "small" },
      },
    },
    onSelectChange: {
      action: "onSelectChange",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "フィルタータイプ入力コンポーネントの基本抽象コンポーネントです。内部利用専用です。",
      },
    },
  },
} satisfies Meta<typeof FilterInputAbstract>;

export default meta;

const defaultArgs = {
  selectedIndex: 0,
  selectOptions: [
    {
      icon: <Icon name="operator_match" type="line" color="currentColor" />,
      label: "含む",
    },
    {
      icon: (
        <Icon name="operator_does_not_match" type="line" color="currentColor" />
      ),
      label: "含まない",
    },
    {
      icon: <Icon name="operator_contains" type="line" color="currentColor" />,
      label: "いずれかを含む",
    },
  ],
  onSelectChange: () => {},
};

/**
 * Internal use only!
 * このコンポーネントは内部利用専用です。プロダクトには利用しないでください。
 */
export const Default: StoryObj<typeof meta> = {
  args: {
    ...defaultArgs,
    size: "small",
  },
  render: (args: React.ComponentProps<typeof FilterInputAbstract>) => {
    const [, updateArgs] = useArgs();

    return (
      <>
        <FilterInputAbstract
          {...args}
          onSelectChange={(newIndex) => updateArgs({ selectedIndex: newIndex })}
        >
          children
        </FilterInputAbstract>
      </>
    );
  },
};

/**
 * サイズバリエーション
 */
export const Sizes: StoryObj<typeof meta> = {
  args: {
    ...defaultArgs,
  },
  render: () => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <FilterInputAbstract
          {...defaultArgs}
          size="small"
          onSelectChange={() => {}}
        >
          small size (28px)
        </FilterInputAbstract>
        <FilterInputAbstract
          {...defaultArgs}
          size="medium"
          onSelectChange={() => {}}
        >
          medium size (32px)
        </FilterInputAbstract>
        <FilterInputAbstract
          {...defaultArgs}
          size="large"
          onSelectChange={() => {}}
        >
          large size (40px)
        </FilterInputAbstract>
      </div>
    );
  },
};
