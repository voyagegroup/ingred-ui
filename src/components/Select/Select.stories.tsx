import * as React from "react";
import { action } from "@storybook/addon-actions";
import styled from "styled-components";
import Select, { OptionType } from "./Select";
import Typography from "../Typography";

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.dark};
`;

const RowContainer = styled.div<{ minHeight?: string }>`
  display: flex;
  align-items: flex-start;
  margin: ${({ theme }) => theme.spacing * 3}px;
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.default};
  min-height: ${({ minHeight }) => minHeight || "0"};
`;

const Column = styled.div`
  & + & {
    margin-left: ${({ theme }) => theme.spacing * 5}px;
  }
`;

export default {
  title: "Select",
  parameters: {
    component: Select
  }
};

const options: OptionType[] = [
  {
    label: "Adgeneration",
    value: "1"
  },
  {
    label: "fluct",
    value: "2"
  },
  {
    label: "Pubmatic",
    value: "3"
  },
  {
    label: "Hoge",
    value: "4"
  },
  {
    label: "Pubmatic",
    value: "3"
  },
  {
    label: "Hoge",
    value: "4"
  },
  {
    label: "Pubmatic",
    value: "3"
  },
  {
    label: "Hoge",
    value: "4"
  },
  {
    label: "Pubmatic",
    value: "3"
  },
  {
    label: "Hoge",
    value: "4"
  },
  {
    label: "Pubmatic",
    value: "3"
  },
  {
    label: "Hoge",
    value: "4"
  }
];

export const Overview = () => (
  <Container>
    <RowContainer>
      <Column>
        <Typography weight="bold" size="xxl">
          Normal
        </Typography>
        <Select
          options={options}
          minWidth="200px"
          onChange={action("onChange")}
        />
      </Column>
      <Column>
        <Typography weight="bold" size="xxl">
          Disabled
        </Typography>
        <Select
          isDisabled
          options={options}
          minWidth="200px"
          onChange={action("onChange")}
        />
      </Column>
      <Column>
        <Typography weight="bold" size="xxl">
          Error
        </Typography>
        <Select
          error
          options={options}
          minWidth="200px"
          onChange={action("onChange")}
        />
      </Column>
    </RowContainer>
    <RowContainer minHeight="300px">
      <Column>
        <Typography weight="bold" size="xxl">
          Opened
        </Typography>
        <Select
          menuIsOpen
          options={options}
          minWidth="200px"
          onChange={action("onChange")}
        />
      </Column>
      <Column>
        <Typography weight="bold" size="xxl">
          With link
        </Typography>
        <Select
          menuIsOpen
          options={options}
          minWidth="200px"
          link={{
            to: "/",
            text: "リンク"
          }}
          onChange={action("onChange")}
        />
      </Column>
      <Column>
        <Typography weight="bold" size="xxl">
          Multiple
        </Typography>
        <Select
          menuIsOpen
          isMulti
          options={options}
          minWidth="200px"
          onChange={action("onChange")}
        />
      </Column>
    </RowContainer>
  </Container>
);
