import React from "react";
import * as Styled from "./styled";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { AddPyload, UpdatePyload } from "../../store/modules/todo/actions";
import {
  DataTable,
  Input,
  Icon,
  Flex,
  Button,
  ActionButton,
  Spacer,
} from "ingred-ui";

type Props = {
  todos: Todo[];
  updateTodo: (payload: UpdatePyload) => void;
  addTodo: (payload: AddPyload) => void;
};

export const List: React.FunctionComponent<Props> = ({
  todos,
  updateTodo,
  addTodo,
}) => {
  const history = useHistory();
  const [content, setContent] = React.useState<string>("");

  return (
    <Styled.Container>
      <Styled.TaskAdderContainer>
        <Flex display="flex" alignItems="center">
          <Input
            placeholder="Type Task Name"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Spacer pl={1} />
          <Button
            inline
            disabled={content === ""}
            size="small"
            color="primary"
            onClick={() => addTodo(content)}
          >
            追加
          </Button>
        </Flex>
      </Styled.TaskAdderContainer>
      <Spacer pb={3} />
      <DataTable
        emptyTitle="TODOがありません。"
        enablePagination={true}
        per={5}
        data={todos}
        columns={[
          {
            name: "Status",
            selector: (row) => row.finish.toString(),
            renderCell: (row) =>
              row.finish && (
                <Spacer pl={2}>
                  <Icon name="check" size="lg" />
                </Spacer>
              ),
            sortable: true,
            width: "15%",
          },
          {
            name: "Title",
            selector: (row) => row.title,
            sortable: true,
            width: "50%",
          },
          {
            name: "DeadLine",
            selector: (row) => moment(row.deadLine).format("YYYY/MM/DD"),
            sortable: true,
            width: "20%",
          },
          {
            name: "Operation",
            selector: (row) => row.id,
            renderCell: (row) => (
              <Flex display="flex" alignItems="center">
                <Spacer pr={0.5}>
                  <ActionButton
                    icon={"check"}
                    onClick={() => updateTodo({ ...row, finish: true })}
                  >
                    完了
                  </ActionButton>
                </Spacer>
                <ActionButton
                  icon={"pencil"}
                  onClick={() => history.push(`/setting/${row.id}`)}
                >
                  詳細
                </ActionButton>
              </Flex>
            ),
            width: "25%",
          },
        ]}
      />
    </Styled.Container>
  );
};
