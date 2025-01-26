/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   transaction.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tales <tales@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/01/22 17:21:51 by tales             #+#    #+#             */
/*   Updated: 2025/01/26 13:14:24 by tales            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import TransactionType from "./transactionTypes";
import sha256 from 'crypto-js/sha256';
import Validation from "./validation";
import TransactionInput from "./transactionInput";

/**
 * Transaction class
 * 
 */
export default class Transaction{
    type: TransactionType;
    timestamp: number;
    hash: string;
    txInput: TransactionInput;
    to: string;

    constructor(tx?: Transaction){
        this.type = tx?.type || TransactionType.REGULAR;
        this.timestamp = tx?.timestamp || Date.now();
        this.to = tx?.to || "";
        this.hash = tx?.hash || this.getHash();
        this.txInput = new TransactionInput(tx?.txInput) || "";
    }

    getHash(): string {
        return sha256(this.type + this.txInput.getHash() + this.to + this.timestamp).toString();
    }

    isValid():Validation{
        if(this.hash !== this.getHash())
            return new Validation(false,"Invalid hash");
        if(!this.to)
            return new Validation(false, "Invalid to.");
        if(this.txInput){
            const validation = this.txInput.isValid();
            if(!validation.success)
                return new Validation(false, `Invalid tx: ${validation.message}`)
        }
        return new Validation();
    }
}