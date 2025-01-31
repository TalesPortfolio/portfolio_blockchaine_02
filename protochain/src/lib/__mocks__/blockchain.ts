/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   blockchain.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tales <tales@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/01/18 20:10:14 by tales             #+#    #+#             */
/*   Updated: 2025/01/26 15:00:04 by tales            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Block from "./block";
import Validation from "../validation";
import BlockInfo from "../blockInfo";
import Transaction from "./transaction";
import TransactionType from "../transactionTypes";
import TransactionSearch from "../transactionSearch";
import TransactionInput from "./transactionInput";
/**
 * mocked blockchain class
 */

export default class Blockchain {
  blocks: Block[];
  mempool: Transaction[];
  nextIndex: number = 0;

  /**
   * Create a new mocked blockchain
   */

  constructor() {
    this.mempool = [];
    this.blocks = [
      new Block({
        index: 0,
        hash: "abc",
        previousHash: "",
        transactions: [new Transaction({
          txInput: new TransactionInput(),
          type: TransactionType.FEE
        } as Transaction)],
        timestamp: Date.now(),
      } as Block),
    ];
    this.nextIndex++;
  }

  getLastBlock(): Block {
    return this.blocks[this.blocks.length - 1];
  }

  addBlock(block: Block): Validation {
    if (block.index < 0) return new Validation(false, "Invalid mock block");

    this.blocks.push(block);
    this.nextIndex++;
    return new Validation();
  }

  addTransactions(transaction : Transaction) : Validation{
    const validation = transaction.isValid();
    if(!validation.success) return validation;
    
    this.mempool.push(transaction);
    return new Validation();
  }

  getTransaction(hash: string) : TransactionSearch{
    return {
      mempoolIndex: 0,
      transaction: {
        hash
      }
    }as TransactionSearch;
  }

  getBlock(hash: string): Block | undefined {
    return this.blocks.find((b) => b.hash === hash);
  }

  isValid(): Validation {
    return new Validation();
  }

  getFeePerTx(): number {
    return 1;
  }

  getNextBlock(): BlockInfo {
    return {
      transactions:[new Transaction({
        txInput: new TransactionInput()
      } as Transaction)],
      difficulty: 0,
      previousHash: this.getLastBlock().hash,
      index: 1,
      feePerTx: this.getFeePerTx(),
      maxDifficulty: 62,
    } as BlockInfo;
  }
}
