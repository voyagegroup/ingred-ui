import { ArgsTable, Description, Stories, Title } from "@storybook/addon-docs";
import { Story } from "@storybook/react/types-6-0";
import React from "react";
import NavigationRail from "./NavigationRail";

export default {
  title: "Components/Navigation/NavigationRail",
  component: NavigationRail,
  subcomponents: {
    Container: NavigationRail.Container,
    Header: NavigationRail.Header,
    Content: NavigationRail.Content,
    ExpantionMenu: NavigationRail.ExpantionMenu,
    ExpantionMenuItem: NavigationRail.ExpantionMenuItem,
    Menu: NavigationRail.Menu,
    Footer: NavigationRail.Footer,
    Fixture: NavigationRail.Fixture,
    MainContent: NavigationRail.MainContent,
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      source: { type: "code" },
      disable: true,
      page: () => (
        <>
          <Title />
          <Description
            markdown={[
              "It implements like Sidebar UI.",
              "",
              "It consists of multiple components.",
              "",
              "Usage example is included in ”Canvas” Tab at header.",
            ].join("\n")}
          />
          <ArgsTable of={NavigationRail} />
          <Stories includePrimary title="Stories" />
        </>
      ),
    },
  },
};

export const Example: Story = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <NavigationRail.Container defaultFixed={true}>
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
          <NavigationRail.ExpantionMenu
            title="Setting"
            isActive={false}
            iconName="setting"
            notificationCount={2}
            defaultExpand={isOpen} 
            expantionList={[
              <NavigationRail.ExpantionMenuItem
                isActive={true}
                title="Detail setting"
                notificationCount={2}
              />,
              <NavigationRail.ExpantionMenuItem
                isActive={false}
                title="Account setting"
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
};
