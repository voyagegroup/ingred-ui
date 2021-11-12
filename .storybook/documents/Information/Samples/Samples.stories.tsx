import * as React from "react";
import * as Styled from "./styled";
import moment from "moment";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import {
  Button,
  Typography,
  ActionButton,
  Spacer,
  Input,
  LoadingBar,
  Spinner,
  Icon,
  ErrorText,
  Flex,
  TextField,
  Checkbox,
  RadioButton,
  Table,
  Tooltip,
  Select,
  Toast,
  DropdownButton,
  DateRangePicker,
  Card,
  ButtonGroup,
  DatePicker,
  Switch,
  ToggleButton,
  ContextMenu,
  MenuList,
  Badge,
  Divider,
  NotificationBadge,
  Pager,
  SplitAnnotation,
  ItemEmpty,
  ScrollArea,
  FileUploader,
  DataTable,
  MultipleFilter,
  Tabs,
} from "../../../../src/components";
import { createTheme, Theme } from "../../../../src/themes";
import { SnackbarContent } from "../../../../src/components/Snackbar/internal/SnackbarContent";
import ToastSample from "./components/ToastSample";
import ClickAwayListenerSample from "./components/ClickawayListenerSample";
import ConfirmModalSample from "./components/ConfirmModalSample";
import ModalSample from "./components/ModalSample";
import FadeSample from "./components/FadeSample";
import GrowSample from "./components/GrowSample";
import PopoverSample from "./components/PopoverSample";
import MenuSample from "./components/MenuSample";
import FloatingTipSample from "./components/FloatingTipSample";
import CreatableSelect from "../../../../src/components/CreatableSelect";

type SectionTitle =
  | "Layout"
  | "Inputs"
  | "Navigation"
  | "Feedback"
  | "Data Display"
  | "Utils";

type UndisplayedSection = {
  title: SectionTitle;
  components: {
    title: string;
  }[];
};

type Section = {
  title: SectionTitle;
  components: {
    title: string;
    content: JSX.Element;
    column?: number;
    row?: number;
  }[];
};

