import { useEffect } from "react";
import { todoListKey } from "../../constants/constants";
import { TodoData } from "../../types/types";
import EditIcon from "../../../public/img/edit.svg";
import RemoveIcon from "../../../public/img/remove.svg";
import styles from "./todoList.module.scss";

interface TodoList {
  taskList: TodoData[];
  setTaskList: React.Dispatch<React.SetStateAction<TodoData[]>>;
}

export const TodoList = ({ taskList, setTaskList }: TodoList) => {
  const handleStatus = (id: string) => {
    const currentTask = taskList.find((item) => item.id === id);
    if (currentTask) {
      const modifiedTodo = {
        ...currentTask,
        status: currentTask.status === "ACTIVE" ? "COMPLETED" : "ACTIVE",
      };
      const modifiedTodoList = taskList.map((item) =>
        item.id === id ? modifiedTodo : item
      );
      localStorage.setItem(todoListKey, JSON.stringify(modifiedTodoList));
      setTaskList(modifiedTodoList);
    }
  };

  const handleRemove = (id: string) => {
    const modifiedTaskList = taskList.filter((item) => item.id !== id);
    localStorage.setItem(todoListKey, JSON.stringify(modifiedTaskList));
    setTaskList(modifiedTaskList);
  };

  useEffect(() => {
    const todoList = localStorage.getItem(todoListKey);
    if (todoList) {
      setTaskList(JSON.parse(todoList));
    }
  }, []);

  return (
    <ul className={`list-reset`}>
      {taskList.map((item, index) => (
        <li className={styles.task} key={index}>
          <div className={styles.text}>
            <p className={styles.value}>{item.value}</p>
            <div
              className={`${styles.line} ${
                item.status === "ACTIVE" && styles["show-line"]
              }`}
            ></div>
          </div>
          <div className={styles.actions}>
            <button
              className={`btn-reset ${styles.action}`}
              onClick={() => handleStatus(item.id)}
            >
              <img className={styles.edit} src={EditIcon} alt="Edit Icon" />
            </button>
            <button
              className={`btn-reset ${styles.action}`}
              onClick={() => handleRemove(item.id)}
            >
              <img className={styles.edit} src={RemoveIcon} alt="Remove Icon" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
