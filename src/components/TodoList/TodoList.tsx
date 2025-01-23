import { useEffect } from "react";
import { todoListKey } from "../../constants/constants";
import { TodoListData } from "../types/types";
import styles from "./todoList.module.scss";

interface TodoList {
  todoList: TodoListData[];
  setTodoList: React.Dispatch<React.SetStateAction<TodoListData[]>>;
}

export const TodoList = ({ todoList, setTodoList }: TodoList) => {
  useEffect(() => {
    const todoList = localStorage.getItem(todoListKey);
    if (todoList) {
      setTodoList(JSON.parse(todoList));
    }
  }, []);

  return (
    <ul className={`list-reset`}>
      {todoList.map((item, index) => (
        <li key={index}>
          <p>{item.id}</p>
          <p>{item.text}</p>
          <p>{item.status}</p>
        </li>
      ))}
    </ul>
  );
};
