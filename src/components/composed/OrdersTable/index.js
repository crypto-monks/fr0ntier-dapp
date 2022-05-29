import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { shortenAddress, useEthers } from "@usedapp/core";
import { BigNumber } from "ethers";
import { useOrders } from "../../../hooks/useNFTSwap";

import styles from "./index.module.scss";

const OrdersTable = () => {
  const { account } = useEthers();
  const { getOrders, fillOrder, cancelOrder } = useOrders();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (account)
      getOrders().then((result) => {
        setOrders(result.orders);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  const handleOrder = (isCreatd, order) => {
    if (isCreatd) {
      cancelOrder(order);
    } else {
      fillOrder(order);
    }
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>No</th>
          <th>NFT ID</th>
          <th>Token Amount</th>
          <th>Maker</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {orders.map((row, index) => {
          const isCreated =
            String(row.order.maker).toLowerCase() ===
            String(account).toLowerCase();

          return (
            <tr key={row.order.nonce}>
              <td>{index + 1}</td>
              <td>{row.nftTokenId}</td>
              <td>
                {BigNumber.from(row.erc20TokenAmount)
                  .div(BigNumber.from(10).pow(18))
                  .toString()}
              </td>
              <td>{shortenAddress(row.order.maker)}</td>
              <td>
                <Button
                  className={styles.button}
                  onClick={() => handleOrder(isCreated, row.order)}
                >
                  {isCreated ? "Cancel" : "Approve"}
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default OrdersTable;
