import TransactionInput from "../src/lib/transactionInput";
import TransactionOutput from "../src/lib/transactionOutput";
import Wallet from '../src/lib/wallet';


describe("TransactionInput tests", () => {

    let alice: Wallet;
    let bob: Wallet;
    const exampleTx: string = "021cdc2ee8bb048e393633bbe71a417743ea1adeb1c6fc142af47f77dc768ee75e";
    
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

test('Should create from TXO', () => {
  const txi = TransactionInput.fromTxo({
    amount: 10,
    toAddress: alice.publicKey,
    tx: exampleTx
  }as TransactionOutput)
  txi.sign(alice.privateKey);

  txi.amount = 11;
  const result = txi.isValid();
  expect(result.success).toBeFalsy();

})

});
