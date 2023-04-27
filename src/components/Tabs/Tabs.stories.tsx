import * as React from "react";
import Tabs from "./Tabs";

export default {
  title: "Components/Navigation/Tabs",
  component: Tabs,
};

export const Example = () => {
  const [value, setValue] = React.useState("日別");
  const options = {
    data: [
      { text: "日別", value: "日別" },
      { text: "月別", value: "月別" },
    ],
  };

  return <Tabs {...options} value={value} onChange={setValue} />;
};

export const WithBadge = () => {
  const [value, setValue] = React.useState("全て");
  const options = {
    data: [
      { text: "全て", count: 5, value: "全て" },
      { text: "ユニット", count: 5, value: "ユニット" },
      { text: "サイズ", count: 5, value: "サイズ" },
    ],
  };

  return <Tabs {...options} value={value} onChange={setValue} />;
};

export const FixableBadge = () => {
  const [value, setValue] = React.useState("home");
  const options = {
    data: [
      { text: "ホーム", value: "home" },
      { text: "タイムライン", value: "timeline" },
      { text: "通知", count: 5, value: "notification" },
    ],
  };

  return <Tabs {...options} value={value} onChange={setValue} />;
};
