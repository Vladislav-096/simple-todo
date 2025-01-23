import { ReactNode } from "react";
import styles from "./formField.module.scss";

export interface FormField {
  // label: string;
  isFocused: boolean;
  errorMessage?: string;
  text: string;
  placeholder?: string;
  children: ReactNode;
}

export const FormField = ({
  // label,
  isFocused,
  errorMessage,
  text,
  placeholder,
  children,
}: FormField) => {
  return (
    <div className={styles["form-field"]}>
      {/* <label className={styles.label}>{label}</label> */}
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
