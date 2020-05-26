import { createStore } from "redux";
import { todoReducer, TodoState } from "./modules/todo/reducers";

export function configureStore() {
  const store = createStore(todoReducer);

  store.subscribe(() => {
    localStorage.setItem("todos", JSON.stringify(store.getState()));
  });

  return store;
}

export type RootState = TodoState;
