/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   transaction.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tales <tales@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/01/22 19:29:21 by tales             #+#    #+#             */
/*   Updated: 2025/02/13 18:21:39 by tales            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import TransactionType from "../transactionTypes";
import Validation from "../validation";
import TransactionInput from "./transactionInput";

/**
 * Transaction mocking class
 * 
 */
export default class Transaction{
    type: TransactionType;
    timestamp: number;
    hash: string;
    txInput: TransactionInput
    to: string;

    constructor(tx?: Transaction){
        this.type = tx?.type || TransactionType.REGULAR;
        this.timestamp = tx?.timestamp || Date.now();
        this.to = tx?.to || "carteiraTo";
        this.txInput = tx?.txInput ? new TransactionInput(tx?.txInput) : new TransactionInput();
        this.hash = tx?.hash || this.getHash();
    }

    getHash(): string {
        return "abc";
    }

    isValid():Validation{
        if(!this.to)return new Validation(false, "Invalid mock transaction");
        if(!this.txInput.isValid().success) return new Validation(false, "Invalid mock transaction");
        return new Validation();
    }
}