import {
  Commitment,
  Connection,
  Keypair,
  PublicKey,
  Signer,
  SystemProgram,
  TransactionInstruction,
} from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  NATIVE_MINT,
  AccountLayout,
  createCloseAccountInstruction,
  createInitializeAccountInstruction,
} from "@solana/spl-token";
import { BN } from "@coral-xyz/anchor";

export function isWSOLTokenMint(tokenMint: PublicKey): boolean {
  return tokenMint.equals(NATIVE_MINT);
}

export function makeCloseAccountInstruction({
  tokenAccount,
  owner,
  payer,
  multiSigners = [],
}: {
  tokenAccount: PublicKey;
  owner: PublicKey;
  payer: PublicKey;
  multiSigners?: Signer[];
}) {
  return createCloseAccountInstruction(
    tokenAccount,
    payer,
    owner,
    multiSigners
  );
}

export async function makeCreateWrappedNativeAccountInstructions({
  connection,
  owner,
  payer,
  amount,
  commitment,
}: {
  connection: Connection;
  owner: PublicKey;
  payer: PublicKey;
  amount: BN;
  commitment?: Commitment;
}) {
  const instructions: TransactionInstruction[] = [];
  const balanceNeeded = await connection.getMinimumBalanceForRentExemption(
    AccountLayout.span,
    commitment
  );

  // Create a new account
  const lamports = amount.add(new BN(balanceNeeded));
  const newAccount = Keypair.generate();
  instructions.push(
    SystemProgram.createAccount({
      fromPubkey: payer,
      newAccountPubkey: newAccount.publicKey,
      lamports: lamports.toNumber(),
      space: AccountLayout.span,
      programId: TOKEN_PROGRAM_ID,
    })
  );

  instructions.push(
    createInitializeAccountInstruction(
      TOKEN_PROGRAM_ID,
      NATIVE_MINT,
      newAccount.publicKey,
      owner
    )
  );

  return { newAccount, instructions };
}
