/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   transaction.test.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tales <tales@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/01/22 19:02:23 by tales             #+#    #+#             */
/*   Updated: 2025/01/22 19:27:50 by tales            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */


import Transaction from "../src/lib/transaction";
import TransactionType from "../src/lib/transactionTypes";

describe("Transaction tests", () => {

  test("Should be valid (REGULAR default)", () => {
    const tx = new Transaction({
        data: "tx"
    }as Transaction);
    
    const valid = tx.isValid();
    expect(valid.success).toBeTruthy();
  });

  test("Should NOT be valid (invalid hash)", () => {
    const tx = new Transaction({
        data: "tx",
        type: TransactionType.REGULAR,
        timestamp: Date.now(),
        hash: "abc"
    }as Transaction);
    
    const valid = tx.isValid();
    expect(valid.success).toBeFalsy();
  });

  test("Should be valid (FEE)", () => {
    const tx = new Transaction({
        data: "tx",
        type: TransactionType.FEE
    }as Transaction);
    
    const valid = tx.isValid();
    expect(valid.success).toBeTruthy();
  });


  test("Should NOT be valid (invalid Data)", () => {
    const tx = new Transaction();
    const valid = tx.isValid();
    expect(valid.success).toBeFalsy();
  });



});
