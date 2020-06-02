import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import Drawer, {
  DrawerContainer,
  DrawerContent,
  DrawerHeader,
  DrawerExpantionMenu,
  DrawerExpantionMenuItem,
  DrawerMenu,
  DrawerFooter,
  DrawerFixture,
  DrawerMainContent,
} from "..";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

jest.mock("react-dom", () => {
  const original = jest.requireActual("react-dom");
  return {
    ...original,
    createPortal: (node: any) => node,
  };
});

describe("Drawer component testing", () => {
  afterEach(cleanup);

  test("Drawer", () => {
    const { asFragment } = renderWithThemeProvider(
      <DrawerContainer>
        <Drawer>
          <DrawerHeader>ここにロゴとかが入るよ</DrawerHeader>
          <DrawerContent>
            <DrawerExpantionMenu
              title="設定"
              isActive={true}
              iconName="setting"
              expantionList={[
                <DrawerExpantionMenuItem
                  isActive={true}
                  title="デマンド設定"
                />,
              ]}
            />
            <DrawerMenu
              title="ダッシュボード"
              isActive={false}
              iconName="dashboard"
            />
          </DrawerContent>
          <DrawerFooter>
            <DrawerFixture />
          </DrawerFooter>
        </Drawer>
        <DrawerMainContent>hogehoge</DrawerMainContent>
      </DrawerContainer>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
