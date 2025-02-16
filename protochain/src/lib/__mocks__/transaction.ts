/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   transaction.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tales <tales@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/01/22 19:29:21 by tales             #+#    #+#             */
/*   Updated: 2025/02/16 15:26:32 by tales            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import TransactionInput from "../transactionInput";
import TransactionType from "../transactionType";
import Validation from "../validation";
import TransactionOutput from "../transactionOutput";

/**
 * Mocked Transaction class
 * 
 */
export default class Transaction{
    type: TransactionType;
    timestamp: number;
    hash: string;
    txInputs: TransactionInput[] | undefined;
    txOutputs: TransactionOutput[];

    constructor(tx?: Transaction){
        this.type = tx?.type || TransactionType.REGULAR;
        this.timestamp = tx?.timestamp || Date.now();
        this.txOutputs = tx?.txOutputs || [new TransactionOutput()];
        this.txInputs = tx?.txInputs|| [new TransactionInput()];
        this.hash = tx?.hash || this.getHash();
    }

    getHash(): string {
        return "abc";
    }

    isValid(): Validation{
        if(this.timestamp < 1 || !this.hash)
            return new Validation(false, "Invalid mock transaction");

        return new Validation();
    }
}