import TransactionOutput from "../src/lib/transactionOutput";
import Wallet from '../src/lib/wallet';


describe("TransactionInput tests", () => {

    let alice: Wallet;
    let bob: Wallet;
    
    beforeAll(()=>{
        alice = new Wallet();
        bob = new Wallet();
    })
  
  test("Sould be valid", () => {
    const txOutput = new TransactionOutput({
        amount: 10,
        toAddress: alice.publicKey,
        tx: "abc"
    }as TransactionOutput);
  
    const valid = txOutput.isValid();
    expect(valid.success).toBeTruthy();//ou toEqual
  });

  test("Sould NOT be valid (default)", () => {
    const txOutput = new TransactionOutput();
    const valid = txOutput.isValid();
    expect(valid.success).toBeFalsy();//ou toEqual
  });


  test("Sould NOT be valid", () => {
    const txOutput = new TransactionOutput({
        amount: -10,
        toAddress: alice.publicKey,
        tx: "abc"
    }as TransactionOutput);
  
    const valid = txOutput.isValid();
    expect(valid.success).toBeFalsy();//ou toEqual
  });

  test("Sould get hash", () => {
    const txOutput = new TransactionOutput({
        amount: 10,
        toAddress: alice.publicKey,
        tx: "abc"
    }as TransactionOutput);
  
    const hash = txOutput.getHash();
    expect(hash).toBeTruthy();//ou toEqual
  });





});
