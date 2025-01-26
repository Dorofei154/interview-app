import React, { memo } from "react";
import styles from "./Select.module.css";
import { SelectProps } from "./SelectProps.interface";

const CustomSelect: React.FC<SelectProps> = ({ value, onChange, options }) => {
  return (
    <div className={styles.selectContainer}>
      <select className={styles.select} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default memo(CustomSelect);
