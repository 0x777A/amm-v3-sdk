import {
  BorshCoder,
  EventParser,
  Coder,
  BorshInstructionCoder,
  Idl,
} from "@coral-xyz/anchor";
import {
  PublicKey,
  Connection,
  VersionedTransactionResponse,
  CompiledInstruction,
  MessageCompiledInstruction,
} from "@solana/web3.js";
import idl from "../anchor/amm_v3.json";
import { IDL } from "../anchor/amm_v3";

export type TxParseData = {
  name: string;
  data: Object;
};

export class TransactionParser {
  /**
   * Program ID for event subscriptions.
   */
  private _programId: PublicKey;

  private _coder: Coder;

  private _instructionCoder: BorshInstructionCoder;

  /**
   * Event parser to handle onLogs callbacks.
   */
  private _eventParser: EventParser;

  private _connection: Connection;

  constructor(programId: PublicKey, connection: Connection) {
    this._programId = programId;
    this._coder = new BorshCoder(idl as Idl);
    this._instructionCoder = new BorshInstructionCoder(idl as Idl);
    this._eventParser = new EventParser(programId, this._coder);
    this._connection = connection;
  }

  public async parseArgAndEvent(signature: string): Promise<{
    args: TxParseData[];
    events: TxParseData[];
  }> {
    const tx = await this._connection.getTransaction(signature, {
      commitment: "confirmed",
      maxSupportedTransactionVersion: 0,
    });
    if (tx == undefined) {
      return;
    }
    let args = this.parseArgs(tx);
    let events: TxParseData[] = [];
    for (const event of this._eventParser.parseLogs(tx.meta.logMessages)) {
      events.push({ name: event.name, data: event.data });
    }
    return { args, events };
  }

  private parseArgs(tx: VersionedTransactionResponse): TxParseData[] {
    if (tx == undefined) {
      return;
    }
    // console.log(tx);
    let args: TxParseData[] = [];
    let programIdIndex = 0;
    let allAccountKeys: PublicKey[] = tx.transaction.message.staticAccountKeys;
    allAccountKeys.push(...tx.meta.loadedAddresses?.writable);
    allAccountKeys.push(...tx.meta.loadedAddresses?.readonly);
    for (; programIdIndex < allAccountKeys.length; programIdIndex++) {
      if (allAccountKeys[programIdIndex].equals(this._programId)) {
        break;
      }
    }
    // console.log("programIdIndex:", programIdIndex);
    for (const inner of tx.transaction.message.compiledInstructions) {
      if (inner.programIdIndex == programIdIndex) {
        const result = this._instructionCoder.decode(
          Buffer.from(inner.data),
          "hex"
        );
        if (result == null) {
          continue;
        }
        args.push({ name: result.name, data: result.data });
      }
    }

    for (const innerInstr of tx.meta.innerInstructions) {
      for (const inner of innerInstr.instructions) {
        if (inner.programIdIndex == programIdIndex) {
          const result = this._instructionCoder.decode(inner.data, "base58");
          if (result == null) {
            continue;
          }
          args.push({ name: result.name, data: result.data });
        }
      }
    }
    return args;
  }
}
