import TransactionInput from "../src/lib/transactionInput";
import Wallet from '../src/lib/wallet';


describe("TransactionInput tests", () => {

    let alice: Wallet;
    let bob: Wallet;
    
    beforeAll(()=>{
        alice = new Wallet();
        bob = new Wallet();
    })
  
  test("Sould be valid", () => {
    const txInput = new TransactionInput({
        amount: 10,
        fromAddress: alice.publicKey,
        previousTx: 'abc'
    }as TransactionInput);
    txInput.sign(alice.privateKey)
    
    const valid = txInput.isValid();
    expect(valid.success).toBeTruthy();//ou toEqual
  });

  test("Sould NOT be valid (defaults)", () => {
    const txInput = new TransactionInput()
    txInput.sign(alice.privateKey)
    
    const valid = txInput.isValid();
    expect(valid.success).toBeFalsy();//ou toEqual
  });
  
  test("Sould NOT be valid (empty signature)", () => {
    const txInput = new TransactionInput({
        amount: 10,
        fromAddress: alice.publicKey,
        previousTx:'abc'
    }as TransactionInput);
    
    const valid = txInput.isValid();
    expect(valid.success).toBeFalsy();//ou toEqual
  });

  test("Sould NOT be valid (negative amount)", () => {
    const txInput = new TransactionInput({
        amount: -10,
        fromAddress: alice.publicKey,
        previousTx:'abc'
    }as TransactionInput);
    
    const valid = txInput.isValid();
    expect(valid.success).toBeFalsy();//ou toEqual
  });

  test("Sould NOT be valid (invalid previousTx)", () => {
    const txInput = new TransactionInput({
        amount: 10,
        fromAddress: alice.publicKey,
    }as TransactionInput);
    txInput.sign(alice.privateKey);
    
    const valid = txInput.isValid();
    expect(valid.success).toBeFalsy();//ou toEqual
  });

});
