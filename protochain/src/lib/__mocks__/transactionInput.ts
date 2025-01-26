/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   transactionInput.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tales <tales@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/01/26 14:14:52 by tales             #+#    #+#             */
/*   Updated: 2025/01/26 14:18:07 by tales            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   transactionInput.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tales <tales@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/01/26 12:26:48 by tales             #+#    #+#             */
/*   Updated: 2025/01/26 12:53:13 by tales            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */


import Validation from "../validation";

/**
 * TransactionInput class
 */

export default class TransactionInput {
  fromAddress: string;
  amount: number;
  signature: string;

  /**
   * Creates a new TransactionInput
   * @param txInput The tx input data
   */
  constructor(txInput?: TransactionInput) {
    this.fromAddress = txInput?.fromAddress || "carteira1";
    this.amount = txInput?.amount || 10;
    this.signature = txInput?.signature || "abc";
  }

  /**
   * Generate the tx input signature
   * @param privateKey The 'from' private key
   */
  sign(privateKey: string): void {
    this.signature = "abc";
  }

  /**
   * Generates the tx input hash
   * @returns The tx input hash
   */
  getHash(): string {
    return "abc";
  }

  /**
   * Validates if the tx input is ok
   * @returns Returns a validation result object
   */
  isValid(): Validation {
    if (!this.signature) return new Validation(false, "Signature is required");
    if (this.amount < 1)
      return new Validation(false, "Amount must be greater than zero.");

    return new Validation();
  }
}
