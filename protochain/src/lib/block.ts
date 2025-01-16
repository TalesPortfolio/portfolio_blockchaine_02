/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   block.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tales <tales@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/01/16 09:33:56 by tales             #+#    #+#             */
/*   Updated: 2025/01/16 21:34:16 by tales            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import sha256 from 'crypto-js/sha256';

//Cria uma classes e estou exportando a minha casse
export default class Block{
    index:number;
    timestamp: number;
    hash:string;
    previousHash: string;
    data: string;
    

    /**
     * creates a new block
     * @param index The block index in blockchain
     * @param previousHash The previous block hash
     * @param data The block data 
     */
    constructor(index:number, previousHash: string, data: string)
    {
        this.index = index;
        this.timestamp = Date.now();
        this.previousHash = previousHash;
        this.data = data;
        this.hash = this.getHash();
    }

    /**
     * cria o Hash concatena tudos os paramentro e depois converte de bit para string
     */
    getHash():string {
        return sha256(this.index + this.data + this.timestamp + this.previousHash).toString();
    }

    //metodo para validar uma operacao
    /**
     * Validade the block
     * @returns returns true if the block is valid
     */
    isValid(previousHash: string, previousIndex: number):boolean{
        if(previousIndex !== this.index - 1)return false;
        if(this.hash !== this.getHash()) return false;
        if(!this.data) return false;
        if(this.timestamp < 1) return false;
        if(this.previousHash !== previousHash) return false;
        return true;
    }
}
