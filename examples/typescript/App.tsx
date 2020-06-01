import * as React from "react";
import * as Styled from "./styles/styled";
import moment from "moment";
import "react-dates/lib/css/_datepicker.css";
import {
  ThemeProvider,
  createTheme,
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
  Theme,
  DropdownButton,
  DatePicker,
} from "ingred-ui";
import { GlobalStyle } from "./styles/globalStyle";

const componentList = [
  {
    title: "Layout",
    items: [
      {
        title: "Spacer",
        content: <Spacer pt={10} />,
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
    ],
  },
  {
    title: "Text",
    items: [
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
    title: "Controll",
    items: [
      {
        title: "Button",
        content: <Button inline={true}>ボタン</Button>,
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
        title: "Action Button",
        content: <ActionButton icon="pencil">アクションボタン</ActionButton>,
      },
    ],
  },
  {
    title: "Indicator",
    items: [
      {
        title: "Loading bar",
        content: <LoadingBar />,
      },
      {
        title: "Spinner",
        content: <Spinner />,
      },
    ],
  },
  {
    title: "Input",
    items: [
      {
        title: "Input",
        content: <Input />,
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
        title: "Error text",
        content: <ErrorText>エラーメッセージ</ErrorText>,
      },
      {
        title: "Select",
        content: (
          <Styled.InputContainer>
            <Select
              options={[
                {
                  label: "option1",
                  value: "1",
                },
                {
                  label: "option2",
                  value: "2",
                },
              ]}
            />
          </Styled.InputContainer>
        ),
      },
      {
        title: "Checkbox",
        content: <Checkbox checked={true} />,
      },
      {
        title: "RadioButton",
        content: <RadioButton checked={true} />,
      },
      {
        title: "DatePicker",
        content: (
          <DatePicker
            startDate={moment()}
            endDate={moment()}
            onDatesChange={() => {}}
          />
        ),
      },
    ],
  },
  {
    title: "Accessory",
    items: [
      {
        title: "Icon",
        content: <Icon name="dashboard" size="lg" />,
      },
    ],
  },
  {
    title: "Data Display",
    items: [
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

export class App extends React.Component {
  render() {
    const theme = createTheme();
    return (
      <>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Spacer pt={10} pb={7}>
            <Typography
              component="h1"
              weight="bold"
              size="xxxxxxxl"
              align="center"
            >
              XDC-UI
            </Typography>
          </Spacer>
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
                      <Styled.Title>{item.title}</Styled.Title>
                      <Styled.Component>{item.content}</Styled.Component>
                    </Styled.Column>
                  ))}
                </Styled.GridContainer>
              </React.Fragment>
            ))}
          </Styled.Container>
        </ThemeProvider>
      </>
    );
  }
}
