import React from "react";
import * as Styled from "./AppStyle";
import { ThemeProvider, createTheme, Typography, Spacer, Table } from "ingred-ui";
import { configureStore } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { SettingView } from "./pages/Setting";
import { ListView } from "./pages/List";

// distで出てくる型に"css"がなければ良い

const App: React.FunctionComponent = () => {
  const store = configureStore();
  const theme = createTheme();
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Styled.Container>
        <Table>
          <Table.Body>
            <Table.Row css={{}}>
              <Table.HeaderCell width="177px" required={true}>
                タイトル
              </Table.HeaderCell>
              <Table.Cell>コンテンツ</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell width="177px">タイトル</Table.HeaderCell>
              <Table.Cell>コンテンツ</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell width="177px">タイトル</Table.HeaderCell>
              <Table.Cell>コンテンツ</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

          <Router>
            <Spacer p={2}>
              <Typography component="h1" size="xxxxl">
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    color: `${theme.palette.text.primary}`,
                  }}
                >
                  Ingred-TODO
                </Link>
              </Typography>
            </Spacer>

            <Spacer p={2}>
              <Route exact path="/" component={ListView}></Route>
              <Route path="/setting/:todoId" component={SettingView}></Route>
            </Spacer>
          </Router>
        </Styled.Container>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
