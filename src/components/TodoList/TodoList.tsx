import { useEffect, useState } from "react";
import { todoListKey } from "../../constants/constants";
import { TodoListData } from "../types/types";
import styles from "./todoList.module.scss";

interface TodoList {
  note: string;
}

export const TodoList = ({ note }: TodoList) => {
  const [todoList, setTodoList] = useState<TodoListData[]>([]);
  console.log("todoList", todoList);

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
