import { Status } from "../../constants/constants";
import { TodoListState } from "../../types/types";
import { getItemFromLocalStorage } from "../../utils/localStorageActions";
import styles from "./controlPanel.module.scss";

export const ControlPanel = ({ taskList, setTaskList }: TodoListState) => {
  const handleAll = () => {
    const data = getItemFromLocalStorage();
    if (data) {
      setTaskList(data);
    } else {
      return;
    }
  };

  const handleActive = () => {
    const data = getItemFromLocalStorage();
    if (data) {
      const filteredData = data.filter((item) => item.status === Status.Active);
      setTaskList(filteredData);
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
    } else {
      return;
    }
  };

  return (
    <div className={styles.panel}>
      <ul className={`list-reset ${styles.filters}`}>
        <li className={styles.filter}>
          <button
            className={`btn-reset ${styles["filter-action"]} ${styles.all}`}
            onClick={handleAll}
          >
            All
          </button>
        </li>
        <li className={styles.filter}>
          <button
            className={`btn-reset ${styles["filter-action"]} ${styles.active}`}
            onClick={handleActive}
          >
            Active
          </button>
        </li>
        <li className={styles.filter}>
          <button
            className={`btn-reset ${styles["filter-action"]} ${styles.completed}`}
            onClick={handleCompleted}
          >
            Completed
          </button>
        </li>
      </ul>
    </div>
  );
};
