import { Controller, useForm } from "react-hook-form";
import { FormField } from "../FormField.tsx/FormField";
import { ChangeEvent, useState } from "react";
import styles from "./todoForm.module.scss";

interface TodoForm {
  setNote: React.Dispatch<React.SetStateAction<string>>;
}

interface FormTypes {
  note: string;
}

const requiredAndText = {
  required: "Field must be filled",
};

export const TodoForm = ({ setNote }: TodoForm) => {
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
    setNote(formData.note);
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
