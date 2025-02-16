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
    const txInput = new TransactionOutput({
        amount: 10,
        toAddress: alice.publicKey,
        tx: "abc"
    }as TransactionOutput);
  
    const valid = txInput.isValid();
    expect(valid.success).toBeTruthy();//ou toEqual
  });



});
