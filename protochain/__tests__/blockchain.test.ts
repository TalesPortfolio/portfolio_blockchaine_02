
import { describe, test, expect, jest, beforeAll } from '@jest/globals'
import Block from "../src/lib/block";
import Blockchain from "../src/lib/blockchain";
import Transaction from "../src/lib/transaction";
import TransactionInput from "../src/lib/transactionInput";
import TransactionOutput from "../src/lib/transactionOutput";
import TransactionType from "../src/lib/transactionType";
import Wallet from '../src/lib/wallet';

jest.mock("../src/lib/block");
jest.mock('../src/lib/transaction');
jest.mock('../src/lib/transactionInput');

describe("Blockchain tests", () => {

  let alice: Wallet;
  
  beforeAll(() => {
    alice = new Wallet();
  })
  

  //posso usar tambem it() no lugar de test()
  test("Should has genesis block < Deveria ser valido >", () => {
    const blockchain = new Blockchain(alice.publicKey);
    expect(blockchain.blocks.length).toEqual(1);
  });

  test("Should be valid (Genesis)", () => {
    const blockchain = new Blockchain(alice.publicKey);
    expect(blockchain.isValid().success).toEqual(true);
  });

  test("Should be valid (two blocks)", () => {
    const blockchain = new Blockchain(alice.publicKey);
    blockchain.addBlock(new Block({
      index:1,
      previousHash: blockchain.blocks[0].hash,
      transactions: [new Transaction({
        txInputs: [new TransactionInput()]
      }as Transaction)]
    }as Block));
    expect(blockchain.isValid().success).toEqual(true);

  });

  test("Should NOT be valid", () => {
    const blockchain = new Blockchain(alice.publicKey);

    const tx = new Transaction({
      txInputs: [new TransactionInput()]
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
    const blockchain = new Blockchain(alice.publicKey);

    const tx = new Transaction({
      txInputs: [new TransactionInput()],
      hash: "xyz",
    } as Transaction);

    const validation = blockchain.addTransaction(tx);
    expect(validation.success).toEqual(true);
  });

  test("Should NOT add transaction (pending tx)", () => {
    const blockchain = new Blockchain(alice.publicKey);

    const tx = new Transaction({
      txInputs: [new TransactionInput()],
      hash: "xyz",
    } as Transaction);

    const tx2 = new Transaction({
      txInputs: [new TransactionInput()],
      hash: "xyz2",
    } as Transaction);


    const validation = blockchain.addTransaction(tx2);
    expect(validation.success).toBeTruthy();
  });

  test("Should NOT add transaction (invalid tx)", () => {
    const blockchain = new Blockchain(alice.publicKey);
    
    const tx = new Transaction({
     txInputs: [new TransactionInput()],
      hash: "xyz",
      timestamp: -1
    } as Transaction);

    const validation = blockchain.addTransaction(tx);
    expect(validation.success).toEqual(false);
  });

  test("Should NOT add transaction (duplicate in blockchain)", () => {
    const blockchain = new Blockchain(alice.publicKey);

    const tx = new Transaction({
      txInputs: [new TransactionInput()],
      hash: "xyz",
    } as Transaction);

    blockchain.blocks.push(new Block({
        transactions: [tx]
    }as Block))

    const validation = blockchain.addTransaction(tx);
    expect(validation.success).toEqual(false);
  });

  test("Should get transaction (mempool)", () => {
    const blockchain = new Blockchain(alice.publicKey);

    const tx = new Transaction({
      txInputs: [new TransactionInput()],
      hash: "abc",
    } as Transaction);

    blockchain.mempool.push(tx);

    const result = blockchain.getTransaction("abc");

    expect(result.mempoolIndex).toEqual(0);
  });

  test("Should get transaction (blockChain)", () => {
    const blockchain = new Blockchain(alice.publicKey);

    const tx = new Transaction({
      txInputs: [new TransactionInput()],
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
    const blockchain = new Blockchain(alice.publicKey);
    const result = blockchain.getTransaction("xyz");
    expect(result.blockIndex).toEqual(-1);
    expect(result.mempoolIndex).toEqual(-1);
  });


  test("Should add block ", () => {
    const blockchain = new Blockchain(alice.publicKey);

    const tx = new Transaction({
      txInputs: [new TransactionInput()],
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

  test("Should NOT add block (invalid mempool)", () => {
    const blockchain = new Blockchain(alice.publicKey);
    blockchain.mempool.push(new Transaction());
    blockchain.mempool.push(new Transaction());

    const tx = new Transaction({
      txInputs: [new TransactionInput()],
    } as Transaction);

    const result = blockchain.addBlock(
      new Block({
        index: 1,
        previousHash: blockchain.blocks[0].hash,
        transactions: [tx],
      } as Block)
    );
    expect(result.success).toBeFalsy();
  });


  test("Should get block ", () => {
    const blockchain = new Blockchain(alice.publicKey);
    const block = blockchain.getBlock(blockchain.blocks[0].hash);
    expect(block).toBeTruthy();
  });

  test("Should NOT add block (invalid index)", () => {
    const blockchain = new Blockchain(alice.publicKey);
    blockchain.mempool.push(new Transaction());
    
    const block = new Block({
      index: -1,
      previousHash: blockchain.blocks[0].hash,
    } as Block);
    
    block.transactions.push(new Transaction({
      type:TransactionType.FEE,
      txOutputs: [new TransactionOutput({
        toAddress: alice.publicKey,
        amount: 1
      }as TransactionOutput)]
    }as Transaction))

    block.hash = block.getHash();
    
    const result = blockchain.addBlock(block);
    expect(result.success).toEqual(false);
  });

  test("Should get next block info", () => {
    const blockchain = new Blockchain(alice.publicKey);
    blockchain.mempool.push(new Transaction());
    const info = blockchain.getNextBlock();
    expect(info ? info.index : 0).toEqual(1);
  });

  test("Should NOT get next block info", () => {
    const blockchain = new Blockchain(alice.publicKey);
    const info = blockchain.getNextBlock();
    expect(info).toBeNull();
  });
});
