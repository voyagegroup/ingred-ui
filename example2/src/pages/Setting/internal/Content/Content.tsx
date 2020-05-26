import React from "react";
import * as Styled from "./styled";
import { default as ReactMarkdown } from "react-markdown";
import { Typography, Spacer } from "ingred-ui";
import moment from "moment";

type Props = {
  todo: Todo;
};

export const Content: React.FunctionComponent<Props> = ({ todo }) => {
  return (
    <Styled.Container>
      <Typography weight="bold" size="xxxl">
        {todo.title}
      </Typography>

      <Spacer pt={3}>
        <Typography weight="bold" size="xxl">
          説明
        </Typography>
        <Spacer pb={1} />
        {todo.content ? (
          <ReactMarkdown source={todo.content} escapeHtml={false} />
        ) : (
          <div>なし</div>
        )}
      </Spacer>

      <Spacer pt={3}>
        <Typography weight="bold" size="xxl">
          締切
        </Typography>
        <Spacer pb={1} />
        {moment(todo.deadLine).format("YYYY/MM/DD")}
      </Spacer>

      <Spacer pt={3}>
        <Typography weight="bold" size="xxl">
          状態
        </Typography>
        <Spacer pb={1} />
        {todo.finish ? <div>完了</div> : <div>未完了</div>}
      </Spacer>
    </Styled.Container>
  );
};
