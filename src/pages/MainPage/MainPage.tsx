import { Todo } from "../../components/Todo/Todo";
import styles from "./mainPage.module.scss";

export const MainPage = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <Todo />
      </div>
    </section>
  );
};
