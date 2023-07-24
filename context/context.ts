import { AnchorProvider, Idl, Program } from "@coral-xyz/anchor";
import {
  PublicKey,
  Connection,
  ConfirmOptions,
  Signer,
  TransactionInstruction,
  TransactionSignature,
  Transaction,
  Keypair,
} from "@solana/web3.js";
import { AmmV3 } from "../anchor/amm_v3";
import idl from "../anchor/amm_v3.json";
import { CustomWallet } from "./wallet";

export class Context {
  readonly connection: Connection;
  readonly program: Program<AmmV3>;
  readonly provider: AnchorProvider;

  public constructor(
    connection: Connection,
    wallet: Keypair,
    programId: PublicKey
  ) {
    const provider = new AnchorProvider(
      connection,
      new CustomWallet(wallet),
      AnchorProvider.defaultOptions()
    );
    const program = new Program(idl as Idl, programId, provider);
    this.connection = provider.connection;
    this.program = program as unknown as Program<AmmV3>;
    this.provider = provider;
  }

  public async sendTransaction(
    ixs: TransactionInstruction[],
    signers?: Signer[],
    opts?: ConfirmOptions
  ): Promise<TransactionSignature> {
    const tx = new Transaction();
    for (var i = 0; i < ixs.length; i++) {
      tx.add(ixs[i]);
    }
    return this.provider.sendAndConfirm(tx, signers, opts);
  }
}
