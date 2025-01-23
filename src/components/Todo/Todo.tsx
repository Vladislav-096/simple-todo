import { useState } from "react";
import { TodoForm } from "../TodoForm/TodoForm";
import styles from "./todo.module.scss";
import { TodoList } from "../TodoList/TodoList";
import { TodoListData } from "../types/types";

export const Todo = () => {
  const [todoList, setTodoList] = useState<TodoListData[]>([]);

  return (
    <div className={styles.wrapper}>
      <TodoForm setTodoList={setTodoList} />
      <TodoList todoList={todoList} setTodoList={setTodoList} />
    </div>
  );
};
