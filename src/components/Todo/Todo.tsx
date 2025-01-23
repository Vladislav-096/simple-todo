import { useState } from "react";
import { TodoForm } from "../TodoForm/TodoForm";
import styles from "./todo.module.scss";
import { TodoList } from "../TodoList/TodoList";
import { TodoData } from "../types/types";

export const Todo = () => {
  const [taskList, setTaskList] = useState<TodoData[]>([]);

  return (
    <div className={styles.wrapper}>
      <TodoForm setTaskList={setTaskList} />
      <TodoList taskList={taskList} setTaskList={setTaskList} />
    </div>
  );
};
