import { useState } from "react";
import { TodoForm } from "../TodoForm/TodoForm";
import styles from "./todo.module.scss";

export const Todo = () => {
  const [note, setNote] = useState<string>("");

  return (
    <div className={styles.wrapper}>
      <TodoForm setNote={setNote} />
    </div>
  );
};
