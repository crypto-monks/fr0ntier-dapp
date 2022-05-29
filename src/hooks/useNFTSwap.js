import { NftSwapV4 } from "@traderxyz/nft-swap-sdk";
import { Ropsten, useEthers } from "@usedapp/core";
import { parseEther } from "ethers/lib/utils";
import { TEST_NFT_ADDR, TEST_TOKEN_ADDR } from "../global/constants";

export function useOrders() {
  const { library, account } = useEthers();
  let nftSwapSdk;
  try {
    nftSwapSdk = new NftSwapV4(library, library.getSigner(), Ropsten.chainId);
  } catch (error) {}

  const createOrder = async (tokenId, listAmount) => {
    const nftToken = {
      tokenAddress: TEST_NFT_ADDR,
      tokenId,
      type: "ERC721",
    };
    const listValue = {
      tokenAddress: TEST_TOKEN_ADDR,
      amount: parseEther(listAmount).toString(),
      type: "ERC20",
    };

    const approvalStatus = await nftSwapSdk.loadApprovalStatus(
      nftToken,
      account
    );

    if (!approvalStatus.contractApproved) {
      const approvalTx = await nftSwapSdk.approveTokenOrNftByAsset(
        nftToken,
        account
      );
      const approvalTxReceipt = await approvalTx.wait();
      console.log(
        `Approved ${nftToken.tokenAddress} contract to swap with 0x v4 (txHash: ${approvalTxReceipt.transactionHash})`
      );
    }

    const order = nftSwapSdk.buildOrder(nftToken, listValue, account);

    const signedOrder = await nftSwapSdk.signOrder(order);

    const postedOrder = await nftSwapSdk.postOrder(
      signedOrder,
      Ropsten.chainId
    );
    console.log("Posted order: ", postedOrder);

    return postedOrder;
  };

  const getOrders = async () => {
    const orders = await nftSwapSdk.getOrders({
      nftToken: TEST_NFT_ADDR,
    });
    console.log("Orders:", orders);
    return orders;
  };

  const fillOrder = async (signedOrder) => {
    const allocatedToken = {
      tokenAddress: signedOrder.erc20Token,
      type: "ERC20",
      amount: signedOrder.erc20TokenAmount,
    };
    const approvalStatus = await nftSwapSdk.loadApprovalStatus(
      allocatedToken,
      account
    );

    if (!approvalStatus.contractApproved) {
      const approvalTx = await nftSwapSdk.approveTokenOrNftByAsset(
        allocatedToken,
        account
      );
      const approvalTxReceipt = await approvalTx.wait();
      console.log(
        `Approved ${allocatedToken.tokenAddress} contract to swap with 0x v4 (txHash: ${approvalTxReceipt.transactionHash})`
      );
    }

    const fillTx = await nftSwapSdk.fillSignedOrder(signedOrder);
    const txReceipt = await fillTx.wait();
    console.log("Filled order! 🎉", txReceipt.transactionHash);
  };

  const cancelOrder = async (signedOrder) => {
    console.log(signedOrder.nonce);
    await nftSwapSdk.cancelOrder(signedOrder.nonce, "ERC721");
  };

  return {
    createOrder,
    getOrders,
    fillOrder,
    cancelOrder,
  };
}
