import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import Banner from "./Banner";
import { BannerProps } from "./types";
import Flex from "../Flex";
import Typography from "../Typography";
import Button from "../Button";

export default {
  title: "Components/Feedback/Banner",
  component: Banner,
  parameters: {
    docs: {
      description: {
        component:
          "バナーは、コンテキストに関連するメッセージを表示するためのコンポーネントです。" +
          "タイプに応じて適切なアクセシビリティ属性（role、aria-live）が自動的に設定されます。" +
          'Info: role="status", aria-live="polite"' +
          'Warning: role="alert", aria-live="polite"' +
          'Error: role="alert", aria-live="assertive"',
      },
    },
  },
  argTypes: {
    type: {
      description: "バナーのタイプ（info, warning, error）",
      control: { type: "select", options: ["info", "warning", "error"] },
      table: {
        type: { summary: "BannerType" },
        defaultValue: { summary: "info" },
      },
    },
    size: {
      description: "バナーのサイズ（small, medium）",
      control: { type: "select", options: ["small", "medium"] },
      table: {
        type: { summary: "BannerSize" },
        defaultValue: { summary: "medium" },
      },
    },
    message: {
      description: "バナーに表示するメッセージ（childrenより優先されます）",
      control: { type: "text" },
    },
    children: {
      description: "バナーの内容（messageが指定されている場合は無視されます）",
    },
    className: {
      description: "追加のCSSクラス",
    },
    closable: {
      description:
        "閉じるボタンを表示するかどうか（ConfirmModalと同様のスタイル）",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onClose: {
      description: "閉じるボタンがクリックされたときのコールバック関数",
      action: "閉じるボタンがクリックされました",
    },
  },
};

const Template: StoryObj<BannerProps> = {
  render: (args) => <Banner {...args} />,
};

export const Info: StoryObj<BannerProps> = {
  ...Template,
  args: {
    type: "info",
    message: "これは情報バナーです。ユーザーに情報を提供します。",
  },
};

export const Warning: StoryObj<BannerProps> = {
  ...Template,
  args: {
    type: "warning",
    message: "これは警告バナーです。注意が必要な情報を提供します。",
  },
};

export const Error: StoryObj<BannerProps> = {
  ...Template,
  args: {
    type: "error",
    message: "これはエラーバナーです。エラーが発生したことを示します。",
  },
};

export const Small: StoryObj<BannerProps> = {
  ...Template,
  args: {
    type: "info",
    size: "small",
    message: "これは小さいサイズのバナーです。",
  },
};

export const Medium: StoryObj<BannerProps> = {
  ...Template,
  args: {
    type: "info",
    size: "medium",
    message: "これは中サイズのバナーです。デフォルトサイズです。",
  },
};

export const Closable: StoryObj<BannerProps> = {
  ...Template,
  args: {
    type: "info",
    message:
      "これは閉じることができるバナーです。右側の×ボタンをクリックしてください。",
    closable: true,
  },
};

export const ClosableDemo: StoryObj = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [visible, setVisible] = useState(true);

    const handleClose = () => {
      setVisible(false);
    };

    const handleReset = () => {
      setVisible(true);
    };

    return (
      <Flex display="flex" flexDirection="column" gap={2}>
        {visible ? (
          <Banner
            closable
            type="warning"
            message="これは閉じることができるバナーです。右側の×ボタンをクリックすると非表示になります。"
            onClose={handleClose}
          />
        ) : (
          <Button onClick={handleReset}>バナーを再表示</Button>
        )}
      </Flex>
    );
  },
};

export const WithImage: StoryObj<BannerProps> = {
  render: () => (
    <Banner closable type="info">
      <Flex display="flex" alignItems="center" gap={2}>
        <img
          src="https://placehold.jp/3d4070/ffffff/50x50.png"
          alt="サンプル画像"
          style={{ borderRadius: "4px" }}
        />
        <Typography>
          画像付きバナーの例です。任意のコンテンツを配置できます。
        </Typography>
      </Flex>
    </Banner>
  ),
};

export const RichContent: StoryObj<BannerProps> = {
  render: () => (
    <Banner closable type="warning">
      <Flex display="flex" flexDirection="column" gap={1}>
        <Typography size="lg" weight="bold">
          重要なお知らせ
        </Typography>
        <Typography>
          複数行のリッチなコンテンツを配置できます。レイアウトも自由に調整可能です。
        </Typography>
        <Flex display="flex" gap={1} alignItems="center">
          <span
            style={{
              textDecoration: "underline",
              cursor: "pointer",
              color: "inherit",
            }}
          >
            詳細を見る
          </span>
          <span>|</span>
          <span
            style={{
              textDecoration: "underline",
              cursor: "pointer",
              color: "inherit",
            }}
          >
            閉じる
          </span>
        </Flex>
      </Flex>
    </Banner>
  ),
};

export const AllVariants: StoryObj = {
  render: () => (
    <Flex display="flex" flexDirection="column" gap={2}>
      <Banner type="info" message="情報バナー" />
      <Banner type="warning" message="警告バナー" />
      <Banner type="error" message="エラーバナー" />
      <Banner type="info" size="small" message="小サイズのバナー" />
      <Banner type="warning" size="small" message="小サイズの警告バナー" />
      <Banner type="error" size="small" message="小サイズのエラーバナー" />
      <Banner closable type="info" message="閉じることができるバナー" />
      <Banner closable type="warning" message="閉じることができる警告バナー" />
      <Banner closable type="error" message="閉じることができるエラーバナー" />
    </Flex>
  ),
};
