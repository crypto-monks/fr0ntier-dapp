import clsx from "clsx";
import React from "react";

import styles from "./index.module.scss";

const TokenWidget = ({ id, variant = "", onClick, clickable = false }) => {
  return (
    <div
      className={clsx(
        styles.widget,
        { [styles.clickable]: clickable },
        variant
      )}
      onClick={onClick}
    >
      {id}
    </div>
  );
};

export default TokenWidget;
