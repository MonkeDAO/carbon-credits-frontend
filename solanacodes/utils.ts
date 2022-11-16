import * as anchor from "@project-serum/anchor";
import type { AnchorWallet } from "@solana/wallet-adapter-react";
import type { Transaction } from "@solana/web3.js";
import { Keypair } from "@solana/web3.js";

const emptyKeypair = Keypair.generate();
export const emptyAnchorWallet: any = {
  signTransaction: () => {
    return undefined;
  },
  signAllTransactions: () => {
    return undefined;
  },
  publicKey: emptyKeypair.publicKey,
};

export const getSlowConnection = (rpc: any) =>
  new anchor.web3.Connection(rpc, {
    confirmTransactionInitialTimeout: 180 * 1000, // 180 Seconds
    commitment: "confirmed",
  });

export const getFastConnection = (rpc: any) =>
  new anchor.web3.Connection(rpc, {
    confirmTransactionInitialTimeout: 10 * 1000, // 10 Seconds
    commitment: "confirmed",
  });

export const sendAndConfirmTransactionWithRetries = async (
  rpc: string,
  transaction: Transaction
) => {
  const fastConnection = getFastConnection(rpc);
  const slowConnection = getSlowConnection(rpc);

  let txSign = undefined;
  for (let i = 0; i <= 20; i++) {
    try {
      txSign = await fastConnection.sendRawTransaction(
        transaction.serialize(),
        {}
      );
      console.log(`Transaction sent(${i}): ${txSign}`);
      const result = await fastConnection.confirmTransaction(
        txSign,
        "finalized"
      );
      // check by querying if transaction is successful
      const txStatus = await slowConnection.getTransaction(txSign, {
        commitment: "confirmed",
      });
      const isTxStatusNull = txStatus === null;
      if (!isTxStatusNull) {
        return txSign;
      }
    } catch (error: any) {
      const errorMessage = error?.message;
      if (errorMessage) {
        if (
          errorMessage.includes("This transaction has already been processed")
        ) {
          if (txSign) {
            console.log(
              `Transaction already processed: ${txSign}, waiting for finalized`
            );
            await slowConnection.confirmTransaction(txSign, "finalized");
            // check by querying if transaction is successful
            const txStatus = await slowConnection.getTransaction(txSign, {
              commitment: "confirmed",
            });
            const isTxStatusNull = txStatus === null;
            if (!isTxStatusNull) {
              return txSign;
            }
          }
        }
        if (errorMessage.includes("Blockhash not found")) {
          if (txSign) {
            console.log(`Checking if ${txSign} is finalized`);
            await slowConnection.confirmTransaction(txSign, "finalized");
            // check by querying if transaction is successful
            const txStatus = await slowConnection.getTransaction(txSign, {
              commitment: "confirmed",
            });
            const isTxStatusNull = txStatus === null;
            if (!isTxStatusNull) {
              return txSign;
            }
          }
          console.log({ error });
          return undefined;
        }
      }
      console.log({ error, errorMessage: error?.message });
      if (i === 20) {
        return undefined;
      }
    }
  }
};

export const sendAndConfirmTransactionListCustom1 = async (
  wallet: AnchorWallet,
  connection: any,
  transactionList: Transaction[]
) => {
  const recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
  const transactionWithBlockhashList = transactionList.map((transaction) => {
    transaction.recentBlockhash = recentBlockhash;
    transaction.feePayer = wallet.publicKey;
    return transaction;
  });
  let resultList = [];
  if (wallet.signAllTransactions) {
    const signedTransactionList = await wallet.signAllTransactions(
      transactionWithBlockhashList
    );
    const sendPromises = signedTransactionList.map(
      async (transaction) =>
        await sendAndConfirmTransactionWithRetries(
          connection.rpcEndpoint || connection._rpcEndpoint,
          transaction
        )
    );
    resultList = await Promise.all(sendPromises);
  } else {
    for (const transaction of transactionWithBlockhashList) {
      const signedTransaction = await wallet.signTransaction(transaction);
      const result = await sendAndConfirmTransactionWithRetries(
        connection.rpcEndpoint || connection._rpcEndpoint,
        signedTransaction
      );
      resultList.push(result);
    }
  }
  const numFailedTransactions = resultList.filter(
    (result) => result === undefined
  ).length;
  if (numFailedTransactions > 0) {
    throw new Error(
      `Out of ${transactionList.length}, ${numFailedTransactions} failed`
    );
  }
  return resultList;
};
