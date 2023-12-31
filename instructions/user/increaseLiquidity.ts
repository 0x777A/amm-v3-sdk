import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { Program, BN } from "@coral-xyz/anchor";
import { AmmV3 } from "../../anchor/amm_v3";

export function increaseLiquidityInstruction(
  program: Program<AmmV3>,
  args: {
    liquidity: BN;
    amount0Max: BN;
    amount1Max: BN;
  },
  accounts: {
    nftOwner: PublicKey;
    nftAccount: PublicKey;
    poolState: PublicKey;
    protocolPosition: PublicKey;
    personalPosition: PublicKey;
    tickArrayLower: PublicKey;
    tickArrayUpper: PublicKey;
    tokenAccount0: PublicKey;
    tokenAccount1: PublicKey;
    tokenVault0: PublicKey;
    tokenVault1: PublicKey;
    tokenProgram: PublicKey;
  }
): Promise<TransactionInstruction> {
  const { liquidity, amount0Max, amount1Max } = args;

  return program.methods
    .increaseLiquidity(liquidity, amount0Max, amount1Max)
    .accounts(accounts)
    .remainingAccounts([])
    .instruction();
}


export function increaseLiquidityInstructionV2(
  program: Program<AmmV3>,
  args: {
    liquidity: BN;
    amount0Max: BN;
    amount1Max: BN;
  },
  accounts: {
    nftOwner: PublicKey;
    nftAccount: PublicKey;
    poolState: PublicKey;
    protocolPosition: PublicKey;
    personalPosition: PublicKey;
    tickArrayLower: PublicKey;
    tickArrayUpper: PublicKey;
    tokenAccount0: PublicKey;
    tokenAccount1: PublicKey;
    tokenVault0: PublicKey;
    tokenVault1: PublicKey;
    vault0Mint: PublicKey;
    vault1Mint: PublicKey;
    tokenProgram: PublicKey;
    tokenProgram2022: PublicKey;
  }
): Promise<TransactionInstruction> {
  const { liquidity, amount0Max, amount1Max } = args;

  return program.methods
    .increaseLiquidityV2(liquidity, amount0Max, amount1Max,null)
    .accounts(accounts)
    .remainingAccounts([])
    .instruction();
}