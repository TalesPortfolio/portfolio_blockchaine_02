/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   block.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tales <tales@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/01/16 09:33:56 by tales             #+#    #+#             */
/*   Updated: 2025/02/16 11:27:54 by tales            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */


import Transaction from "../transaction";
import Validation from "../validation";

//MOcked block class
export default class Block{
    index:number;
    timestamp: number;
    hash:string;
    previousHash: string;
    transactions:Transaction[];
    miner: string;
    

    /**
     * creates a new mock block
     * @param block The block date
     */
    constructor(block?: Block)
    {
        this.index = block?.index || 0;
        this.timestamp = block?.timestamp || Date.now();
        this.previousHash = block?.previousHash || "";
        this.transactions = block?.transactions || [] as Transaction[];
        this.miner = block?.miner || "abc";
        this.hash = block?.hash || this.getHash();
    }


    mine(difficult: number, miner: string){
        this.miner = miner;
    } 


    /**
     * cria o Hash concatena tudos os paramentro e depois converte de bit para string
     */
    getHash():string {
        return this.hash || "abc";
    }

    //metodo para validar uma operacao
    /**
     * Validade the mock block
     * @returns returns if the mock block is valid
     */
    isValid(previousHash: string, previousIndex: number):Validation{
        if(!previousHash || previousIndex < 0 || this.index < 0)
            return new Validation(false, "Invalid mock block");
        
        return new Validation();
    }
}
