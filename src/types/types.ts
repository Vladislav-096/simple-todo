export interface TodoData {
  id: string;
  status: string;
  value: string;
}

export interface TodoListState {
  taskList: TodoData[];
  setTaskList: React.Dispatch<React.SetStateAction<TodoData[]>>;
}
