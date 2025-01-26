/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   blockchain.test.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tales <tales@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/01/16 12:34:52 by tales             #+#    #+#             */
/*   Updated: 2025/01/26 14:53:54 by tales            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Block from "../src/lib/block";
import Blockchain from "../src/lib/blockchain";
import Transaction from "../src/lib/transaction";
import TransactionInput from "../src/lib/transactionInput";

jest.mock("../src/lib/block");
jest.mock('../src/lib/transaction');
jest.mock('../src/lib/transactionInput');

describe("Block tests", () => {
  //posso usar tambem it() no lugar de test()
  test("Should has genesis block < Deveria ser valido >", () => {
    const blockchain = new Blockchain();
    expect(blockchain.blocks.length).toEqual(1);
  });

  test("Should be valid (Genesis)", () => {
    const blockchain = new Blockchain();
    expect(blockchain.isValid().success).toEqual(true);
  });

  test("Should be valid (two blocks)", () => {
    const blockchain = new Blockchain();
    blockchain.addBlock(new Block({
      index:1,
      previousHash: blockchain.blocks[0].hash,
      transactions: [new Transaction({
        txInput: new TransactionInput()
      }as Transaction)]
    }as Block));
    expect(blockchain.isValid().success).toEqual(true);

  });

  test("Should NOT be valid", () => {
    const blockchain = new Blockchain();

    const tx = new Transaction({
      txInput: new TransactionInput()
    } as Transaction);

    blockchain.mempool.push(tx);

    blockchain.addBlock(
      new Block({
        index: 1,
        previousHash: blockchain.blocks[0].hash,
        transactions: [tx],
      } as Block)
    );
    blockchain.blocks[1].index = -1;
    expect(blockchain.isValid().success).toEqual(false);
  });

  test("Should add transaction", () => {
    const blockchain = new Blockchain();

    const tx = new Transaction({
      txInput: new TransactionInput(),
      hash: "xyz",
    } as Transaction);

    const validation = blockchain.addTransaction(tx);
    expect(validation.success).toEqual(true);
  });

  test("Should NOT add transaction (invalid tx)", () => {
    const blockchain = new Blockchain();

    const txInput = new TransactionInput();
    txInput.amount = -10;
    

    const tx = new Transaction({
     txInput,
      hash: "xyz",
    } as Transaction);

    const validation = blockchain.addTransaction(tx);
    expect(validation.success).toEqual(false);
  });

  test("Should NOT add transaction (duplicate in blockchain)", () => {
    const blockchain = new Blockchain();

    const tx = new Transaction({
      txInput: new TransactionInput(),
      hash: "xyz",
    } as Transaction);

    blockchain.blocks.push(new Block({
        transactions: [tx]
    }as Block))

    const validation = blockchain.addTransaction(tx);
    expect(validation.success).toEqual(false);
  });

  test("Should NOT add transaction (duplicate in mempool)", () => {
    const blockchain = new Blockchain();

    const tx = new Transaction({
      txInput: new TransactionInput(),
      hash: "xyz",
    } as Transaction);

    blockchain.mempool.push(tx);

    const validation = blockchain.addTransaction(tx);
    expect(validation.success).toEqual(false);
  });


  test("Should get transaction (mempool)", () => {
    const blockchain = new Blockchain();

    const tx = new Transaction({
      txInput: new TransactionInput(),
      hash: "abc",
    } as Transaction);

    blockchain.mempool.push(tx);

    const result = blockchain.getTransaction("abc");

    expect(result.mempoolIndex).toEqual(0);
  });

  test("Should get transaction (blockChain)", () => {
    const blockchain = new Blockchain();

    const tx = new Transaction({
      txInput: new TransactionInput(),
      hash: "xyz",
    } as Transaction);

    blockchain.blocks.push(
      new Block({
        transactions: [tx],
      } as Block)
    );

    const result = blockchain.getTransaction("xyz");

    expect(result.blockIndex).toEqual(1);
  });

  test("Should NOT get transaction (blockChain)", () => {
    const blockchain = new Blockchain();
    const result = blockchain.getTransaction("xyz");
    expect(result.blockIndex).toEqual(-1);
    expect(result.mempoolIndex).toEqual(-1);
  });


  test("Should add block ", () => {
    const blockchain = new Blockchain();

    const tx = new Transaction({
      txInput: new TransactionInput(),
    } as Transaction);

    blockchain.mempool.push(tx);

    const result = blockchain.addBlock(
      new Block({
        index: 1,
        previousHash: blockchain.blocks[0].hash,
        transactions: [tx],
      } as Block)
    );
    expect(result.success).toEqual(true);
  });

  test("Should get block ", () => {
    const blockchain = new Blockchain();
    const block = blockchain.getBlock(blockchain.blocks[0].hash);
    expect(block).toBeTruthy();
  });

  test("Should NOT add block ", () => {
    const blockchain = new Blockchain();
    const block = new Block({
      index: -1,
      previousHash: blockchain.blocks[0].hash,
      transactions: [
        new Transaction({
          txInput: new TransactionInput(),
        } as Transaction),
      ],
    } as Block);
    const result = blockchain.addBlock(block);
    expect(result.success).toEqual(false);
  });

  test("Should get next block info", () => {
    const blockchain = new Blockchain();
    blockchain.mempool.push(new Transaction());
    const info = blockchain.getNextBlock();
    expect(info ? info.index : 0).toEqual(1);
  });

  test("Should NOT get next block info", () => {
    const blockchain = new Blockchain();
    const info = blockchain.getNextBlock();
    expect(info).toBeNull();
  });
});
