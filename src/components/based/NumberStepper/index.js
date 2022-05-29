import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import styles from "./index.module.scss";

const NumberStepper = ({ onChange }) => {
  const [value, setValue] = useState(1);

  const handleChange = (newVal) => {
    setValue(newVal);
    onChange(newVal);
  };

  const handleInputChange = (ev) => {
    const val = ev.target.value;
    if (isNaN(val) || !Number(val) || Number(val) > 100) return;
    setValue(Number(val));
    onChange(Number(val));
  };

  return (
    <div className={styles.wrapper}>
      <TextField
        type="number"
        className={styles.input}
        value={value}
        onChange={handleInputChange}
      />
      <div className={styles.actions}>
        <Button
          className={styles.arrow}
          onClick={() => handleChange(Math.min(100, value + 1))}
        >
          <ArrowDropUpIcon />
        </Button>
        <Button
          className={styles.arrow}
          onClick={() => handleChange(Math.max(1, value - 1))}
        >
          <ArrowDropDownIcon />
        </Button>
      </div>
    </div>
  );
};

export default NumberStepper;
