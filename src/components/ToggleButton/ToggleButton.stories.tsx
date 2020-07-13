import * as React from "react";
import styled from "styled-components";
import ToggleButton from "./ToggleButton";
import Spacer from "../Spacer";
import Typography from "../Typography";

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
  title: "ToggleButton",
  parameters: {
    component: ToggleButton,
  },
};

export const Overview: React.FunctionComponent = () => {
  const [isActive, setIsActive] = React.useState(false);
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
            onChange={() => setIsActive(!isActive)}
          />
        </Spacer>
        <Spacer pr={3}>
          <Spacer pb={1}>
            <Typography>Disabled</Typography>
          </Spacer>
          <ToggleButton
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
          <ToggleButton active={false} />
        </Spacer>
        <Spacer pr={3}>
          <Spacer pb={1}>
            <Typography>Checked</Typography>
          </Spacer>
          <ToggleButton active={true} />
        </Spacer>
        <Spacer pr={3}>
          <Spacer pb={1}>
            <Typography>Disabled</Typography>
          </Spacer>
          <ToggleButton active={false} disabled={true} />
        </Spacer>
        <Spacer pr={3}>
          <Spacer pb={1}>
            <Typography>Checked &amp; Disabled</Typography>
          </Spacer>
          <ToggleButton active={true} disabled={true} />
        </Spacer>
      </RowContainer>
    </Container>
  );
};
