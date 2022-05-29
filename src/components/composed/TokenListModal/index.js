import React, { useState } from "react";
import clsx from "clsx";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";

import styles from "./index.module.scss";
import NumberStepper from "../../based/NumberStepper";
import Button from "../../based/Button";
import TokenWidget from "../../based/TokenWidget";
import { useOrders } from "../../../hooks/useNFTSwap";

const TokenListModal = ({ open, onClose, tokenId }) => {
  const [amount, setAmount] = useState(1);
  const { createOrder } = useOrders();

  const handleList = () => {
    createOrder(tokenId, amount.toString()).then(() => onClose());
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={styles.modal}
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={styles.paper}>
          <div className={styles.content}>
            <TokenWidget id={tokenId} variant={styles.preview} />
            <div className={styles.actions}>
              <NumberStepper onChange={(val) => setAmount(val)} />
              <Button variant={styles.list} onClick={handleList}>
                List
              </Button>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default TokenListModal;
