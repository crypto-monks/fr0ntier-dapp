import { useEthers } from "@usedapp/core";
import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import Button from "../../components/based/Button";
import NumberStepper from "../../components/based/NumberStepper";
import { useMint } from "../../hooks/useTestNFT";

import styles from "./index.module.scss";

export default function MintPage() {
  const { account } = useEthers();
  const { state, mint } = useMint();
  const [amount, setAmount] = useState(1);

  const handleMint = () => {
    if (!account) {
      toast.error("Connect to a wallet!");
      return;
    }
    mint(amount);
  };

  const isLoading = useMemo(() => {
    return state.status === "Mining";
  }, [state]);

  return (
    <div className={styles.page}>
      <div className="description">
        Users can request new NFT tokens to be minted, no restrictions here,
        anyone can request new NFT minting free-of-charge.
      </div>
      <div className={styles.section}>
        <NumberStepper onChange={(val) => setAmount(val)} />
        <Button variant={styles.mint} onClick={handleMint} loading={isLoading}>
          {isLoading ? "Minting ..." : "Mint"}
        </Button>
      </div>
    </div>
  );
}
