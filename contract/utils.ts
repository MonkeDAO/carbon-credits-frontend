import * as anchor from "@project-serum/anchor";
import axios from "axios";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  createInitializeMintInstruction,
  createMintToInstruction,
  getAssociatedTokenAddress,
  MintLayout,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import { slowConnection } from "solanacodes/config";
import { Carbon, IDL } from "./carbon";

const CONTRACT_ID = process.env.NEXT_PUBLIC_CONTRACT_ID!;
const TOKEN_MINT = process.env.NEXT_PUBLIC_TOKEN_MINT!;
const ADMIN_WALLET = process.env.NEXT_PUBLIC_ADMIN_WALLET!;

export const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

export const getMasterEditionAccount = async (
  mint: anchor.web3.PublicKey
): Promise<anchor.web3.PublicKey> => {
  return (
    await anchor.web3.PublicKey.findProgramAddress(
      [
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
        Buffer.from("edition"),
      ],
      TOKEN_METADATA_PROGRAM_ID
    )
  )[0];
};

export const getMetadataAccount = async (
  mint: anchor.web3.PublicKey
): Promise<anchor.web3.PublicKey> => {
  return (
    await anchor.web3.PublicKey.findProgramAddress(
      [
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
      ],
      TOKEN_METADATA_PROGRAM_ID
    )
  )[0];
};

export const getAllPDAs = async (prog: anchor.Program<Carbon>) => {
  const [mintConfig, mintConfigBump] =
    await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("config")],
      prog.programId
    );

  const [newNftCreator, newNftCreatorBump] =
    await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("carbon")],
      prog.programId
    );

  return {
    mintConfig,
    mintConfigBump,
    newNftCreator,
    newNftCreatorBump,
  };
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID =
  new anchor.web3.PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL");

export const getAtaForMint = async (
  mint: anchor.web3.PublicKey,
  buyer: anchor.web3.PublicKey
): Promise<[anchor.web3.PublicKey, number]> => {
  return await anchor.web3.PublicKey.findProgramAddress(
    [buyer.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
    SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
  );
};

export const loadCarbonProgram = (
  connection: anchor.web3.Connection,
  wallet: anchor.Wallet
): anchor.Program<Carbon> => {
  const provider = new anchor.Provider(connection, wallet, {
    skipPreflight: true,
    commitment: "finalized",
  });

  const program: any = new anchor.Program(
    IDL as anchor.Idl,
    CONTRACT_ID,
    provider
  );
  return program;
};

export const mintCarbonCredit = async (
  program: anchor.Program<Carbon>,
  wallet: anchor.Wallet,
  amount: number
) => {
  const { mintConfig, newNftCreator } = await getAllPDAs(program);
  const mintKeyPk = new PublicKey(TOKEN_MINT);
  const adminWalletPk = new PublicKey(ADMIN_WALLET);

  const carbonCreditReceiptKp = anchor.web3.Keypair.generate();
  const newNftKp = await anchor.web3.Keypair.generate();
  const newNftMint = newNftKp.publicKey;
  const newNftMetadata = await getMetadataAccount(newNftMint);
  const newNftMasterEdition = await getMasterEditionAccount(newNftMint);

  const rent =
    await program.provider.connection.getMinimumBalanceForRentExemption(
      MintLayout.span
    );

  const newNftToken = (
    await PublicKey.findProgramAddress(
      [
        wallet.publicKey.toBuffer(),
        TOKEN_PROGRAM_ID.toBuffer(),
        newNftMint.toBuffer(),
      ],
      ASSOCIATED_TOKEN_PROGRAM_ID
    )
  )[0];

  const transaction = new anchor.web3.Transaction();

  transaction.add(
    anchor.web3.SystemProgram.createAccount({
      fromPubkey: wallet.publicKey,
      newAccountPubkey: newNftMint,
      space: MintLayout.span,
      lamports: rent,
      programId: TOKEN_PROGRAM_ID,
    }),
    createInitializeMintInstruction(
      newNftMint,
      0,
      wallet.publicKey,
      wallet.publicKey
    ),
    createAssociatedTokenAccountInstruction(
      wallet.publicKey,
      newNftToken,
      wallet.publicKey,
      newNftMint
    ),
    createMintToInstruction(newNftMint, newNftToken, wallet.publicKey, 1, [
      newNftKp,
    ])
  );

  const purchaseTokenAccount = await getAssociatedTokenAddress(
    mintKeyPk,
    wallet.publicKey
  );

  const adminSplTokenAccount = await getAssociatedTokenAddress(
    mintKeyPk,
    adminWalletPk
  );

  transaction.add(
    program.instruction.carbonCredit(new anchor.BN(amount), {
      accounts: {
        user: wallet.publicKey,
        purchaseTokenMint: mintKeyPk,
        purchaseTokenAccount: purchaseTokenAccount,
        carbonReceipt: carbonCreditReceiptKp.publicKey,
        mintConfig: mintConfig,
        newNftMint: newNftMint,
        newNftMetadata: newNftMetadata,
        newNftMasterEdition: newNftMasterEdition,
        newNftCreator: newNftCreator,
        admin: adminWalletPk,
        adminSplTokenAccount: adminSplTokenAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
        nftProgramId: TOKEN_METADATA_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        systemProgram: anchor.web3.SystemProgram.programId,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        time: anchor.web3.SYSVAR_CLOCK_PUBKEY,
      },
    })
  );

  const txSign = await program.provider.send(transaction, [
    carbonCreditReceiptKp,
    newNftKp,
  ]);
  const txSignString = await slowConnection.confirmTransaction(txSign);
  console.log("txSignString", txSignString);
  console.log("txSign", txSign);
};

export const getMintConfigState = async (program: anchor.Program<Carbon>) => {
  const { mintConfig } = await getAllPDAs(program);
  const mintConfigState = await program.account.mintConfig.fetch(mintConfig);
  return {
    purchaseTokenMint: mintConfigState.purchaseTokenMint.toBase58(),
    oneCreditPrice: mintConfigState.oneCreditPrice.toNumber(),
    creator: mintConfigState.creator.toBase58(),
  };
};

export const getUserPurchaseHistory = async (
  program: anchor.Program<Carbon>,
  wallet: anchor.Wallet
) => {
  if (!wallet?.publicKey) {
    return [];
  }
  const carbonReceiptList = await program.account.carbonReceipt.all([
    {
      memcmp: {
        offset: 8,
        bytes: wallet.publicKey.toBase58(),
      },
    },
  ]);
  return carbonReceiptList.map((receipt) => ({
    buyer: receipt.account.buyer.toBase58(),
    mint: receipt.account.mint.toBase58(),
    time: receipt.account.time.toNumber(),
    amount: receipt.account.amount.toNumber(),
    isExpired: receipt.account.isExpired,
  }));
};

export const getSolPrice = async () => {
  try {
    const result = await axios.get(
      "https://api.binance.com/api/v3/ticker/price?symbol=SOLUSDT"
    );
    return result.data.price;
  } catch (error) {
    return null;
  }
};
