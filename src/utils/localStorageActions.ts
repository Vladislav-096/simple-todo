import { TodoData } from "../types/types";

const todoListKey = "todoList";

export const setItemToLocalStorage = (todoList: TodoData[]) => {
  localStorage.setItem(todoListKey, JSON.stringify(todoList));
};

export const getItemFromLocalStorage = () => {
  const data = localStorage.getItem(todoListKey);

  if (data) {
    return JSON.parse(data) as TodoData[];
  } else {
    return [];
  }
};
