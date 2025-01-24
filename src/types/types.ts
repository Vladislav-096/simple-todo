export enum Status {
  Completed = "COMPLETED",
  Active = "ACTIVE",
}

export enum Tabs {
  All = "ALL",
  Active = "ACTIVE",
  Completed = "COMPLETED",
}

export interface TodoData {
  id: string;
  status: string;
  value: string;
}

export interface TodoListState {
  taskList: TodoData[];
  setTaskList: React.Dispatch<React.SetStateAction<TodoData[]>>;
}
