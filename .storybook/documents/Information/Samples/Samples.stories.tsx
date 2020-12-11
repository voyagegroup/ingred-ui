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
} from "../../../../src/components";
import { createTheme, Theme } from "../../../../src/themes";
import { SnackbarContent } from "../../../../src/components/Snackbar/internal/SnackbarContent";

type SectionsTitle =
  | "Layout"
  | "Inputs"
  | "Navigation"
  | "Feedback"
  | "Data Display"
  | "Utils";

type ComponentSection = {
  title: SectionsTitle;
  items: {
    title: string;
    content: JSX.Element;
  }[];
};

const GetToastSample = () => {
  const { addToast } = Toast.useToasts();
  const handleClick = () => {
    addToast("○○が完了しました", {
      appearance: "success",
      autoDismiss: true,
    });
  };
  return (
    <div>
      <Button inline onClick={handleClick}>
        トーストを表示する
      </Button>
    </div>
  );
};

const componentList: ComponentSection[] = [
  {
    title: "Layout",
    items: [
      {
        title: "Card",
        content: <Card p={3}>コンテンツ</Card>,
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
    items: [
      {
        title: "ActionButton",
        content: <ActionButton icon="pencil">アクションボタン</ActionButton>,
      },
      {
        title: "Button",
        content: <Button inline={true}>ボタン</Button>,
      },
      {
        title: "ButtonGroup",
        content: (
          <ButtonGroup>
            <Button onClick={action("clicked")}>保存する</Button>
            <Button onClick={action("clicked")}>編集する</Button>
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
              {
                text: "メニュー1",
                onClick: () => {},
              },
              {
                text: "メニュー2",
                onClick: () => {},
              },
            ]}
          >
            ボタン
          </DropdownButton>
        ),
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
          <Styled.InputContainer>
            <Select
              options={[
                { label: "option1", value: "1" },
                { label: "option2", value: "2" },
              ]}
            />
          </Styled.InputContainer>
        ),
      },
      {
        title: "Switch",
        content: (
          <Switch
            value={0}
            cases={[{ name: "デマンド別" }, { name: "チャネル別" }]}
            onChange={action("changed 'Switch'")}
          />
        ),
      },
      {
        title: "TextField",
        content: (
          <Styled.InputContainer>
            <TextField errorText="エラーメッセージ" />
          </Styled.InputContainer>
        ),
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
    items: [
      {
        title: "ContextMenu",
        content: (
          <ContextMenu
            contents={[
              { text: "編集", onClick: action("clicked 編集") },
              { text: "保存", onClick: action("clicked 保存") },
            ]}
          />
        ),
      },
      {
        title: "MenuList",
        content: (
          <MenuList
            contents={[
              { text: "編集", onClick: action("clicked 編集") },
              { text: "保存", onClick: action("clicked 保存") },
            ]}
          />
        ),
      },
    ],
  },
  {
    title: "Feedback",
    items: [
      {
        title: "LoadingBar",
        content: <LoadingBar />,
      },
      {
        title: "Snackbar",
        content: (
          <SnackbarContent color="warning">
            操作が長時間行われていません。
          </SnackbarContent>
        ),
      },
      {
        title: "Spinner",
        content: <Spinner />,
      },
      {
        title: "Toast",
        content: <GetToastSample />,
      },
    ],
  },
  {
    title: "Data Display",
    items: [
      {
        title: "Badge",
        content: <Badge color="primary">Badge</Badge>,
      },
      {
        title: "Divider",
        content: <Divider orientation="vertical" />,
      },
      {
        title: "ErrorText",
        content: <ErrorText>エラーメッセージ</ErrorText>,
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
        content: (
          <SplitAnnotation>注釈はこのように表示されます。</SplitAnnotation>
        ),
      },
      {
        title: "Table",
        content: (
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>タイトル</Table.HeaderCell>
                <Table.HeaderCell>タイトル</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>コンテンツ</Table.Cell>
                <Table.Cell>コンテンツ</Table.Cell>
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
    <Toast.Provider
      placement="top-center"
      autoDismissTimeout={3000}
      transitionDuration={300}
    >
      <Styled.Container>
        <Spacer pl={2} pt={4} pb={2}>
          <Typography component="h2" weight="bold" size="xxxxxl">
            Color
          </Typography>
        </Spacer>
        <Styled.GridContainer>
          {getColors(theme).map((item) => (
            <Styled.Column key={item.title}>
              <Styled.Title>{item.title}</Styled.Title>
              <Styled.ColorTile palette={item.palette} />
            </Styled.Column>
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
              {group.items.map((item) => (
                <Styled.Column key={item.title}>
                  <Styled.Title
                    hasLink={true}
                    onClick={linkTo(`Components/${item.title}`)}
                  >
                    {item.title}
                  </Styled.Title>
                  <Styled.Component>{item.content}</Styled.Component>
                </Styled.Column>
              ))}
            </Styled.GridContainer>
          </React.Fragment>
        ))}
      </Styled.Container>
    </Toast.Provider>
  );
};
