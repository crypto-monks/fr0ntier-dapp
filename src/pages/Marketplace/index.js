import React from "react";
import OrdersTable from "../../components/composed/OrdersTable";

import styles from "./index.module.scss";

export default function MarketplacePage() {
  return (
    <div className={styles.page}>
      <div className="description">
        Users can list and review all existing and yet not executed sell offers.
        <br />
        Users can accept the existing sell order from some other user and
        purchase the NFT using ERC-20 token from point 3.
      </div>
      <OrdersTable />
    </div>
  );
}
