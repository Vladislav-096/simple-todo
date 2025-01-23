import { useEffect } from "react";
import { todoListKey } from "../../constants/constants";
import { TodoData } from "../types/types";
import styles from "./todoList.module.scss";

interface TodoList {
  taskList: TodoData[];
  setTaskList: React.Dispatch<React.SetStateAction<TodoData[]>>;
}

export const TodoList = ({ taskList, setTaskList }: TodoList) => {
  const handleStatus = (id: string) => {
    const currentTask = taskList.find((item) => item.id === id);
    if (currentTask) {
      const modifiedTodo = { ...currentTask, status: !currentTask?.status };
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
        <li key={index}>
          <p>{item.value}</p>
          <p>{item.status.toString()}</p>
          <button onClick={() => handleStatus(item.id)}>change status</button>
          <button onClick={() => handleRemove(item.id)}>remove elemetn</button>
        </li>
      ))}
    </ul>
  );
};
