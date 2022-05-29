import React from "react";
import clsx from "clsx";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { useEthers } from "@usedapp/core";
import { injected, walletconnect } from "../../../global/connectors";

import styles from "./index.module.scss";

const WalletConnectionModal = ({ open, onClose }) => {
  const { account, activate, connector } = useEthers();

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
            <Button
              className={clsx(styles.button, {
                [styles.selected]: account && connector === injected,
              })}
              onClick={() => {
                activate(injected);
                onClose();
              }}
              fullWidth
            >
              <img src="images/wallet/metamask.svg" alt="metamask" />
              <span className={styles.inner}>
                Metamask
                <small>Connect to your MetaMask Wallet</small>
              </span>
            </Button>
            <Button
              className={clsx(styles.button, {
                [styles.selected]: account && connector === walletconnect,
              })}
              onClick={() => {
                activate(walletconnect);
                onClose();
              }}
              fullWidth
            >
              <img src="images/wallet/walletconnect.svg" alt="walletconnect" />
              <span className={styles.inner}>
                WalletConnect
                <small>Scan with WalletConnect to connect</small>
              </span>
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default WalletConnectionModal;
