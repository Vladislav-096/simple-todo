import { useState } from "react";
import { Status, Tabs, TodoListState } from "../../types/types";
import {
  getItemFromLocalStorage,
  setItemToLocalStorage,
} from "../../utils/localStorageActions";
import styles from "./controlPanel.module.scss";

type Tab = "ALL" | "COMPLETED" | "ACTIVE";

export const ControlPanel = ({ taskList, setTaskList }: TodoListState) => {
  const [tab, setTab] = useState<Tab>(Tabs.All);

  const tasksLeft = getItemFromLocalStorage()
    .filter((item) => item.status === Status.Active)
    .length.toString();

  const handleAll = () => {
    const data = getItemFromLocalStorage();
    if (data) {
      setTaskList(data);
      setTab(Tabs.All);
    } else {
      return;
    }
  };

  const handleActive = () => {
    const data = getItemFromLocalStorage();
    if (data) {
      const filteredData = data.filter((item) => item.status === Status.Active);
      setTaskList(filteredData);
      setTab(Tabs.Active);
    } else {
      return;
    }
  };

  const handleCompleted = () => {
    const data = getItemFromLocalStorage();
    if (data) {
      const filteredData = data.filter(
        (item) => item.status === Status.Completed
      );
      setTaskList(filteredData);
      setTab(Tabs.Completed);
    } else {
      return;
    }
  };

  const handleClear = () => {
    const data = getItemFromLocalStorage();
    if (data) {
      const filteredData = data.filter(
        (item) => item.status !== Status.Completed
      );
      setItemToLocalStorage(filteredData);
      setTaskList(filteredData);
    } else {
      return;
    }
  };

  return (
    <div className={styles.panel}>
      <ul className={`list-reset ${styles.filters}`}>
        <li className={styles.filter}>
          <button
            className={`btn-reset ${styles["filter-action"]} ${styles.all} ${
              tab === Tabs.All ? styles.selected : ""
            }`}
            onClick={handleAll}
          >
            All
          </button>
        </li>
        <li className={styles.filter}>
          <button
            className={`btn-reset ${styles["filter-action"]} ${styles.active} ${
              tab === Tabs.Active ? styles.selected : ""
            }`}
            onClick={handleActive}
          >
            Active
          </button>
        </li>
        <li className={styles.filter}>
          <button
            className={`btn-reset ${styles["filter-action"]} ${
              styles.completed
            } ${tab === Tabs.Completed ? styles.selected : ""}`}
            onClick={handleCompleted}
          >
            Completed
          </button>
        </li>
      </ul>
      <ul className={`list-reset ${styles.actions}`}>
        <li className={styles.info}>
          <p>
            {tasksLeft}{" "}
            {Number(tasksLeft) > 1 ? (
              <span>tasks left</span>
            ) : (
              <span>task left</span>
            )}
          </p>
        </li>
        <li className={styles.action}>
          <button className={`btn-reset ${styles.clear}`} onClick={handleClear}>
            Clear Completed
          </button>
        </li>
      </ul>
    </div>
  );
};
