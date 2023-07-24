import {
  PublicKey,
  TransactionInstruction,
  AccountMeta,
} from "@solana/web3.js";
import { Program, BN } from "@coral-xyz/anchor";
import { AmmV3 } from "../../anchor/amm_v3";

export function swapRouterBaseInInstruction(
  program: Program<AmmV3>,
  args: {
    amountIn: BN;
    amountOutMinimum: BN;
  },
  accounts: {
    payer: PublicKey;
    inputTokenAccount: PublicKey;
    inputTokenMint: PublicKey;
    tokenProgram: PublicKey;
    tokenProgram2022: PublicKey;
    memoProgram: PublicKey;
    remainings: AccountMeta[];
  }
): Promise<TransactionInstruction> {
  const { amountIn, amountOutMinimum } = args;

  const {
    payer,
    inputTokenAccount,
    inputTokenMint,
    tokenProgram,
    tokenProgram2022,
    memoProgram
  } = accounts;

  return program.methods
    .swapRouterBaseIn(amountIn, amountOutMinimum)
    .accounts({
      payer,
      inputTokenAccount,
      inputTokenMint,
      tokenProgram,
      tokenProgram2022,
      memoProgram
    })
    .remainingAccounts(accounts.remainings)
    .instruction();
}
