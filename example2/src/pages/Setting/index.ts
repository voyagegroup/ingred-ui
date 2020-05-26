import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Setting as Component } from "./Setting";
import { update_todo, delete_todo } from "../../store/modules/todo/actions";
import { RootState } from "../../store";

const mapStateToProps = (state: RootState) => {
  return {
    todos: state.todos,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    deleteTodo: (id: number) => dispatch(delete_todo(id)),
    updateTodo: (todo: Todo) => dispatch(update_todo(todo)),
  };
};

export const SettingView = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
