import * as React from "react";
import styled from "styled-components";
import { select, number, text, boolean } from "@storybook/addon-knobs";
import NotificationBadge from ".";
import { Icon } from "..";
import Spacer from "../Spacer";
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
  min-width: 300px;
  & + & {
    margin-left: ${({ theme }) => theme.spacing * 5}px;
  }
`;

export default {
  title: "NotificationBadge",
  parameters: {
    component: NotificationBadge,
  },
};

export const Overview = () => {
  const size = select(
    "Size",
    {
      Small: "small",
      Medium: "medium",
      Large: "large",
    },
    "small",
  );

  const position = select(
    "Position",
    {
      Top_Rignt: "top-right",
      Top_Left: "top-left",
      Bottom_Rignt: "bottom-right",
      Bottom_Left: "bottom-left",
    },
    "top-right",
  );

  const max = number("Max Value", 99);

  const valueNum = number("Value(number)", 100);
  const valueText = text("Value(string)", "New");

  const showZero = boolean("Show Zero", false);

  const invisible = boolean("Invisible", false);

  return (
    <Container>
      <RowContainer>
        <Column>
          <Spacer pb={3}>
            <Typography weight="bold" size="xxxxxl">
              normal(number)
            </Typography>
          </Spacer>
          <NotificationBadge
            badgeContent={valueNum}
            max={max}
            position={position}
            showZero={showZero}
            invisible={invisible}
          >
            <Icon name="setting" type="fill" size="lg" />
          </NotificationBadge>
        </Column>
        <Column>
          <Spacer pb={3}>
            <Typography weight="bold" size="xxxxxl">
              normal(text)
            </Typography>
          </Spacer>
          <NotificationBadge
            badgeContent={valueText}
            position={position}
            invisible={invisible}
          >
            <Icon name="setting" type="fill" size="lg" />
          </NotificationBadge>
        </Column>
        <Column>
          <Spacer pb={3}>
            <Typography weight="bold" size="xxxxxl">
              dot
            </Typography>
          </Spacer>
          <NotificationBadge
            variant="dot"
            dotSize={size}
            position={position}
            invisible={invisible}
          >
            <Icon name="setting" type="fill" size="lg" />
          </NotificationBadge>
        </Column>
      </RowContainer>
    </Container>
  );
};
