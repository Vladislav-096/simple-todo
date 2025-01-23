import { ReactNode } from "react";
import styles from "./formField.module.scss";

export interface FormField {
  isFocused: boolean;
  errorMessage?: string;
  text: string;
  placeholder?: string;
  children: ReactNode;
}

export const FormField = ({
  isFocused,
  errorMessage,
  text,
  placeholder,
  children,
}: FormField) => {
  return (
    <div className={styles["form-field"]}>
      <div className={styles["input-wrapper"]}>
        {children}
        {(text || isFocused) && <div className={styles["hide-border"]}></div>}
        <span
          className={`${styles.placeholder} ${
            text || isFocused ? styles.withText : ""
          }`}
        >
          {placeholder}
        </span>
      </div>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </div>
  );
};
