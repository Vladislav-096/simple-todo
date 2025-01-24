import { useEffect } from "react";
import { TodoListState } from "../../types/types";
import EditIcon from "../../../public/img/edit.svg";
import RemoveIcon from "../../../public/img/remove.svg";
import styles from "./todoList.module.scss";
import {
  getItemFromLocalStorage,
  setItemToLocalStorage,
} from "../../utils/localStorageActions";

export const TodoList = ({ taskList, setTaskList }: TodoListState) => {
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
      setItemToLocalStorage(modifiedTodoList);
      setTaskList(modifiedTodoList);
    }
  };

  const handleRemove = (id: string) => {
    const modifiedTaskList = taskList.filter((item) => item.id !== id);
    setItemToLocalStorage(modifiedTaskList);
    setTaskList(modifiedTaskList);
  };

  useEffect(() => {
    const data = getItemFromLocalStorage();
    if (data) {
      setTaskList(data);
    }
  }, []);

  return (
    <ul className={`list-reset ${styles.list}`}>
      {taskList.map((item, index) => (
        <li className={styles.task} key={index}>
          <div className={styles.text}>
            <p className={styles.value}>{item.value}</p>
            <div
              className={`${styles.line} ${
                item.status === "COMPLETED" && styles["show-line"]
              }`}
            ></div>
          </div>
          <div className={styles.actions}>
            <button
              className={`btn-reset ${styles.action}`}
              onClick={() => handleStatus(item.id)}
            >
              <img className={styles.img} src={EditIcon} alt="Edit Icon" />
            </button>
            <button
              className={`btn-reset ${styles.action}`}
              onClick={() => handleRemove(item.id)}
            >
              <img className={styles.img} src={RemoveIcon} alt="Remove Icon" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
