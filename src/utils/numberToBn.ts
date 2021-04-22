import { BigNumber, ethers } from "ethers";
import { ETH_DECIMALS } from "../constants";

export function numberToBn(
  num: number | string,
  decimals = ETH_DECIMALS
): BigNumber {
  let numStr = (num || 0).toString();
  const numDecimals = (numStr.split(".")[1] || "").length;

  if (numDecimals > decimals) {
    const decimalPointIndex = numStr.indexOf(".");
    numStr = numStr.substring(0, decimalPointIndex + decimals + 1);
  }

  return ethers.utils.parseUnits(`${numStr}`, decimals);
}