const componentList: Section[] = [
  {
    title: "Layout",
    components: [
      {
        title: "Card",
        content: <Card p={3}>Contents</Card>,
      },
      {
        title: "Flex",
        content: (
          <Styled.FullBox>
            <Flex display="flex" justifyContent="space-between">
              <Styled.Square />
              <Styled.Square />
              <Styled.Square />
            </Flex>
          </Styled.FullBox>
        ),
      },
      {
        title: "Spacer",
        content: <Spacer pt={10} />,
      },
    ],
  },
  {
    title: "Inputs",
    components: [
      {
        title: "ActionButton",
        content: <ActionButton icon="pencil">Edit</ActionButton>,
      },
      {
        title: "Button",
        content: <Button inline={true}>Button</Button>,
      },
      {
        title: "ButtonGroup",
        content: (
          <ButtonGroup>
            <Button onClick={action("clicked")}>Save</Button>
            <Button onClick={action("clicked")}>Edit</Button>
          </ButtonGroup>
        ),
      },
      {
        title: "Checkbox",
        content: <Checkbox checked={true} />,
      },
      {
        title: "DatePicker",
        content: (
          <DatePicker
            date={moment()}
            onDateChange={action("changed 'DatePicker'")}
          />
        ),
      },
      {
        title: "DateRangePicker",
        content: (
          <DateRangePicker
            startDate={moment()}
            endDate={moment()}
            onDatesChange={action("changed 'DateRangePicker'")}
          />
        ),
      },
      {
        title: "DropdownButton",
        content: (
          <DropdownButton
            contents={[
              { text: "Menu 1", onClick: action("clicked 'menu 1'") },
              { text: "Menu 2", onClick: action("clicked 'menu 2'") },
            ]}
          >
            DropdownButton
          </DropdownButton>
        ),
      },
      {
        title: "FileUploader",
        content: <FileUploader onSelectFiles={action("uploaded")} />,
        column: 2,
      },
      {
        title: "Input",
        content: <Input />,
      },
      {
        title: "RadioButton",
        content: <RadioButton checked={true} />,
      },
      {
        title: "Select",
        content: (
          <Select
            minWidth="200px"
            placeholder="Select..."
            options={[
              { label: "option1", value: "1" },
              { label: "option2", value: "2" },
            ]}
          />
        ),
      },
      {
        title: "CreatableSelect",
        content: (
          <CreatableSelect
            minWidth="200px"
            placeholder="Select..."
            options={[
              { label: "option1", value: "1" },
              { label: "option2", value: "2" },
            ]}
          />
        ),
      },
      {
        title: "Switch",
        content: (
          <Switch
            value={0}
            cases={[{ name: "Sum" }, { name: "Average" }]}
            onChange={action("changed 'Switch'")}
          />
        ),
      },
      {
        title: "TextField",
        content: <TextField errorText="Error Message" width="200px" />,
      },
      {
        title: "ToggleButton",
        content: (
          <ToggleButton
            active={true}
            onChange={action("changed 'ToggleButton'")}
          />
        ),
      },
    ],
  },
  {
    title: "Navigation",
    components: [
      {
        title: "ContextMenu",
        content: (
          <ContextMenu
            contents={[
              { text: "Edit", onClick: action("clicked Edit") },
              { text: "Save", onClick: action("clicked Save") },
            ]}
          />
        ),
      },
      {
        title: "Menu",
        content: <MenuSample />,
      },
      {
        title: "MenuList",
        content: (
          <MenuList
            contents={[
              { text: "Edit", onClick: action("clicked Edit") },
              { text: "Save", onClick: action("clicked Save") },
            ]}
          />
        ),
      },
      {
        title: "Tabs",
        content: (
          <Tabs
            data={[
              { text: "全て", count: 5, value: "全て" },
              { text: "ユニット", count: 3, value: "ユニット" },
              { text: "サイズ", count: 2, value: "サイズ" },
            ]}
            value={"全て"}
            withBadge={true}
            onChange={action("changed 'Tabs'")}
          />
        ),
      },
    ],
  },
  {
    title: "Feedback",
    components: [
      {
        title: "LoadingBar",
        content: <LoadingBar />,
      },
      {
        title: "Snackbar",
        content: (
          <SnackbarContent color="warning">This is Snackbar.</SnackbarContent>
        ),
      },
      {
        title: "Spinner",
        content: <Spinner />,
      },
      {
        title: "Toast",
        content: <ToastSample />,
      },
    ],
  },
  {
    title: "Data Display",
    components: [
      {
        title: "Badge",
        content: <Badge color="primary">Badge</Badge>,
      },
      {
        title: "DataTable",
        content: (
          <DataTable
            data={[
              { id: 1, name: "1name" },
              { id: 2, name: "2name" },
              { id: 3, name: "3name" },
            ]}
            columns={[
              {
                name: "ID",
                selector: (data) => data.id,
              },
              {
                name: "name",
                selector: (data) => data.name,
                sortable: true,
              },
            ]}
          />
        ),
        row: 2,
      },
      {
        title: "Divider",
        content: <Divider orientation="vertical" />,
      },
      {
        title: "ErrorText",
        content: <ErrorText>Error message</ErrorText>,
      },
      {
        title: "FloatingTip",
        content: <FloatingTipSample />,
      },
      {
        title: "Icon",
        content: <Icon name="dashboard" size="lg" />,
      },
      {
        title: "NotificationBadge",
        content: (
          <NotificationBadge variant="normal" badgeContent={3}>
            <Icon name="setting" type="fill" size="lg" />
          </NotificationBadge>
        ),
      },
      {
        title: "Pager",
        content: (
          <Pager per={1} total={3} onClick={action("clicked 'Pager'")} />
        ),
      },
      {
        title: "SplitAnnotation",
        content: <SplitAnnotation>Write some annotations.</SplitAnnotation>,
      },
      {
        title: "Table",
        content: (
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>Title</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Contents</Table.Cell>
                <Table.Cell>Contents</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        ),
      },
      {
        title: "Tooltip",
        content: (
          <Tooltip content="This is Tooltip!!">
            <div>Hover me!!</div>
          </Tooltip>
        ),
      },
      {
        title: "Typography",
        content: (
          <Typography weight="bold" size="xxxxxl" align="center">
            Typography
          </Typography>
        ),
      },
    ],
  },
  {
    title: "Utils",
    components: [
      {
        title: "ClickawayListener",
        content: <ClickAwayListenerSample />,
      },
      {
        title: "ConfirmModal",
        content: <ConfirmModalSample />,
      },
      {
        title: "Modal",
        content: <ModalSample />,
      },
      {
        title: "Fade",
        content: <FadeSample />,
      },
      {
        title: "Grow",
        content: <GrowSample />,
      },
      {
        title: "ItemEmpty",
        content: (
          <ItemEmpty title="Title" subtitle="Sub Title" imageWidth={100} />
        ),
        row: 2,
      },
      {
        title: "Popover",
        content: <PopoverSample />,
      },
      {
        title: "ScrollArea",
        content: (
          <div>
            <Styled.ScrollAreaContainer>
              <ScrollArea height="70px">
                <Styled.ScrollAreaContent />
              </ScrollArea>
            </Styled.ScrollAreaContainer>
            <Spacer pt={1} />
            <Typography align="center">※Only for Mac x Chromium</Typography>
          </div>
        ),
      },
      {
        title: "MultipleFilter",
        content: (
          <MultipleFilter
            filterPacks={[
              {
                categoryName: "Row name",
                sectionTitle: "Filter by name",
                filters: [
                  {
                    filterName: "Demand",
                    conditionTitle: "Search word",
                    control: {
                      type: "text",
                    },
                  },
                  {
                    filterName: "Channel",
                    conditionTitle: "Search word",
                    control: {
                      type: "text",
                    },
                  },
                  {
                    filterName: "Attribute",
                    conditionTitle: "Search word",
                    control: {
                      type: "text",
                    },
                  },
                  {
                    filterName: "Type",
                    conditionTitle: "Search word",
                    control: {
                      type: "text",
                    },
                  },
                ],
              },
              {
                categoryName: "Linking",
                sectionTitle: "Target",
                filters: [
                  {
                    filterName: "Device",
                    conditionTitle: "Condition",
                    control: {
                      type: "select",
                      options: ["Not selected", "Not Linking", "Linking"],
                    },
                  },
                  {
                    filterName: "Site",
                    conditionTitle: "Condition",
                    control: {
                      type: "select",
                      options: ["Not selected", "Not Linking", "Linking"],
                    },
                  },
                ],
              },
              {
                categoryName: "Condition",
                filters: [
                  {
                    filterName: "Public",
                    control: {
                      type: "boolean",
                    },
                  },
                  {
                    filterName: "Active",
                    control: {
                      type: "boolean",
                    },
                  },
                ],
              },
            ]}
          />
        ),
      },
    ],
  },
];

