import { formatUnits } from "@ethersproject/units";

export function formatAmount(value, decimals = 18, fractionDigits = 2) {
  return Number(formatUnits(value || "0", decimals)).toLocaleString("en-US", {
    maximumFractionDigits: fractionDigits,
  });
}

export function formatNumber(value) {
  return Number(value.toString());
}
