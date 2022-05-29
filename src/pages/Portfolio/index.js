import React, { useState } from "react";
import { useEthers } from "@usedapp/core";
import TokenWidget from "../../components/based/TokenWidget";
import TokenListModal from "../../components/composed/TokenListModal";
import { useTokens } from "../../hooks/useTestNFT";
import { formatNumber } from "../../global/utils";

import styles from "./index.module.scss";

export default function PortfolioPage() {
  const { account } = useEthers();
  const tokens = useTokens(account);

  const [selectedToken, setSelectedToken] = useState(-1);
  const [modalOpened, setModalOpened] = useState(false);

  const handleClick = (tokenId) => {
    setSelectedToken(tokenId);
    setModalOpened(true);
  };

  return (
    <div className={styles.page}>
      <TokenListModal
        open={modalOpened}
        onClose={() => setModalOpened(false)}
        tokenId={selectedToken}
      />
      <div className="description">
        Users can list their NFT token for sale for any price they want using
        ERC-20 token from point 3. The sell orders have to be stored off-chain.
        You can use any persistent storage mechanism you like.
      </div>
      {!!tokens && (
        <div className={styles.tokens}>
          {tokens.map((tokenId) => (
            <TokenWidget
              key={tokenId}
              id={formatNumber(tokenId)}
              onClick={() => handleClick(formatNumber(tokenId))}
              clickable
            />
          ))}
        </div>
      )}
    </div>
  );
}
