import { Controller, useForm } from "react-hook-form";
import { FormField } from "../FormField.tsx/FormField";
import { ChangeEvent, useState } from "react";
import styles from "./todoForm.module.scss";
import { todoListKey } from "../../constants/constants";
import { TodoListData } from "../types/types";
import { nanoid } from "nanoid";

interface TodoForm {
  setTodoList: React.Dispatch<React.SetStateAction<TodoListData[]>>;
}

interface FormTypes {
  note: string;
}

const requiredAndText = {
  required: "Field must be filled",
};

export const TodoForm = ({ setTodoList }: TodoForm) => {
  const [text, setText] = useState<string>("");
  const [isTextFieldFocuse, setIsTextFieldFocuse] = useState<boolean>(false);

  const handleFocus = () => {
    setIsTextFieldFocuse(true);
  };

  const handleBlur = () => {
    setIsTextFieldFocuse(false);
  };

  const handleChangeNote = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    clearErrors("note");
    setValue("note", value);
    setText(value);
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
    setText("");
    clearErrors();
  };

  const onSubmit = (formData: FormTypes) => {
    const newTodoElement: TodoListData = {
      id: nanoid(10),
      text: formData.note,
      status: false,
    };

    setTodoList((prev) => [...prev, newTodoElement]);

    const localStorageTodoList = localStorage.getItem(todoListKey);

    if (localStorageTodoList) {
      const todoList = JSON.parse(localStorageTodoList);
      const newLocalStorageTodoList = [...todoList, newTodoElement];
      localStorage.setItem(
        todoListKey,
        JSON.stringify(newLocalStorageTodoList)
      );
    } else {
      localStorage.setItem(todoListKey, JSON.stringify([newTodoElement]));
    }

    resetFormValues();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <FormField
        isFocused={isTextFieldFocuse}
        errorMessage={errors.note?.message}
        text={text} // For placeholder functionality only..
        placeholder="New Reminder"
      >
        <Controller
          name="note"
          control={control}
          rules={requiredAndText}
          render={() => (
            <input
              className={styles.input}
              value={text}
              onChange={handleChangeNote}
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
