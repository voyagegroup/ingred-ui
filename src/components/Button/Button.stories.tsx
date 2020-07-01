import * as React from "react";
import styled from "styled-components";
import Button from ".";
import { action } from "@storybook/addon-actions";
import Typography from "../Typography";
import Flex from "../Flex";
import Spacer from "../Spacer";

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.dark};
`;

const RowContainer = styled.div`
  margin: ${({ theme }) => theme.spacing * 3}px;
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.default};
  button + button {
    margin-left: ${({ theme }) => theme.spacing * 5}px;
  }
`;

const Link: React.FunctionComponent<{ href: string; className: string }> = ({
  href,
  className,
  children,
}) => (
  <a href={href} className={className} onClick={action("clicked")}>
    {children}
  </a>
);

export default {
  title: "Button",
  parameters: {
    component: Button,
  },
};

export const Overview = () => (
  <Container>
    <Typography weight="bold" size="xxl">
      Full Button
    </Typography>
    <RowContainer>
      <Typography weight="bold" size="xxl">
        Primary
      </Typography>
      <Spacer pt={2} pb={5}>
        <Button size="large" onClick={action("clicked")}>
          ボタン
        </Button>
      </Spacer>
      <div>
        <Button disabled size="large" onClick={action("clicked")}>
          ボタン
        </Button>
      </div>
    </RowContainer>
    <RowContainer>
      <Typography weight="bold" size="xxl">
        Secondary
      </Typography>
      <Spacer pt={2} pb={5}>
        <Button size="large" color="secondary" onClick={action("clicked")}>
          ボタン
        </Button>
      </Spacer>
      <div>
        <Button
          disabled
          size="large"
          color="secondary"
          onClick={action("clicked")}
        >
          ボタン
        </Button>
      </div>
    </RowContainer>
    <RowContainer>
      <Typography weight="bold" size="xxl">
        Danger
      </Typography>
      <Spacer pt={2} pb={5}>
        <Button size="large" color="danger" onClick={action("clicked")}>
          ボタン
        </Button>
      </Spacer>
      <div>
        <Button
          disabled
          size="large"
          color="danger"
          onClick={action("clicked")}
        >
          ボタン
        </Button>
      </div>
    </RowContainer>

    <Typography weight="bold" size="xxl">
      Large Button
    </Typography>
    <RowContainer>
      <Typography weight="bold" size="xxl">
        Primary
      </Typography>
      <Spacer pt={2} />
      <Flex display="flex" alignItems="center">
        <Button inline size="large" onClick={action("clicked")}>
          長めの長めの文言ボタン
        </Button>
        <Button inline size="large" onClick={action("clicked")}>
          新規登録
        </Button>
        <Button inline disabled size="large" onClick={action("clicked")}>
          新規登録
        </Button>
      </Flex>
    </RowContainer>
    <RowContainer>
      <Typography weight="bold" size="xxl">
        Secondary
      </Typography>
      <Spacer pt={2} />
      <Flex display="flex" alignItems="center">
        <Button
          inline
          size="large"
          color="secondary"
          onClick={action("clicked")}
        >
          長めの長めの文言ボタン
        </Button>
        <Button
          inline
          size="large"
          color="secondary"
          onClick={action("clicked")}
        >
          新規登録
        </Button>
        <Button
          inline
          disabled
          size="large"
          color="secondary"
          onClick={action("clicked")}
        >
          新規登録
        </Button>
      </Flex>
    </RowContainer>
    <RowContainer>
      <Typography weight="bold" size="xxl">
        Danger
      </Typography>
      <Spacer pt={2} />
      <Flex display="flex" alignItems="center">
        <Button inline color="danger" size="large" onClick={action("clicked")}>
          長めの長めの文言ボタン
        </Button>
        <Button inline color="danger" size="large" onClick={action("clicked")}>
          削除する
        </Button>
        <Button
          inline
          disabled
          color="danger"
          size="large"
          onClick={action("clicked")}
        >
          削除する
        </Button>
      </Flex>
    </RowContainer>

    <Typography weight="bold" size="xxl">
      Medium Button
    </Typography>
    <RowContainer>
      <Typography weight="bold" size="xxl">
        Primary
      </Typography>
      <Spacer pt={2} />
      <Flex display="flex" alignItems="center">
        <Button inline onClick={action("clicked")}>
          長めの文言ボタン
        </Button>
        <Button inline onClick={action("clicked")}>
          保存する
        </Button>
        <Button inline disabled onClick={action("clicked")}>
          保存する
        </Button>
      </Flex>
    </RowContainer>
    <RowContainer>
      <Typography weight="bold" size="xxl">
        Secondary
      </Typography>
      <Spacer pt={2} />
      <Flex display="flex" alignItems="center">
        <Button inline color="secondary" onClick={action("clicked")}>
          長めの文言ボタン
        </Button>
        <Button inline color="secondary" onClick={action("clicked")}>
          保存する
        </Button>
        <Button inline disabled color="secondary" onClick={action("clicked")}>
          保存する
        </Button>
      </Flex>
    </RowContainer>
    <RowContainer>
      <Typography weight="bold" size="xxl">
        Danger
      </Typography>
      <Spacer pt={2} />
      <Flex display="flex" alignItems="center">
        <Button inline color="danger" onClick={action("clicked")}>
          長めの文言ボタン
        </Button>
        <Button inline color="danger" onClick={action("clicked")}>
          削除する
        </Button>
        <Button inline disabled color="danger" onClick={action("clicked")}>
          削除する
        </Button>
      </Flex>
    </RowContainer>

    <Typography weight="bold" size="xxl">
      Small Button
    </Typography>
    <RowContainer>
      <Typography weight="bold" size="xxl">
        Primary
      </Typography>
      <Spacer pt={2} />
      <Flex display="flex" alignItems="center">
        <Button inline size="small" onClick={action("clicked")}>
          条件を変更
        </Button>
        <Button inline size="small" onClick={action("clicked")}>
          適用
        </Button>
        <Button inline disabled size="small" onClick={action("clicked")}>
          適用
        </Button>
      </Flex>
    </RowContainer>
    <RowContainer>
      <Typography weight="bold" size="xxl">
        Secondary
      </Typography>
      <Spacer pt={2} />
      <Flex display="flex" alignItems="center">
        <Button
          inline
          size="small"
          color="secondary"
          onClick={action("clicked")}
        >
          条件を変更
        </Button>
        <Button
          inline
          size="small"
          color="secondary"
          onClick={action("clicked")}
        >
          適用
        </Button>
        <Button
          inline
          disabled
          size="small"
          color="secondary"
          onClick={action("clicked")}
        >
          適用
        </Button>
      </Flex>
    </RowContainer>
    <RowContainer>
      <Typography weight="bold" size="xxl">
        Danger
      </Typography>
      <Spacer pt={2} />
      <Flex display="flex" alignItems="center">
        <Button inline size="small" color="danger" onClick={action("clicked")}>
          条件を変更
        </Button>
        <Button inline size="small" color="danger" onClick={action("clicked")}>
          削除
        </Button>
        <Button
          inline
          disabled
          size="small"
          color="danger"
          onClick={action("clicked")}
        >
          削除
        </Button>
      </Flex>
    </RowContainer>
    <RowContainer>
      <Typography weight="bold" size="xxl">
        Link
      </Typography>
      <Spacer pt={2} />
      <Flex display="flex" alignItems="center">
        <Button inline size="small" href="#" onClick={action("clicked")}>
          Link without component
        </Button>
        <Spacer pr={1} />
        <Button inline size="small" href="#" component={Link}>
          Link with component
        </Button>
      </Flex>
    </RowContainer>
  </Container>
);
