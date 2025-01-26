/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   transactionInput.test.ts                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tales <tales@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/01/26 13:15:20 by tales             #+#    #+#             */
/*   Updated: 2025/01/26 13:31:15 by tales            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */


import TransactionInput from "../src/lib/transactionInput";
import Wallet from '../src/lib/wallet';


describe("TransactionInput tests", () => {

    let alice: Wallet;
    
    beforeAll(()=>{
        alice = new Wallet();
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

});
