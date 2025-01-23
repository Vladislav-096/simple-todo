import { Controller, useForm } from "react-hook-form";
import { FormField } from "../FormField.tsx/FormField";
import { ChangeEvent, useState } from "react";
import styles from "./todoForm.module.scss";
import { todoListKey } from "../../constants/constants";
import { TodoData } from "../types/types";
import { nanoid } from "nanoid";

interface TodoForm {
  setTaskList: React.Dispatch<React.SetStateAction<TodoData[]>>;
}

interface FormTypes {
  task: string;
}

const required = {
  required: "Field must be filled",
};

export const TodoForm = ({ setTaskList }: TodoForm) => {
  const [taskValue, setTaskValue] = useState<string>("");
  const [isTaskFieldFocuse, setIsTaskFieldFocuse] = useState<boolean>(false);

  const handleFocus = () => {
    setIsTaskFieldFocuse(true);
  };

  const handleBlur = () => {
    setIsTaskFieldFocuse(false);
  };

  const handleChangeTask = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    clearErrors("task");
    setValue("task", value);
    setTaskValue(value);
  };

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    clearErrors,
  } = useForm<FormTypes>();

  const resetFormValues = () => {
    reset();
    setTaskValue("");
    clearErrors();
  };

  const onSubmit = (formData: FormTypes) => {
    const newTodoElement: TodoData = {
      id: nanoid(10),
      value: formData.task,
      status: false,
    };

    setTaskList((prev) => [...prev, newTodoElement]);

    const localStorageTodoList = localStorage.getItem(todoListKey);

    if (localStorageTodoList) {
      const todoList = JSON.parse(localStorageTodoList);
      const modifiedTodoList = [...todoList, newTodoElement];
      localStorage.setItem(todoListKey, JSON.stringify(modifiedTodoList));
    } else {
      localStorage.setItem(todoListKey, JSON.stringify([newTodoElement]));
    }

    resetFormValues();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <FormField
        isFocused={isTaskFieldFocuse}
        errorMessage={errors.task?.message}
        text={taskValue} // For placeholder functionality only..
        placeholder="Create Task"
      >
        <Controller
          name="task"
          control={control}
          rules={required}
          render={() => (
            <input
              className={styles.input}
              value={taskValue}
              onChange={handleChangeTask}
              type="text"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          )}
        />
      </FormField>

      <button type="submit" className={`btn-reset ${styles.submit}`}>
        Add Reminder
      </button>
    </form>
  );
};
