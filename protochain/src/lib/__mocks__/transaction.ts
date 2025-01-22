/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   transaction.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tales <tales@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/01/22 19:29:21 by tales             #+#    #+#             */
/*   Updated: 2025/01/22 20:12:08 by tales            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import TransactionType from "../transactionTypes";
import sha256 from 'crypto-js/sha256';
import Validation from "../validation";

/**
 * Transaction mocking class
 * 
 */
export default class Transaction{
    type: TransactionType;
    timestamp: number;
    hash: string;
    data: string;

    constructor(tx?: Transaction){
        this.type = tx?.type || TransactionType.REGULAR;
        this.timestamp = tx?.timestamp || Date.now();
        this.data = tx?.data || "";
        this.hash = tx?.hash || this.getHash();
    }

    getHash(): string {
        return "abc";
    }

    isValid():Validation{
        if(!this.data)return new Validation(false, "Invalid mock transaction");
        return new Validation();
    }
}