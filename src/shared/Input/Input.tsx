import React, { memo } from "react";
import styles from "./Input.module.css";
import { InputProps } from "./InputProps.interface";

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
}) => {
  return (
    <div className={styles.inputContainer}>
      <input
        className={styles.input}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default memo(Input);
