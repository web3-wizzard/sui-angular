// https://github.com/suiet/wallet-kit/blob/58d52f4d4a7ce9b76c4f84efb4f1e27bd12f35e6/packages/kit/src/utils/check.ts
import {Wallet} from "@mysten/wallet-standard";

export function isNonEmptyArray(value: any): boolean {
  return Array.isArray(value) && value.length > 0;
}

export function isStandardWalletAdapterCompatibleWallet(
  wallet: Wallet
) {
  return (
    "standard:connect" in wallet.features &&
    "standard:events" in wallet.features &&
    "sui:signAndExecuteTransactionBlock" in wallet.features
  );
}