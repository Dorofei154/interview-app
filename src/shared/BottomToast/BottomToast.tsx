import React, { memo, useEffect } from "react";
import { BottomToastProps } from "./BottomToastProps.interface";
import { TIMING_CONSTANTS } from "../../constants/timeout";
import styles from "./BottomToast.module.css";

const BottomToast: React.FC<BottomToastProps> = ({
  message,
  onClose,
  duration = TIMING_CONSTANTS.TOAST_DURATION,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={styles.container}>
      <div className={styles.toast}>
        <p className={styles.text}>{message}</p>
      </div>
    </div>
  );
};

export default memo(BottomToast);
