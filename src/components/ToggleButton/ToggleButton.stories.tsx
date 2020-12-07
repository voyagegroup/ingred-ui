import * as React from "react";
import styled from "styled-components";
import ToggleButton from "./ToggleButton";
import Spacer from "../Spacer";
import Typography from "../Typography";
import { text } from "@storybook/addon-knobs";

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.dark};
`;

const RowContainer = styled.div`
  display: flex;
  align-items: center;
  margin: ${({ theme }) => theme.spacing * 3}px;
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.default};
  button + button {
    margin-left: ${({ theme }) => theme.spacing * 5}px;
  }
`;

export default {
  title: "Components/ToggleButton",
  component: ToggleButton,
  parameters: {
    docs: { page: null },
  },
};

export const Overview: React.FunctionComponent = () => {
  const [isActive, setIsActive] = React.useState(false);
  const activeText = text("ActiveText", "ON");
  const inActiveText = text("InActiveText", "OFF");
  const width = text("Width", "56px");
  return (
    <Container>
      <Typography weight="bold" size="xxl">
        Overview
      </Typography>
      <RowContainer>
        <Spacer pr={3}>
          <Spacer pb={1}>
            <Typography>Normal</Typography>
          </Spacer>
          <ToggleButton
            active={isActive}
            width={width}
            activeText={activeText}
            inActiveText={inActiveText}
            onChange={() => setIsActive(!isActive)}
          />
        </Spacer>
        <Spacer pr={3}>
          <Spacer pb={1}>
            <Typography>Disabled</Typography>
          </Spacer>
          <ToggleButton
            width={width}
            activeText={activeText}
            inActiveText={inActiveText}
            disabled={true}
            active={isActive}
            onChange={() => setIsActive(!isActive)}
          />
        </Spacer>
      </RowContainer>
      <RowContainer>
        <Spacer pr={3}>
          <Spacer pb={1}>
            <Typography>Normal</Typography>
          </Spacer>
          <ToggleButton
            active={false}
            width={width}
            activeText={activeText}
            inActiveText={inActiveText}
          />
        </Spacer>
        <Spacer pr={3}>
          <Spacer pb={1}>
            <Typography>Checked</Typography>
          </Spacer>
          <ToggleButton
            active={true}
            width={width}
            activeText={activeText}
            inActiveText={inActiveText}
          />
        </Spacer>
        <Spacer pr={3}>
          <Spacer pb={1}>
            <Typography>Disabled</Typography>
          </Spacer>
          <ToggleButton
            active={false}
            disabled={true}
            width={width}
            activeText={activeText}
            inActiveText={inActiveText}
          />
        </Spacer>
        <Spacer pr={3}>
          <Spacer pb={1}>
            <Typography>Checked &amp; Disabled</Typography>
          </Spacer>
          <ToggleButton
            active={true}
            disabled={true}
            width={width}
            activeText={activeText}
            inActiveText={inActiveText}
          />
        </Spacer>
      </RowContainer>
    </Container>
  );
};
