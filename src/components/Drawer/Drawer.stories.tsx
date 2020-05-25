import * as React from "react";
import Drawer, {
  DrawerHeader,
  DrawerContainer,
  DrawerContent,
  DrawerExpantionMenu,
  DrawerExpantionMenuItem,
  DrawerMainContent,
  DrawerMenu,
  DrawerFooter,
  DrawerFixture,
} from "./";
import { IconName } from "../Icon/Icon";

export default {
  title: "Drawer",
  parameters: {
    component: Drawer,
  },
};

type DrawerContents = {
  title: string;
  iconName: IconName;
  isActive: boolean;
  path?: string;
  expantionList?: {
    title: string;
    path: string;
    isActive: boolean;
  }[];
}[];

const createDrawerContents = (path: string): DrawerContents => [
  {
    title: "ダッシュボード(長いテキストにはツールチップがでるよ)",
    iconName: "dashboard",
    isActive: path.includes("/dashboard"),
    path: "/dashboard",
  },
  {
    title: "設定(長いテキストにはツールチップがでるよ)",
    iconName: "setting",
    isActive: path.includes("/setting"),
    expantionList: [
      {
        title: "デマンド設定(長いテキストにはツールチップがでるよ)",
        path: "/setting/demand",
        isActive: path === "/setting/demand",
      },
      {
        title: "デマンド設定(長いテキストにはツールチップがでるよ)",
        path: "/setting/demand-creative",
        isActive: path === "/setting/creative",
      },
    ],
  },
  {
    title: "詳細レポート",
    iconName: "bar_chart",
    isActive: path.includes("/detail_report"),
    path: "detail-report",
  },
  {
    title: "詳細設定",
    iconName: "setting",
    isActive: path.includes("/setting-detail"),
    expantionList: [
      {
        title: "環境設定",
        path: "/setting-detail/environment",
        isActive: path === "/setting-detail/environment",
      },
      {
        title: "ユーザー設定",
        path: "/setting-detail/user",
        isActive: path === "/setting-detail/user",
      },
    ],
  },
  {
    title: "統計情報",
    iconName: "bar_chart",
    isActive: path.includes("/statistics"),
    expantionList: [
      {
        title: "簡易版",
        path: "/statistics/summary",
        isActive: path === "/statistics/summary",
      },
      {
        title: "詳細版",
        path: "/statistics/detail",
        isActive: path === "/statistics/detail",
      },
    ],
  },
  {
    title: "日付設定",
    iconName: "date_range",
    isActive: path.includes("/setting-date"),
    path: "setting-date",
  },
  {
    title: "ヘルプ",
    iconName: "question",
    isActive: path.includes("/help"),
    path: "help",
  },
  {
    title: "検索",
    iconName: "search",
    isActive: path.includes("/search"),
    path: "search",
  },
  {
    title: "フォルダ",
    iconName: "folder",
    isActive: path.includes("/folder"),
    path: "folder",
  },
  {
    title: "デスクトップ",
    iconName: "desktop",
    isActive: path.includes("/desktop"),
    path: "desktop",
  },
  {
    title: "追加",
    iconName: "add_line",
    isActive: path.includes("/add"),
    path: "add",
  },
  {
    title: "モバイル",
    iconName: "mobile",
    isActive: path.includes("/mobile"),
    path: "mobile",
  },
  {
    title: "コピー",
    iconName: "copy",
    isActive: path.includes("/copy"),
    path: "copy",
  },
];

export const Overview = () => (
  <DrawerContainer>
    <Drawer>
      <DrawerHeader>ここにロゴとかが入るよ</DrawerHeader>
      <DrawerContent>
        {createDrawerContents("/setting/demand").map((item) => (
          <React.Fragment key={item.title}>
            {item.expantionList ? (
              <DrawerExpantionMenu
                key={item.title}
                title={item.title}
                isActive={item.isActive}
                iconName={item.iconName}
                expantionList={item.expantionList.map((expantion) => (
                  <DrawerExpantionMenuItem
                    isActive={expantion.isActive}
                    title={expantion.title}
                  />
                ))}
              />
            ) : (
              <DrawerMenu
                key={item.title}
                title={item.title}
                isActive={item.isActive}
                iconName={item.iconName}
              />
            )}
          </React.Fragment>
        ))}
      </DrawerContent>
      <DrawerFooter>
        <DrawerFixture />
      </DrawerFooter>
    </Drawer>
    <DrawerMainContent>hogehoge</DrawerMainContent>
  </DrawerContainer>
);
