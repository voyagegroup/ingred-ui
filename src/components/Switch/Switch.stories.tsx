import * as React from "react";
import Switch from "./Switch";
import styled from "styled-components";
import Typography from "../Typography";
import Spacer from "../Spacer";

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.dark};
`;

const RowContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.palette.background.default};
  padding: ${({ theme }) => theme.spacing * 3}px;
`;

export default {
  title: "Switch",
  component: Switch,
  parameters: {
    docs: { page: null },
  },
};

export const Overview: React.FunctionComponent = () => {
  const [textValue1, setTextValue1] = React.useState(0);
  const [textValue2, setTextValue2] = React.useState(0);
  const [imageValue, setImageValue] = React.useState(0);
  return (
    <Container>
      <Typography weight="bold" size="xxl">
        Text
      </Typography>
      <Spacer pt={1} />
      <RowContainer>
        <Switch
          value={textValue1}
          cases={[
            {
              name: "デマンド別",
            },
            {
              name: "チャネル別",
            },
          ]}
          onChange={setTextValue1}
        />
        <Spacer pr={3} />
        <Switch
          value={textValue2}
          cases={[
            {
              name: "日本",
            },
            {
              name: "アメリカ",
            },
            {
              name: "北アイルランド",
            },
          ]}
          onChange={setTextValue2}
        />
      </RowContainer>
      <Spacer pt={5} />
      <Typography weight="bold" size="xxl">
        Image
      </Typography>
      <Spacer pt={1} />
      <RowContainer>
        <Switch
          value={imageValue}
          cases={[
            {
              name: "棒グラフ",
              icon: "bar_chart_framed",
            },
            {
              name: "折れ線グラフ",
              icon: "line_chart_framed",
            },
          ]}
          onChange={setImageValue}
        />
      </RowContainer>
    </Container>
  );
};

export const WithCustomValue: React.FunctionComponent = () => {
  const [value, setValue] = React.useState<"bar" | "line">("bar");
  return (
    <Container>
      <Typography weight="bold" size="xxl">
        with custom value
      </Typography>
      <Spacer pt={1} />
      <RowContainer>
        <Switch
          value={value}
          cases={[
            {
              name: "棒グラフ",
              icon: "bar_chart_framed",
              value: "bar",
            },
            {
              name: "折れ線グラフ",
              icon: "line_chart_framed",
              value: "line",
            },
          ]}
          onChange={setValue}
        />
      </RowContainer>
    </Container>
  );
};
