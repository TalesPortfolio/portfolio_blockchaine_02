/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   transactionInput.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tales <tales@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/01/26 12:26:48 by tales             #+#    #+#             */
/*   Updated: 2025/01/26 17:11:37 by tales            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import * as ecc from "tiny-secp256k1";
import ECPairFactory from "ecpair";
import sha256 from "crypto-js/sha256";
import Validation from "./validation";

const ECPair = ECPairFactory(ecc);

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
    this.fromAddress = txInput?.fromAddress || "";
    this.amount = txInput?.amount || 0;
    this.signature = txInput?.signature || "";
  }

  /**
   * Generate the tx input signature
   * @param privateKey The 'from' private key
   */

  sign(privateKey: string): void {
    const signature = ECPair.fromPrivateKey(Buffer.from(privateKey, "hex"))
        .sign(Buffer.from(this.getHash(), "hex"));

    this.signature = Buffer.from(signature).toString("hex");
}


  /**
   * Generates the tx input hash
   * @returns The tx input hash
   */
  getHash(): string {
    return sha256(this.fromAddress + this.amount).toString();
  }

  /**
   * Validates if the tx input is ok
   * @returns Returns a validation result object
   */
  isValid(): Validation {
    if (!this.signature) return new Validation(false, "Signature is required");

    if (this.amount < 1)
      return new Validation(false, "Amount must be greater than zero.");

    const hash = Buffer.from(this.getHash(), "hex");
    const isValid = ECPair.fromPublicKey(
      Buffer.from(this.fromAddress, "hex")
    ).verify(hash, Buffer.from(this.signature, "hex"));

    return isValid
      ? new Validation()
      : new Validation(false, "Invalid tx input signature.");
  }
}
