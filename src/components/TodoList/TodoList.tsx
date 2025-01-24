import { useEffect } from "react";
import { Status, TodoData } from "../../types/types";
// import EditIcon from "../../../public/img/edit.svg";
// import RemoveIcon from "../../../public/img/remove.svg";
import EditIcon from "../../assets/edit.svg";
import RemoveIcon from "../../assets/remove.svg";
import styles from "./todoList.module.scss";
import {
  getItemFromLocalStorage,
  setItemToLocalStorage,
} from "../../utils/localStorageActions";

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
            <div className={styles.value}>
              <span className={styles.note}>
                <span>{item.value}</span>
                <div
                  className={`${styles.line} ${
                    item.status === Status.Completed && styles["show-line"]
                  }`}
                ></div>
              </span>
            </div>
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
