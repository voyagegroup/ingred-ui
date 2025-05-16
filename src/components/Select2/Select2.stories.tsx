import React, { useState } from "react";
import { Story, Meta } from "@storybook/react";
import { Select2 } from "./Select2";
import { Select2Option } from "./Select2Option";
import { Select2Props, Select2Option as Select2OptionType } from "./types";
import { Select2OptionGroup } from "./Select2OptionGroup";
import { Select2Separator } from "./Select2Separator";

export default {
  title: "Components/Inputs/Select2",
  component: Select2,
  parameters: {
    docs: {
      description: {
        component: `
選択肢の中から項目を選択するコンポーネントです。
検索機能（オプション）付きのセレクトボックスです。
単一選択と複数選択の両方に対応しています。
        `,
      },
    },
  },
  argTypes: {
    size: {
      options: ["small", "medium", "large"],
      control: { type: "select" },
      description: "コンポーネントのサイズ",
      table: {
        defaultValue: { summary: "medium" },
      },
    },
    variant: {
      options: ["light", "dark"],
      control: { type: "select" },
      description: "コンポーネントのバリアント",
      table: {
        defaultValue: { summary: "light" },
      },
    },
    disabled: {
      options: [true, false],
      control: { type: "radio" },
      description: "無効状態",
      table: {
        defaultValue: { summary: false },
      },
    },
    error: {
      options: [true, false],
      control: { type: "radio" },
      description: "エラー状態",
      table: {
        defaultValue: { summary: false },
      },
    },
    searchable: {
      options: [true, false],
      control: { type: "radio" },
      description: "検索機能の有効/無効",
      table: {
        defaultValue: { summary: false },
      },
    },
  },
} as Meta<typeof Select2>;

const options: Select2OptionType[] = [
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

const Template: Story<Select2Props> = (args) => {
  let defaultValue: string | number | (string | number)[] = "";
  if (args.value !== undefined) {
    defaultValue = args.value;
  } else if (args.multiple) {
    defaultValue = [];
  }

  const [value, setValue] = useState<string | number | (string | number)[]>(
    defaultValue,
  );

  return (
    <div style={{ width: "300px" }}>
      <Select2
        {...args}
        value={value}
        onChange={(newValue: string | number | (string | number)[]) =>
          setValue(newValue)
        }
      />
    </div>
  );
};

export const Basic: Story<Select2Props> = Template.bind({});
Basic.args = {
  options,
  placeholder: "果物を選択",
  searchable: false,
};

export const WithSearch: Story<Select2Props> = Template.bind({});
WithSearch.args = {
  options,
  placeholder: "果物を選択",
  searchable: true,
  searchPlaceholder: "果物を検索",
};
WithSearch.parameters = {
  docs: {
    description: {
      story: `
検索機能を有効にした例です。
searchable={true}を指定することで、オプションを検索できる入力欄が表示されます。
searchPlaceholderで検索入力欄のプレースホルダーを指定できます。
      `,
    },
  },
};

export const Error: Story<Select2Props> = Template.bind({});
Error.args = {
  options,
  placeholder: "果物を選択",
  error: true,
};
Error.parameters = {
  docs: {
    description: {
      story:
        "エラー状態を表示するためのオプションです。エラーメッセージはコンポーネント側では表示されないので、必要に応じてプロダクト側で別途エラーメッセージを実装してください。",
    },
  },
};

export const Disabled: Story<Select2Props> = Template.bind({});
Disabled.args = {
  options,
  placeholder: "果物を選択",
  disabled: true,
};

export const WithDefaultValue: Story<Select2Props> = Template.bind({});
WithDefaultValue.args = {
  options,
  value: "apple",
};

export const WithManyOptions: Story<Select2Props> = Template.bind({});
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
  placeholder: "果物を選択",
};

