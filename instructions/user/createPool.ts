import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { Program, BN } from "@coral-xyz/anchor";
import { AmmV3 } from "../../anchor/amm_v3";

export function createPoolInstruction(
  program: Program<AmmV3>,
  initialPriceX64: BN,
  accounts: {
    poolCreator: PublicKey;
    ammConfig: PublicKey;
    tokenMint0: PublicKey;
    tokenMint1: PublicKey;
    poolState: PublicKey;
    observationState: PublicKey;
    tokenVault0: PublicKey;
    tokenVault1: PublicKey;
    tickArrayBitmap: PublicKey;
    tokenProgram0: PublicKey;
    tokenProgram1: PublicKey;
    systemProgram: PublicKey;
    rent: PublicKey;
  }
): Promise<TransactionInstruction> {
  let openTime = new BN(Date.parse(new Date().toString()) / 1000);
  return program.methods
    .createPool(initialPriceX64, openTime)
    .accounts(accounts)
    .instruction();
}
