import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import Drawer from "..";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

describe("Drawer component testing", () => {
  afterEach(cleanup);

  test("Drawer", () => {
    const { asFragment } = renderWithThemeProvider(
      <Drawer.Container>
        <Drawer>
          <Drawer.Header>ここにロゴとかが入るよ</Drawer.Header>
          <Drawer.Content>
            <Drawer.ExpantionMenu
              title="設定"
              isActive={true}
              iconName="setting"
              expantionList={[
                <Drawer.ExpantionMenuItem
                  isActive={true}
                  title="デマンド設定"
                />,
              ]}
            />
            <Drawer.Menu
              title="ダッシュボード"
              isActive={false}
              iconName="dashboard"
            />
          </Drawer.Content>
          <Drawer.Footer>
            <Drawer.Fixture />
          </Drawer.Footer>
        </Drawer>
        <Drawer.MainContent>hogehoge</Drawer.MainContent>
      </Drawer.Container>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
