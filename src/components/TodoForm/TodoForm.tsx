import { Controller, useForm } from "react-hook-form";
import { FormField } from "../FormField.tsx/FormField";
import { ChangeEvent, useState } from "react";
import styles from "./todoForm.module.scss";
import { Status, TodoData } from "../../types/types";
import { generateId } from "../../utils/generateId";
import {
  getItemFromLocalStorage,
  setItemToLocalStorage,
} from "../../utils/localStorageActions";

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
      id: generateId(),
      value: formData.task,
      status: Status.Active,
    };

    setTaskList((prev) => [...prev, newTodoElement]);

    const data = getItemFromLocalStorage();

    if (data) {
      const modifiedTodoList: TodoData[] = [...data, newTodoElement];
      setItemToLocalStorage(modifiedTodoList);
    } else {
      setItemToLocalStorage([newTodoElement]);
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
        Add Task
      </button>
    </form>
  );
};