export const WithDisabledOptions: Story<Select2Props> = Template.bind({});
WithDisabledOptions.args = {
  options: [
    { value: "apple", label: "りんご" },
    { value: "banana", label: "バナナ", disabled: true },
    { value: "orange", label: "オレンジ" },
    { value: "grape", label: "ブドウ", disabled: true },
    { value: "melon", label: "メロン" },
  ],
  placeholder: "果物を選択",
};

export const MultipleSelection: Story<Select2Props> = (args) => {
  const [selectedValues, setSelectedValues] = useState<(string | number)[]>([
    "apple",
    "orange",
  ]);

  return (
    <div style={{ width: "300px" }}>
      <Select2
        {...args}
        multiple={true}
        value={selectedValues}
        onChange={(newValues: string | number | (string | number)[]) => {
          if (Array.isArray(newValues)) {
            setSelectedValues(newValues);
          }
        }}
      />
      <div style={{ marginTop: "16px" }}>
        <p>選択された値: {selectedValues.join(", ")}</p>
      </div>
    </div>
  );
};
MultipleSelection.args = {
  options,
  placeholder: "果物を選択（複数可）",
  searchable: false,
  applyButtonText: "適用",
  cancelButtonText: "キャンセル",
};
MultipleSelection.parameters = {
  docs: {
    description: {
      story: `
複数選択モード（multiple={true}）では、複数の選択肢を選択できます。
選択はContextMenu内で一時的に保持され、「適用」ボタンをクリックすると確定されます。
選択済みの項目はタグとして表示され、タグの削除ボタンをクリックすると選択を解除できます。
      `,
    },
  },
};

export const MultipleSelectionWithSearch: Story<Select2Props> = (args) => {
  const [selectedValues, setSelectedValues] = useState<(string | number)[]>([
    "apple",
    "orange",
  ]);

  return (
    <div style={{ width: "300px" }}>
      <Select2
        {...args}
        multiple={true}
        value={selectedValues}
        onChange={(newValues: string | number | (string | number)[]) => {
          if (Array.isArray(newValues)) {
            setSelectedValues(newValues);
          }
        }}
      />
      <div style={{ marginTop: "16px" }}>
        <p>選択された値: {selectedValues.join(", ")}</p>
      </div>
    </div>
  );
};
MultipleSelectionWithSearch.args = {
  options,
  placeholder: "果物を選択（複数可）",
  searchable: true,
  searchPlaceholder: "果物を検索",
  applyButtonText: "適用",
  cancelButtonText: "キャンセル",
};
MultipleSelectionWithSearch.parameters = {
  docs: {
    description: {
      story: `
複数選択モードと検索機能を組み合わせた例です。
多くの選択肢から複数の項目を選択する場合に特に有用です。
      `,
    },
  },
};

// 宣言的APIの例
export const WithDeclarativeAPI = () => {
  const [value, setValue] = useState<string | number>("");

  // フルーツのオプション
  const fruitOptions = [
    { value: "apple", label: "りんご" },
    { value: "orange", label: "オレンジ" },
    { value: "banana", label: "バナナ" },
    { value: "grape", label: "ブドウ" },
    { value: "melon", label: "メロン" },
  ];

  // 野菜のオプション
  const vegetableOptions = [
    { value: "carrot", label: "にんじん" },
    { value: "potato", label: "じゃがいも" },
    { value: "lettuce", label: "レタス" },
    { value: "tomato", label: "トマト" },
    { value: "cucumber", label: "きゅうり" },
  ];

  // 肉類のオプション
  const meatOptions = [
    { value: "beef", label: "牛肉" },
    { value: "pork", label: "豚肉" },
    { value: "chicken", label: "鶏肉" },
  ];

  return (
    <div style={{ width: "300px" }}>
      <Select2
        options={[]} // 子要素を使う場合はoptionsは空配列でOK
        placeholder="食材を選択"
        searchable={true}
        searchPlaceholder="検索..."
        value={value}
        onChange={(newValue: any) => setValue(newValue as string | number)}
      >
        <Select2OptionGroup label="果物">
          {fruitOptions.map((option) => (
            <Select2Option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </Select2Option>
          ))}
        </Select2OptionGroup>

        <Select2OptionGroup label="野菜">
          {vegetableOptions.map((option) => (
            <Select2Option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </Select2Option>
          ))}
        </Select2OptionGroup>

        <Select2Separator />

        <Select2OptionGroup label="肉類">
          {meatOptions.map((option) => (
            <Select2Option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </Select2Option>
          ))}
        </Select2OptionGroup>
      </Select2>
      <div style={{ marginTop: "16px" }}>
        <p>選択された値: {value}</p>
      </div>
    </div>
  );
};
WithDeclarativeAPI.parameters = {
  docs: {
    description: {
      story: `
Select2OptionGroupコンポーネントとSelect2Separatorコンポーネントを使用した例です。
Select2OptionGroupはオプションをグループ化し、各グループにラベルを付けることができます。
Select2Separatorはグループ間にセパレータを追加します。
      `,
    },
  },
};

