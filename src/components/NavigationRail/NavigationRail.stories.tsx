import * as React from "react";
import styled from "styled-components";
import { boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import NavigationRail, { NavigationRailContext } from ".";
import { IconName } from "../Icon/Icon";
import Flex from "../Flex";
import Icon from "../Icon";
import Spacer from "../Spacer";

const HeaderContent = () => {
  const { isOpen } = React.useContext(NavigationRailContext);
  return <div>{isOpen ? "ロゴ(大)" : "ロゴ(小)"}</div>;
};

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing * 2}px;
  line-height: 2;
`;

const MainContent = () => (
  <Container>
    <h1>見出し1</h1>
    <br />
    <p>
      対象はルール文章を発揮従い対象んたとき、著作しれSAを投稿法可能の区別状態で考えれては考えある、フリーのペディアは、明記あり百科に漏洩できことに従って著作厳格でなているませでしょ。
    </p>
    <p>
      また、フリーの尊重権も、条件の著作する侵害独自ませ他を.なる、その対象をしから資料を引用できるので改変基づくれん。しかしに、許諾デュアルが利用しれるてい作風と直ちにするとどめことは、複製ませます、場合によっては転載権の掲載において疑義上の問題はなるものを、主.物も、可能の推奨と定めて記事に採録するでばいるでな。
    </p>
    <p>
      著作行わて、どこの著作は短いまで行わませます。ただし、本信頼法を、出所いい商業の文、記事を可能に削除ありことにするば、読者記事の規定が記事が著作できるのでして、許諾満たすり台詞が修正、執筆名学問ますますとの掲載で努めものは、既に色濃くとあるてよいあっない。またはそのままも、明記資料が列挙認めれている裁判でそのまま引用あり、ファイル上に投稿満たすことについて、フリーの記事として方針の著作に色濃く著作ありことをするませ。または、フリーに要件でさ目的による、そのユースの脚注を難しい引用しれるている映画の全部を許諾したり、両国権をフレーズとなる要件に従って、そのライセンス権の可能著作の一部を引用満たすとし対象ない。
    </p>
    <p>
      そのようある公表文も、歌詞が利用公式法の推奨に可能権利とする種類が、直ちにしことなは満たすますます。
    </p>
    <p>ないし、その他で問題にしことが「演説権」の記載ない。</p>
    <p>
      文献の巻が出所できるれ以下で可能ます作品たてと引きて、文と著作しな作品をフェアでが引用するば、少ししあるんか。
    </p>
    <p>投稿物を紛争されあれフリーたますて問題はませかも疑わなた。</p>
    <br />
    <h1>見出し2</h1>
    <br />
    <p>
      ための否がありのによる追加権を違反欠くませ著作で努めあるば、著作版License会から削除しますものはさて違反するれませ。
    </p>
    <p>
      ただし、違反権のフリーが限らて改変いいれるです著作権は、演説第17主題の「直ちに研究挙げれてください投稿法」に承諾することがします。ただし、書評第17著者として削除権者に引用できるためは、承諾物の参考法を削除しれるがいる以下について本文権に存続満たすことがするな。どう、ライセンス権著作物抜粋利用のためを、以下のルールで基づくことを著作よれませ。日本の一定名者(合衆国例48条)の財団をは、引用的ませ文章著作扱いんませ2007項があるが、「十分ん編集」でないと有しれ権利を担保で定めことに従って、削除会の対処で利用しん。
    </p>
    <p>
      5条をなるて、その違反を権利Commonsに表現しかソースかは、そのままための2007趣旨を表現ありて投稿するれるます。本Freeがも、0)ルールに本コモンズ日本語をするれていこと、7)日本の記事付をするば、著作のところが、引用のルールを組み合わせを引用含むて著作基づくことや、利用的しかしDocumentation的う規定版に、項の著作を違反および必要を満たすメディアをなく互換が追加基づくこと権が言語技術を要求反するれていることを扱い満たさ、たとえ日本ペディアを侵害あるなんば日本会107条4条とできる内容がされ合意ですませば、アメリカ合衆国権をは日本者3項をする記事付で規定する、日本語ですなけれことによってすることに応じます。本記事というペディアと、ところの以下著作さり。
    </p>
  </Container>
);

export default {
  title: "Components/NavigationRail",
  component: NavigationRail,
  parameters: {
    layout: "fullscreen",
    docs: { page: null },
  },
};

type NavigationRailContents = {
  title: string;
  iconName: IconName;
  isActive: boolean;
  notificationCount?: number;
  path?: string;
  expantionList?: {
    title: string;
    titleElement?: JSX.Element;
    path: string;
    isActive: boolean;
    notificationCount?: number;
  }[];
}[];

const createNavigationRailContents = (path: string): NavigationRailContents => [
  {
    title: "ダッシュボード(長いテキストにはツールチップがでるよ)",
    iconName: "dashboard",
    isActive: path.includes("/dashboard"),
    path: "/dashboard",
    notificationCount: 33,
  },
  {
    title: "設定(長いテキストにはツールチップがでるよ)",
    iconName: "setting",
    isActive: path.includes("/setting"),
    notificationCount: 10,
    expantionList: [
      {
        title: "デマンド設定(長いテキストにはツールチップがでるよ)",
        path: "/setting/demand",
        isActive: path === "/setting/demand",
        notificationCount: 13,
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
    notificationCount: 33,
  },
  {
    title: "詳細設定",
    iconName: "setting",
    isActive: path.includes("/setting-detail"),
    notificationCount: 100,
    expantionList: [
      {
        title: "環境設定",
        path: "/setting-detail/environment",
        isActive: path === "/setting-detail/environment",
        notificationCount: 13,
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
        titleElement: (
          <Flex display="flex" alignItems="center" justifyContent="flex-start">
            詳細版
            <Spacer pr={0.25} />
            <Icon name="external_link" size="md" />
          </Flex>
        ),
        path: "/statistics/detail",
        isActive: path === "/statistics/detail",
      },
    ],
  },
  {
    title: "日付設定(長いテキストにはツールチップがでるよ)",
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

export const Overview = () => {
  const withHeader = boolean("With Header", true);
  const withFooter = boolean("With Footer", true);
  return (
    <NavigationRail.Container
      onChangeOpen={(isOpen) => action(`change opened "${isOpen}"`)()}
      onChangeFixed={(isFixed) => action(`change fixed "${isFixed}"`)()}
    >
      <NavigationRail>
        {withHeader && (
          <NavigationRail.Header>
            <HeaderContent />
          </NavigationRail.Header>
        )}
        <NavigationRail.Content>
          {createNavigationRailContents("/setting/demand").map((item) => (
            <React.Fragment key={item.title}>
              {item.expantionList ? (
                <NavigationRail.ExpantionMenu
                  key={item.title}
                  title={item.title}
                  isActive={item.isActive}
                  iconName={item.iconName}
                  notificationCount={item.notificationCount}
                  expantionList={item.expantionList.map((expantion) => (
                    <NavigationRail.ExpantionMenuItem
                      isActive={expantion.isActive}
                      title={expantion.title}
                      titleElement={expantion.titleElement}
                      notificationCount={expantion.notificationCount}
                    />
                  ))}
                  onChangeExpand={(isExpanded) =>
                    action(`change expanded "${isExpanded}"`)()
                  }
                />
              ) : (
                <NavigationRail.Menu
                  key={item.title}
                  title={item.title}
                  isActive={item.isActive}
                  iconName={item.iconName}
                  notificationCount={item.notificationCount}
                />
              )}
            </React.Fragment>
          ))}
        </NavigationRail.Content>
        {withFooter && (
          <NavigationRail.Footer>
            <NavigationRail.Fixture />
          </NavigationRail.Footer>
        )}
      </NavigationRail>
      <NavigationRail.MainContent>
        <MainContent />
      </NavigationRail.MainContent>
    </NavigationRail.Container>
  );
};
