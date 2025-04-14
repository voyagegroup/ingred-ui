import React, { useState } from "react";
import { Story, Meta } from "@storybook/react";
import { Select2 } from "./Select2";
import { Select2Option, Select2Props } from "./types";

export default {
  title: "Components/Select2",
  component: Select2,
  parameters: {
    docs: {
      description: {
        component: `
選択肢の中から項目を選択するコンポーネントです。
検索機能付きのセレクトボックスとして使用できます。
        `,
      },
    },
  },
} as Meta<typeof Select2>;

const options: Select2Option[] = [
  { value: "apple", label: "りんご" },
  { value: "banana", label: "バナナ" },
  { value: "orange", label: "オレンジ" },
  { value: "grape", label: "ブドウ" },
  { value: "melon", label: "メロン" },
  { value: "peach", label: "桃" },
  { value: "strawberry", label: "イチゴ" },
  { value: "kiwi", label: "キウイ" },
  { value: "pineapple", label: "パイナップル" },
  { value: "mango", label: "マンゴー" },
];

const Template: Story<Select2Props<string>> = (args) => {
  const [value, setValue] = useState<string | undefined>(args.value as string);
  
  return (
    <div style={{ width: "300px" }}>
      <Select2<string>
        {...args}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
    </div>
  );
};

export const Basic: Story<Select2Props<string>> = Template.bind({});
Basic.args = {
  options,
  placeholder: "果物を選択",
};

export const WithLabel: Story<Select2Props<string>> = Template.bind({});
WithLabel.args = {
  options,
  label: "お好きな果物",
  placeholder: "果物を選択",
};

export const Required: Story<Select2Props<string>> = Template.bind({});
Required.args = {
  options,
  label: "お好きな果物",
  placeholder: "果物を選択",
  required: true,
};

export const WithDescription: Story<Select2Props<string>> = Template.bind({});
WithDescription.args = {
  options,
  label: "お好きな果物",
  placeholder: "果物を選択",
  description: "好きな果物を1つ選んでください",
};

export const WithError: Story<Select2Props<string>> = Template.bind({});
WithError.args = {
  options,
  label: "お好きな果物",
  placeholder: "果物を選択",
  error: true,
  errorMessage: "果物を選択してください",
};

export const Disabled: Story<Select2Props<string>> = Template.bind({});
Disabled.args = {
  options,
  label: "お好きな果物",
  placeholder: "果物を選択",
  disabled: true,
};

export const WithDefaultValue: Story<Select2Props<string>> = Template.bind({});
WithDefaultValue.args = {
  options,
  value: "apple",
  label: "お好きな果物",
};

export const WithSearch: Story<Select2Props<string>> = Template.bind({});
WithSearch.args = {
  options,
  label: "お好きな果物",
  placeholder: "果物を選択",
  searchable: true,
  searchPlaceholder: "果物を検索...",
};

export const Small: Story<Select2Props<string>> = Template.bind({});
Small.args = {
  options,
  label: "お好きな果物",
  placeholder: "果物を選択",
  size: "small",
};

export const Medium: Story<Select2Props<string>> = Template.bind({});
Medium.args = {
  options,
  label: "お好きな果物",
  placeholder: "果物を選択",
  size: "medium",
};

export const Large: Story<Select2Props<string>> = Template.bind({});
Large.args = {
  options,
  label: "お好きな果物",
  placeholder: "果物を選択",
  size: "large",
};

export const LightVariant: Story<Select2Props<string>> = Template.bind({});
LightVariant.args = {
  options,
  label: "お好きな果物",
  placeholder: "果物を選択",
  variant: "light",
};

export const WithManyOptions: Story<Select2Props<string>> = Template.bind({});
WithManyOptions.args = {
  options: [
    ...options,
    { value: "watermelon", label: "スイカ" },
    { value: "lemon", label: "レモン" },
    { value: "lime", label: "ライム" },
    { value: "cherry", label: "さくらんぼ" },
    { value: "blueberry", label: "ブルーベリー" },
    { value: "raspberry", label: "ラズベリー" },
    { value: "blackberry", label: "ブラックベリー" },
    { value: "plum", label: "プラム" },
    { value: "persimmon", label: "柿" },
    { value: "fig", label: "イチジク" },
  ],
  label: "お好きな果物",
  placeholder: "果物を選択",
  searchable: true,
  maxMenuHeight: 200,
};

export const WithDisabledOptions: Story<Select2Props<string>> = Template.bind({});
WithDisabledOptions.args = {
  options: [
    { value: "apple", label: "りんご" },
    { value: "banana", label: "バナナ", disabled: true },
    { value: "orange", label: "オレンジ" },
    { value: "grape", label: "ブドウ", disabled: true },
    { value: "melon", label: "メロン" },
  ],
  label: "お好きな果物",
  placeholder: "果物を選択",
}; 