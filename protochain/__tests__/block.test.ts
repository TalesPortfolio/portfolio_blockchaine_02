/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   block.test.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tales <tales@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/01/16 11:01:00 by tales             #+#    #+#             */
/*   Updated: 2025/01/26 15:19:44 by tales            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Block from "../src/lib/block";
import BlockInfo from "../src/lib/blockInfo";
import Transaction from "../src/lib/transaction";
import TransactionInput from "../src/lib/transactionInput";
import TransactionType from "../src/lib/transactionTypes";

jest.mock('../src/lib/transaction');
jest.mock('../src/lib/transactionInput');

describe("Block tests", () => {
  
  const exampleMiner = "Tales";
  const exampleDifficulty = 0;
  let genesis: Block;
  
  beforeAll(() => {
    genesis = new Block({
      transactions: [new Transaction({
        txInput: new TransactionInput()
      } as Transaction)]
    } as Block);
  });

  test("Should be valid", () => {
    const block = new Block({
      index:1,
      previousHash:genesis.hash,
      transactions: [new Transaction({
        txInput:  new TransactionInput()
      }   as Transaction)]
    } as Block);
    block.mine(exampleDifficulty, exampleMiner);
    
    const valid = block.isValid(genesis.hash, genesis.index,exampleDifficulty);
    expect(valid.success).toBeTruthy();//ou toEqual
  });

  test("Should create from block info ", () => {
    const block = Block.fromBlockInfo({
      transactions: [new Transaction({
        txInput: new TransactionInput()
      } as Transaction)],
      difficulty: exampleDifficulty,
      feePerTx: 1,
      index: 1,
      maxDifficulty: 62,
      previousHash: genesis.hash
    }as BlockInfo);
    block.mine(exampleDifficulty, exampleMiner);
    
    const valid = block.isValid(genesis.hash, genesis.index,exampleDifficulty);
    expect(valid.success).toBeTruthy();
  });

  test("Should NOT be valid (2 FEE)", () => {
    const block = new Block({
      index:1,
      previousHash:genesis.hash,
      transactions: [
        new Transaction({
        type: TransactionType.FEE,
        txInput: new TransactionInput()
      } as Transaction),
      new Transaction({
        type: TransactionType.FEE,
        txInput: new TransactionInput()
      } as Transaction)]
    } as Block);
    block.mine(exampleDifficulty, exampleMiner);
    
    const valid = block.isValid(genesis.hash, genesis.index,exampleDifficulty);
    expect(valid.success).toBeFalsy();//ou toEqual
  });

  test("Sould NOT be valid (invalid tx)", () => {

 
    const block = new Block({
      index:1,
      previousHash:genesis.hash,
      transactions: [new Transaction()]
    } as Block);
    block.mine(exampleDifficulty, exampleMiner);
    
    block.transactions[0].to = "";
    const valid = block.isValid(genesis.hash, genesis.index,exampleDifficulty);
    expect(valid.success).toBeFalsy();
  });

  test("Should NOT be valid (fallbacks)", () => {
    const block = new Block();
    const valid = block.isValid(genesis.hash, genesis.index,exampleDifficulty);
    expect(valid.success).toBeFalsy();
  });

  test("Should NOT be valid (previous hash)", () => {
    const block = new Block({
      index:1,
      previousHash:"abc",
      transactions: [new Transaction({
        txInput: new TransactionInput()
      } as Transaction)]
    }as Block);
    const valid = block.isValid(genesis.hash, genesis.index,exampleDifficulty);
    expect(valid.success).toBeFalsy();
  });

  test("Sould NOT be valid (timestamp)", () => {
    const block = new Block({
      index:1,
      previousHash:genesis.hash,
      transactions: [new Transaction({
        txInput: new TransactionInput()
      } as Transaction)]
    }as Block);
    block.timestamp = -1;
    block.hash = block.getHash();
    const valid = block.isValid(genesis.hash, genesis.index,exampleDifficulty);
    expect(valid.success).toBeFalsy();
  });

  test("Should NOT be valid (empty hash) <Nao deve ser valido>", () => {
    const block = new Block({
      index:1,
      previousHash:genesis.hash,
      transactions: [new Transaction({
        txInput: new TransactionInput()
      } as Transaction)]
    }as Block);
    block.mine(exampleDifficulty, exampleMiner);
    block.hash = "";
    const valid = block.isValid(genesis.hash, genesis.index,exampleDifficulty);
    expect(valid.success).toBeFalsy();
  });

  test("Should NOT be valid (no miner) ", () => {
    const block = new Block({
      index:1,
      previousHash:genesis.hash,
      transactions: [new Transaction({
        txInput: new TransactionInput()
      } as Transaction)]
    }as Block);
    block.hash = "";
    const valid = block.isValid(genesis.hash, genesis.index,exampleDifficulty);
    expect(valid.success).toBeFalsy();
  });

  test("Should NOT be valid (txInput) ", () => {
    const txInput = new TransactionInput();
    txInput.amount = -1;
    
    const block = new Block({
      index:1,
      previousHash:genesis.hash,
      transactions: [new Transaction({
      txInput
      } as Transaction)]
    }as Block);
    const valid = block.isValid(genesis.hash, genesis.index,exampleDifficulty);
    expect(valid.success).toBeFalsy();
  });

  test("Should NOT be valid (index)", () => {
    const block = new Block({
      index:-1,
      previousHash:genesis.hash,
      transactions: [new Transaction({
        txInput: new TransactionInput()
      } as Transaction)]
    }as Block);
    const valid = block.isValid(genesis.hash, genesis.index,exampleDifficulty);

    expect(valid.success).toBeFalsy();
  });
});
