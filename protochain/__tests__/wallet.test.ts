import Wallet from "../src/lib/wallet";


describe("Wallet tests", () => {
    
    const exampleWIF = "5HueCGU8rMjxEXxiPuD5BDku4MkFqeZyd4dZ1jvhTVqvbTLvyTJ"
    let alice: Wallet;
    beforeAll(()=>{
        alice = new Wallet();
    })
  
  test("Sould generate valid", () => {
    const wallet = new Wallet();
    expect(wallet.privateKey).toBeTruthy();
    expect(wallet.publicKey).toBeTruthy();//ou toEqual
  });

  test("Sould recover wallet (PK)", () => {
    const wallet = new Wallet(alice.privateKey);
    expect(wallet.privateKey).toBeTruthy();
    expect(wallet.publicKey).toEqual(alice.publicKey);//ou toEqual
  });

  test("Sould recover wallet (WIF)", () => {
    const wallet = new Wallet(exampleWIF);
    expect(wallet.publicKey).toBeTruthy();
    expect(wallet.privateKey).toBeTruthy();
  });

});
