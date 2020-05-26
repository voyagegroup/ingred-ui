import React from "react";
import * as Styled from "./styled";
import { Typography, Spacer, Input, RadioButton } from "ingred-ui";
import moment from "moment";
import TextField from "@material-ui/core/TextField";

type Props = {
  todo: Todo;
  onChange: (changedTodo: Todo) => void;
};

export const Edit: React.FunctionComponent<Props> = ({ todo, onChange }) => {
  const [copiedTodo, setCopiedTodo] = React.useState<Todo>(todo);

  React.useEffect(() => {
    onChange(copiedTodo);
  }, [onChange, copiedTodo]);

  return (
    <Styled.Container>
      <Typography weight="bold" size="xxxl">
        タイトル
      </Typography>
      <Spacer pt={1} />
      <Input
        placeholder="Place holder"
        value={copiedTodo.title}
        onChange={(e) =>
          setCopiedTodo({ ...copiedTodo, title: e.target.value })
        }
      />

      <Spacer pt={3}>
        <Typography weight="bold" size="xxl">
          説明
        </Typography>
        <Spacer pt={1} />
        <Styled.TextAreaContainer
          rows={10}
          cols={110}
          value={copiedTodo.content}
          onChange={(e) =>
            setCopiedTodo({ ...copiedTodo, content: e.target.value })
          }
        />
      </Spacer>

      <Spacer pt={3}>
        <Typography weight="bold" size="xxl">
          締切
        </Typography>
        <Spacer pt={1} />
        <TextField
          id="date"
          type="date"
          variant="outlined"
          defaultValue={moment(copiedTodo.deadLine).format("YYYY-MM-DD")}
          onChange={(e) =>
            setCopiedTodo({
              ...copiedTodo,
              deadLine: moment(e.target.value).format("YYYY/MM/DD"),
            })
          }
        />
      </Spacer>

      <Spacer pt={3}>
        <Typography weight="bold" size="xxl">
          状態
        </Typography>
        <Spacer pt={1} />
        <RadioButton
          defaultChecked={true}
          name="group"
          onChange={() => {
            setCopiedTodo({
              ...copiedTodo,
              finish: true,
            });
          }}
        >
          完了
        </RadioButton>
        <Spacer pt={1} />
        <RadioButton
          name="group"
          onChange={() => {
            setCopiedTodo({
              ...copiedTodo,
              finish: false,
            });
          }}
        >
          未完了
        </RadioButton>
      </Spacer>
    </Styled.Container>
  );
};
