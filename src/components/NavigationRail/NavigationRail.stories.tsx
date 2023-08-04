import { ArgsTable, Stories, Title } from "@storybook/addon-docs";
import { Markdown } from "@storybook/blocks";
import { StoryObj } from "@storybook/react";
import React from "react";
import Flex from "../Flex";
import Icon from "../Icon";
import NavigationRail from "./NavigationRail";

export default {
  title: "Components/Navigation/NavigationRail",
  component: NavigationRail,
  subcomponents: {
    Container: NavigationRail.Container,
    Header: NavigationRail.Header,
    Content: NavigationRail.Content,
    ExpansionMenu: NavigationRail.ExpansionMenu,
    ExpansionMenuItem: NavigationRail.ExpansionMenuItem,
    Menu: NavigationRail.Menu,
    Footer: NavigationRail.Footer,
    Fixture: NavigationRail.Fixture,
    MainContent: NavigationRail.MainContent,
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      source: { language: "tsx" },
      disable: true,
      page: () => (
        <>
          <Title />
          <Markdown>
            {[
              "It implements like Sidebar UI.",
              "",
              "It consists of multiple components.",
              "",
              "Usage example is included in ”Canvas” Tab at header.",
            ].join("\n")}
          </Markdown>
          <ArgsTable of={NavigationRail} />
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
};

export const Example: StoryObj = {
  render: () => {
    return (
      <NavigationRail.Container>
        <NavigationRail>
          <NavigationRail.Header>This is Header.</NavigationRail.Header>
          <NavigationRail.Content>
            <NavigationRail.Menu
              title="Dashboard"
              isActive={true}
              iconName="dashboard"
              notificationCount={2}
            />
            <NavigationRail.Menu
              title="Chart"
              isActive={false}
              iconName="bar_chart"
            />
            <NavigationRail.ExpansionMenu
              title="Setting"
              isActive={false}
              iconName="setting"
              notificationCount={2}
              expansionList={[
                <NavigationRail.ExpansionMenuItem
                  isActive={true}
                  title="Detail setting"
                  notificationCount={2}
                />,
                <NavigationRail.ExpansionMenuItem
                  isActive={false}
                  title={
                    <Flex display="flex" alignItems="center" gap={1}>
                      <Icon name="user" />
                      Account setting
                    </Flex>
                  }
                />,
              ]}
            />
          </NavigationRail.Content>
          <NavigationRail.Footer>
            <NavigationRail.Fixture />
          </NavigationRail.Footer>
        </NavigationRail>
        <NavigationRail.MainContent>
          Source code is written in &rdquo;Story&rdquo; Tab at footer.
        </NavigationRail.MainContent>
      </NavigationRail.Container>
    );
  },
};
