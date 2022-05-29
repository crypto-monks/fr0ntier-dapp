import { Button } from "@mui/material";
import { shortenAddress, useEthers, useTokenBalance } from "@usedapp/core";
import clsx from "clsx";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { APP_ROUTES } from "../../../global/routes";
import { useBalanceOf } from "../../../hooks/useTestNFT";
import WalletConnectionModal from "../../composed/WalletConnectionModal";
import { formatAmount, formatNumber } from "../../../global/utils";

import styles from "./index.module.scss";
import { TEST_TOKEN_ADDR } from "../../../global/constants";

export default function Navbar() {
  const location = useLocation();
  const { account } = useEthers();
  const balance = useBalanceOf(account);
  const tokenBalance = useTokenBalance(TEST_TOKEN_ADDR, account);

  const [modalOpened, setModalOpened] = useState(false);

  return (
    <div className={styles.nav}>
      <WalletConnectionModal
        open={modalOpened}
        onClose={() => setModalOpened(false)}
      />
      <div className={styles.menubar}>
        {APP_ROUTES.filter((route) => route.isNavLinked).map((route) => (
          <Link
            to={route.path}
            key={route.path}
            className={clsx(styles.menu, {
              [styles.selected]: location.pathname.startsWith(route.path),
            })}
          >
            {route.title}
            {balance &&
              !!formatNumber(balance) &&
              route.title === "Portfolio" && (
                <div className={styles.badge}>{formatNumber(balance)}</div>
              )}
          </Link>
        ))}
      </div>
      <Button
        className={styles.connect}
        onClick={() => setModalOpened(true)}
        disabled={!!account}
      >
        {account
          ? `${shortenAddress(account)} (${formatAmount(tokenBalance)} TT)`
          : "Connect"}
      </Button>
    </div>
  );
}
