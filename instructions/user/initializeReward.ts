import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { Program, BN } from "@coral-xyz/anchor";
import { AmmV3 } from "../../anchor/amm_v3";


export function initializeRewardInstruction(
  program: Program<AmmV3>,
  args: {
    openTime: BN;
    endTime: BN;
    emissionsPerSecondX64: BN;
  },
  accounts: {
    rewardFunder: PublicKey;
    funderTokenAccount: PublicKey;
    ammConfig: PublicKey;
    poolState: PublicKey;
    rewardTokenMint: PublicKey;
    operationState:PublicKey,
    rewardTokenVault: PublicKey;
    tokenProgram: PublicKey;
    systemProgram: PublicKey;
    rent: PublicKey;
  }
): Promise<TransactionInstruction> {
  return program.methods
    .initializeReward(args)
    .accounts(accounts)
    .instruction();
}
