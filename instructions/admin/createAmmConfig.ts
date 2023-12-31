import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { Program, BN } from "@coral-xyz/anchor";
import { AmmV3 } from "../../anchor/amm_v3";

export function createAmmConfigInstruction(
  program: Program<AmmV3>,
  args: {
    index: number;
    tickSpacing: number;
    tradeFeeRate: number;
    protocolFeeRate: number;
    fundFeeRate: number;
  },
  accounts: {
    owner: PublicKey;
    ammConfig: PublicKey;
    systemProgram: PublicKey;
  }
): Promise<TransactionInstruction> {
  const { index, tickSpacing, tradeFeeRate, protocolFeeRate, fundFeeRate } =
    args;
  return program.methods
    .createAmmConfig(
      index,
      tickSpacing,
      tradeFeeRate,
      protocolFeeRate,
      fundFeeRate
    )
    .accounts(accounts)
    .instruction();
}
