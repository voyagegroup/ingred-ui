import * as React from "react";
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import NavigationRail from "..";
import { renderWithThemeProvider } from "../../../utils/renderWithThemeProvider";

// Mock window.matchMedia for useMediaQuery hook
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe("NavigationRail component testing", () => {
  afterEach(cleanup);

  test("NavigationRail", () => {
    const { asFragment } = renderWithThemeProvider(
      <NavigationRail.Container>
        <NavigationRail>
          <NavigationRail.Header>Add logo here</NavigationRail.Header>
          <NavigationRail.Content>
            <NavigationRail.ExpansionMenu
              title="Settings"
              isActive={true}
              iconName="setting"
              expansionList={[
                <NavigationRail.ExpansionMenuItem
                  isActive={true}
                  title="Account Setting"
                />,
              ]}
            />
            <NavigationRail.Menu
              title="Dashboard"
              isActive={false}
              iconName="dashboard"
            />
          </NavigationRail.Content>
          <NavigationRail.Footer>
            <NavigationRail.Fixture />
          </NavigationRail.Footer>
        </NavigationRail>
        <NavigationRail.MainContent>hogehoge</NavigationRail.MainContent>
      </NavigationRail.Container>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
