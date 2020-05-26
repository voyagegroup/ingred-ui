import React from "react";
import * as Styled from "./styled";
import { Flex, Button, Spacer } from "ingred-ui";
import { useHistory } from "react-router-dom";
import { UpdatePyload, DeletePyload } from "../../store/modules/todo/actions";
import { RouteComponentProps } from "react-router-dom";
import { DeleteModal } from "./internal/DeleteModal";
import { Content } from "./internal/Content";
import { Edit } from "./internal/Edit";

type Props = {
  todos: Todo[];
  updateTodo: (payload: UpdatePyload) => void;
  deleteTodo: (payload: DeletePyload) => void;
} & RouteComponentProps<{ todoId: string }>;

export const Setting: React.FunctionComponent<Props> = ({
  match,
  todos,
  updateTodo,
  deleteTodo,
}) => {
  const history = useHistory();
  const todo = todos.find(
    (todo) => todo.id === parseInt(match.params.todoId)
  ) as Todo;

  const [deleteModalId, setDeleteModalId] = React.useState<number | null>(null);
  const [editMode, setEditMode] = React.useState<boolean>(false);
  const [copiedTodo, setCopiedTodo] = React.useState<Todo>(
    Object.assign({}, todo)
  );

  const onHandleDelete = (todoId: number) => {
    deleteTodo(todoId);
    history.push("/");
  };
  const onHandleChangeDeleteModalId = (id: number | null) => () =>
    setDeleteModalId(id);

  const checkSaveEnable = (todo: Todo) => {
    if (todo.id && todo.title && todo.deadLine !== "Invalid date") {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Styled.Container>
      {editMode ? (
        <Edit todo={todo} onChange={setCopiedTodo} />
      ) : (
        <Content todo={todo} />
      )}
      <Spacer pt={3}>
        {editMode ? (
          <Flex display="flex" alignItems="center">
            <Button
              inline
              color="primary"
              disabled={!checkSaveEnable(copiedTodo)}
              onClick={() => {
                updateTodo(copiedTodo);
                setEditMode(false);
              }}
            >
              保存
            </Button>
            <Spacer pl={2} />
            <Button
              inline
              color="cancel"
              onClick={() => {
                setEditMode(false);
              }}
            >
              キャンセル
            </Button>
          </Flex>
        ) : (
          <Flex display="flex" alignItems="center">
            <Button
              inline
              color="primary"
              onClick={() => {
                setEditMode(true);
              }}
            >
              編集
            </Button>
            <Spacer pl={2} />
            <Button
              inline
              color="danger"
              onClick={onHandleChangeDeleteModalId(todo.id)}
            >
              削除
            </Button>
            {deleteModalId === todo.id && (
              <DeleteModal
                todo={todo}
                onClose={onHandleChangeDeleteModalId(null)}
                onSubmit={onHandleDelete}
              />
            )}
          </Flex>
        )}
      </Spacer>
    </Styled.Container>
  );
};
