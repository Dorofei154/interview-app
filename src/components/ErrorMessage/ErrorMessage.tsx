import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ErrorMessage.module.css";
import { ErrorMessageProps } from "./ErrorMessageProps.interface";
import { Button } from "../../shared";

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Oops! 😔</h1>
        <p className={styles.text}>{message}</p>
        <Button onClick={() => navigate(-1)}>Go back</Button>
      </div>
    </div>
  );
};

export default memo(ErrorMessage);
