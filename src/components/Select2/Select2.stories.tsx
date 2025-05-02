import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Select2 } from "./Select2";
import { Select2Option, Select2Props } from "./types";

const meta = {
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
        defaultValue: { summary: "false" },
      },
    },
    error: {
      options: [true, false],
      control: { type: "radio" },
      description: "エラー状態",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    searchable: {
      options: [true, false],
      control: { type: "radio" },
      description: "検索機能の有効/無効",
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
} satisfies Meta<typeof Select2>;

export default meta;

// StoryObj型をPartial<Select2Props>に変更して、必須プロパティのチェックを回避
type Story = StoryObj<Partial<Select2Props>>;

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

// 単一選択用のレンダー関数
const Template = (args: any) => {
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

export const Basic: Story = {
  args: {
    options,
    placeholder: "果物を選択",
    searchable: false,
  },
  render: (args) =>
    Template({
      ...args,
      options,
      placeholder: "果物を選択",
      searchable: false,
    }),
};

export const WithSearch: Story = {
  args: {
    options,
    placeholder: "果物を選択",
    searchable: true,
    searchPlaceholder: "果物を検索",
  },
  parameters: {
    docs: {
      description: {
        story: `
検索機能を有効にした例です。
searchable={true}を指定することで、オプションを検索できる入力欄が表示されます。
searchPlaceholderで検索入力欄のプレースホルダーを指定できます。
      `,
      },
    },
  },
  render: (args) => Template(args),
};

export const Error: Story = {
  args: {
    options,
    placeholder: "果物を選択",
    error: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "エラー状態を表示するためのオプションです。エラーメッセージはコンポーネント側では表示されないので、必要に応じてプロダクト側で別途エラーメッセージを実装してください。",
      },
    },
  },
  render: (args) => Template(args),
};

export const Disabled: Story = {
  args: {
    options,
    placeholder: "果物を選択",
    disabled: true,
  },
  render: (args) => Template(args),
};

export const WithDefaultValue: Story = {
  args: {
    options,
    value: "apple",
  },
  render: (args) => Template(args),
};

export const WithManyOptions: Story = {
  args: {
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
  },
  render: (args) => Template(args),
};

export const WithDisabledOptions: Story = {
  args: {
    options: [
      { value: "apple", label: "りんご" },
      { value: "banana", label: "バナナ", disabled: true },
      { value: "orange", label: "オレンジ" },
      { value: "grape", label: "ブドウ", disabled: true },
      { value: "melon", label: "メロン" },
    ],
    placeholder: "果物を選択",
  },
  render: (args) => Template(args),
};

export const MultipleSelection: Story = {
  args: {
    options,
    placeholder: "果物を選択（複数可）",
    searchable: false,
    applyButtonText: "適用",
    cancelButtonText: "キャンセル",
    multiple: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
複数選択モード（multiple={true}）では、複数の選択肢を選択できます。
選択はContextMenu内で一時的に保持され、「適用」ボタンをクリックすると確定されます。
選択済みの項目はタグとして表示され、タグの削除ボタンをクリックすると選択を解除できます。
      `,
      },
    },
  },
  render: (args) => {
    const [selectedValues, setSelectedValues] = useState<(string | number)[]>([
      "apple",
      "orange",
    ]);

    // argsからoptionsを抽出、存在しない場合はデフォルトのoptionsを使用
    const optionsToUse = args.options || options;

    return (
      <div style={{ width: "300px" }}>
        <Select2
          {...args}
          options={optionsToUse}
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
  },
};

export const MultipleSelectionWithSearch: Story = {
  args: {
    options,
    placeholder: "果物を選択（複数可）",
    searchable: true,
    searchPlaceholder: "果物を検索",
    applyButtonText: "適用",
    cancelButtonText: "キャンセル",
    multiple: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
複数選択モードと検索機能を組み合わせた例です。
多くの選択肢から複数の項目を選択する場合に特に有用です。
      `,
      },
    },
  },
  render: (args) => {
    const [selectedValues, setSelectedValues] = useState<(string | number)[]>([
      "apple",
      "orange",
    ]);

    // argsからoptionsを抽出、存在しない場合はデフォルトのoptionsを使用
    const optionsToUse = args.options || options;

    return (
      <div style={{ width: "300px" }}>
        <Select2
          {...args}
          options={optionsToUse}
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
  },
};