// 宣言的APIを使用した複数選択の例
export const WithDeclarativeAPIMultiple = () => {
  const [values, setValues] = useState<(string | number)[]>([
    "apple",
    "potato",
  ]);

  // フルーツのオプション
  const fruitOptions = [
    { value: "apple", label: "りんご" },
    { value: "orange", label: "オレンジ" },
    { value: "banana", label: "バナナ" },
    { value: "grape", label: "ブドウ" },
    { value: "melon", label: "メロン" },
  ];

  // 野菜のオプション
  const vegetableOptions = [
    { value: "carrot", label: "にんじん" },
    { value: "potato", label: "じゃがいも" },
    { value: "lettuce", label: "レタス" },
    { value: "tomato", label: "トマト" },
    { value: "cucumber", label: "きゅうり" },
  ];

  // 肉類のオプション
  const meatOptions = [
    { value: "beef", label: "牛肉" },
    { value: "pork", label: "豚肉" },
    { value: "chicken", label: "鶏肉" },
  ];

  return (
    <div style={{ width: "300px" }}>
      <Select2
        options={[]} // 子要素を使う場合はoptionsは空配列でOK
        placeholder="食材を選択（複数可）"
        searchable={true}
        searchPlaceholder="検索..."
        multiple={true}
        value={values}
        applyButtonText="適用"
        cancelButtonText="キャンセル"
        onChange={(newValues: any) => {
          if (Array.isArray(newValues)) {
            setValues(newValues);
          }
        }}
      >
        <Select2OptionGroup label="果物">
          {fruitOptions.map((option) => (
            <Select2Option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </Select2Option>
          ))}
        </Select2OptionGroup>

        <Select2OptionGroup label="野菜">
          {vegetableOptions.map((option) => (
            <Select2Option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </Select2Option>
          ))}
        </Select2OptionGroup>

        <Select2OptionGroup label="肉類">
          {meatOptions.map((option) => (
            <Select2Option
              key={option.value}
              value={option.value}
              disabled={option.value === "beef"}
            >
              {option.label}
            </Select2Option>
          ))}
        </Select2OptionGroup>
      </Select2>
      <div style={{ marginTop: "16px" }}>
        <p>選択された値: {values.join(", ")}</p>
      </div>
    </div>
  );
};
WithDeclarativeAPIMultiple.parameters = {
  docs: {
    description: {
      story: `
Select2OptionGroupコンポーネントとSelect2Separatorコンポーネントを使用した複数選択の例です。
Select2OptionGroupはオプションをグループ化し、各グループにラベルを付けることができます。
Select2Separatorはグループ間にセパレータを追加します。
複数選択モード（multiple={true}）と組み合わせることで、グループ化された選択肢から複数の項目を選択できます。
選択済みの項目はタグとして表示され、タグの削除ボタンをクリックすると選択を解除できます。
      `,
    },
  },
};
