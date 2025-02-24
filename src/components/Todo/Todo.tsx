import { useState } from "react";
import { TodoForm } from "../TodoForm/TodoForm";
import styles from "./todo.module.scss";
import { TodoList } from "../TodoList/TodoList";
import { TodoData } from "../../types/types";
import { ControlPanel } from "../ControlPanel/ControlPanel";

export const Todo = () => {
  const [taskList, setTaskList] = useState<TodoData[]>([]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <TodoForm setTaskList={setTaskList} />
        <div className={styles["todo-main"]}>
          <TodoList taskList={taskList} setTaskList={setTaskList} />
          <ControlPanel setTaskList={setTaskList} />
        </div>
      </div>
    </div>
  );
};
