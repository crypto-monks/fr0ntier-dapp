import { Contract } from "@ethersproject/contracts";
import { useCall, useContractFunction } from "@usedapp/core";
import { Interface } from "@ethersproject/abi";
import TestNFTABI from "../global/abis/TestNFT.json";
import { TEST_NFT_ADDR } from "../global/constants";
import { useEffect } from "react";
import toast from "react-hot-toast";

const abi = new Interface(TestNFTABI);
const contract = new Contract(TEST_NFT_ADDR, abi);

export function useBalanceOf(accountAddress) {
  const { value, error } =
    useCall({
      contract,
      method: "balanceOf",
      args: [accountAddress],
    }) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value?.[0];
}

export function useTokens(accountAddress) {
  const { value, error } =
    useCall({
      contract,
      method: "tokensOfOwner",
      args: [accountAddress],
    }) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value?.[0];
}

export function useMint() {
  const { state, resetState, send } = useContractFunction(contract, "mint");

  useEffect(() => {
    if (state.status === "Success") {
      toast.success("Minted successfully!");
      resetState();
      return;
    }
    if (state.status === "Exception" || state.status === "Fail") {
      toast.error(state.errorMessage);
      resetState();
    }
  }, [state, resetState]);

  return {
    state,
    mint: send,
  };
}
