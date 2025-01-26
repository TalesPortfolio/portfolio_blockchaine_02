/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   transactionInput.test.ts                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tales <tales@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/01/26 13:15:20 by tales             #+#    #+#             */
/*   Updated: 2025/01/26 17:03:28 by tales            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */


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
    }as TransactionInput);
    
    const valid = txInput.isValid();
    expect(valid.success).toBeFalsy();//ou toEqual
  });

  test("Sould NOT be valid (negative amount)", () => {
    const txInput = new TransactionInput({
        amount: -10,
        fromAddress: alice.publicKey,
    }as TransactionInput);
    
    const valid = txInput.isValid();
    expect(valid.success).toBeFalsy();//ou toEqual
  });

  test("Sould be valid", () => {
    const txInput = new TransactionInput({
        amount: 10,
        fromAddress: alice.publicKey,
    } as TransactionInput);
    txInput.sign(alice.privateKey);

    console.log("Assinatura gerada no teste:", txInput.signature);

    const valid = txInput.isValid();
    expect(valid.success).toBeTruthy();
});



});