const undisplayedSections: UndisplayedSection[] = [
  {
    title: "Navigation",
    components: [{ title: "FixedPanel" }, { title: "NavigationRail" }],
  },
  {
    title: "Utils",
    components: [{ title: "Portal" }, { title: "LocaleProvider" }],
  },
];

const getColors = (theme: Theme) => [
  {
    title: "Primary",
    palette: theme.palette.primary,
  },
  {
    title: "Success",
    palette: theme.palette.success,
  },
  {
    title: "Warning",
    palette: theme.palette.warning,
  },
  {
    title: "Danger",
    palette: theme.palette.danger,
  },
];

export default {
  title: "Information/Samples",
  parameters: {
    layout: "fullscreen",
    docs: { page: null },
  },
};

export const Overview = () => {
  const theme = createTheme();
  return (
    <Toast.Provider placement="top-center">
      <Styled.Container>
        <Spacer pl={2} pt={4} pb={2}>
          <Typography component="h2" weight="bold" size="xxxxxl">
            Color
          </Typography>
        </Spacer>
        <Styled.GridContainer>
          {getColors(theme).map((item) => (
            <Styled.Cell key={item.title}>
              <Styled.Title>{item.title}</Styled.Title>
              <Styled.ColorTile palette={item.palette} />
            </Styled.Cell>
          ))}
        </Styled.GridContainer>

        {componentList.map((group) => (
          <React.Fragment key={group.title}>
            <Spacer pl={2} pt={4} pb={2}>
              <Typography component="h2" weight="bold" size="xxxxxl">
                {group.title}
              </Typography>
            </Spacer>
            <Styled.GridContainer>
              {group.components.map((component) => (
                <Styled.Cell
                  key={component.title}
                  column={component.column}
                  row={component.row}
                >
                  <Styled.Title
                    hasLink={true}
                    onClick={linkTo(
                      `Components/${group.title}/${component.title}`,
                    )}
                  >
                    {component.title}
                  </Styled.Title>
                  <Styled.Component>{component.content}</Styled.Component>
                </Styled.Cell>
              ))}
            </Styled.GridContainer>
          </React.Fragment>
        ))}
        <Spacer pl={2} pt={4} pb={2}>
          <Typography component="h2" weight="bold" size="xxxxxl">
            Others
          </Typography>
        </Spacer>
        {undisplayedSections.map((section) => (
          <React.Fragment key={section.title}>
            <Spacer pl={2} py={2}>
              <Styled.Title>{section.title}</Styled.Title>
            </Spacer>
            <Spacer pl={4}>
              {section.components.map((component) => (
                <Styled.Title
                  key={component.title}
                  as="h4"
                  hasLink={true}
                  onClick={linkTo(
                    `Components/${section.title}/${component.title}`,
                  )}
                >
                  {component.title}
                </Styled.Title>
              ))}
            </Spacer>
          </React.Fragment>
        ))}
      </Styled.Container>
    </Toast.Provider>
  );
};
