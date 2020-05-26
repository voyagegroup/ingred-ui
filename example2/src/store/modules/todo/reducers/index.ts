import { reducerWithInitialState } from "typescript-fsa-reducers";
import { add_todo, update_todo, delete_todo } from "../actions";
import moment from "moment";

export type TodoState = {
  nextId: number;
  todos: Todo[];
};

const initialState: TodoState = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos") as string)
  : { nextId: 0, todos: [] };

const updateTodo = (todos: Todo[], payload: Todo) => {
  const newTodos = todos.slice();
  const index = newTodos.findIndex((item: Todo) => item.id === payload.id);
  newTodos[index] = payload;
  return newTodos;
};

export const todoReducer = reducerWithInitialState(initialState)
  .case(add_todo, (state, payload) => ({
    ...state,
    nextId: state.nextId + 1,
    todos: state.todos.concat({
      id: state.nextId,
      title: payload,
      deadLine: moment().add("days", 1).toLocaleString(),
      finish: false,
    }),
  }))
  .case(update_todo, (state, payload) => ({
    ...state,
    todos: updateTodo(state.todos, payload),
  }))
  .case(delete_todo, (state, payload) => ({
    ...state,
    todos: state.todos.filter((item) => item.id !== payload),
  }));
