import {
  PublicKey,
  TransactionInstruction,
  AccountMeta,
} from "@solana/web3.js";
import { Program, BN } from "@coral-xyz/anchor";
import { AmmV3 } from "../../anchor/amm_v3";


export function swapV2Instruction(
  program: Program<AmmV3>,
  args: {
    amount: BN;
    otherAmountThreshold: BN;
    sqrtPriceLimitX64: BN;
    isBaseInput: boolean;
  },
  accounts:  {
    payer: PublicKey;
    ammConfig: PublicKey;
    poolState: PublicKey;
    inputTokenAccount: PublicKey;
    outputTokenAccount: PublicKey;
    inputVault: PublicKey;
    outputVault: PublicKey;
    inputVaultMint: PublicKey;
    outputVaultMint: PublicKey;
    observationState: PublicKey;
    tokenProgram: PublicKey;
    tokenProgram2022: PublicKey;
    remainings: AccountMeta[];
  }
): Promise<TransactionInstruction> {
  const { amount, otherAmountThreshold, sqrtPriceLimitX64, isBaseInput } = args;
  return program.methods
    .swapV2(amount, otherAmountThreshold, sqrtPriceLimitX64, isBaseInput)
    .accounts(accounts)
    .remainingAccounts(accounts.remainings)
    .instruction();
}

export function swapInstruction(
  program: Program<AmmV3>,
  args: {
    amount: BN;
    otherAmountThreshold: BN;
    sqrtPriceLimitX64: BN;
    isBaseInput: boolean;
  },
  accounts:  {
    payer: PublicKey;
    ammConfig: PublicKey;
    poolState: PublicKey;
    inputTokenAccount: PublicKey;
    outputTokenAccount: PublicKey;
    inputVault: PublicKey;
    outputVault: PublicKey;
    observationState: PublicKey;
    tokenProgram: PublicKey;
    tickArray: PublicKey;
    remainings: AccountMeta[];
  }
): Promise<TransactionInstruction> {
  const { amount, otherAmountThreshold, sqrtPriceLimitX64, isBaseInput } = args;
  return program.methods
    .swap(amount, otherAmountThreshold, sqrtPriceLimitX64, isBaseInput)
    .accounts(accounts)
    .remainingAccounts(accounts.remainings)
    .instruction();
}