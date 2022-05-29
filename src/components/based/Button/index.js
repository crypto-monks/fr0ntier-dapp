import React from "react";
import MuiButton from "@mui/material/Button";

import styles from "./index.module.scss";
import clsx from "clsx";
import { ClipLoader } from "react-spinners";

const Button = ({
  children,
  theme = "primary",
  variant,
  loading,
  ...otherProps
}) => {
  return (
    <MuiButton
      className={clsx(
        styles.button,
        styles[theme],
        { [styles.loading]: loading },
        variant
      )}
      {...otherProps}
    >
      {children}
      {loading && <ClipLoader color="fff" size={18} css={{ marginLeft: 10 }} />}
    </MuiButton>
  );
};

export default Button;
