import * as anchor from "@project-serum/anchor";

export const fastConnection = new anchor.web3.Connection(
  process.env.NEXT_PUBLIC_SOLANA_RPC_HOST!,
  {
    confirmTransactionInitialTimeout: 10 * 1000, // 10 Seconds
    commitment: "confirmed",
  }
);

export const slowConnection = new anchor.web3.Connection(
  process.env.NEXT_PUBLIC_SOLANA_RPC_HOST!,
  {
    confirmTransactionInitialTimeout: 180 * 1000, // 120 Seconds
    commitment: "confirmed",
  }
);
