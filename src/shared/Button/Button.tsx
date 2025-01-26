import React, { ButtonHTMLAttributes, memo } from "react";
import styles from "./Button.module.css";

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  disabled = false,
  children,
  ...props
}) => {
  return (
    <button disabled={disabled} className={styles.button} {...props}>
      {children}
    </button>
  );
};

export default memo(Button);
