/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   block.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tales <tales@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/01/16 09:33:56 by tales             #+#    #+#             */
/*   Updated: 2025/01/19 19:33:27 by tales            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import sha256 from 'crypto-js/sha256';
import Validation from "./validation";
import BlockInfo from './blockInfo';


//Cria uma classes e estou exportando a minha casse
export default class Block{
    index:number;
    timestamp: number;
    hash:string;
    previousHash: string;
    data: string;
    nonce: number;
    miner: string;
    

    /**
     * creates a new block
     * @param block The block date
     */
    constructor(block?: Block)
    {
        this.index = block?.index || 0;
        this.timestamp = block?.timestamp || Date.now();
        this.previousHash = block?.previousHash || "";
        this.data = block?.data || "";
        this.nonce = block?.nonce || 0;
        this.miner = block?.miner || "";
        this.hash = block?.hash || this.getHash();
    }

    /**
     * cria o Hash concatena tudos os paramentro e depois converte de bit para string
     */
    getHash():string {
        return sha256(this.index + this.data + this.timestamp + this.previousHash + this.nonce +this.miner).toString();
    }

    /**
     * Generates a new valid hash for this block with the specified difficulty
     * @param difficulty The Blockchain current difficulty
     * @param miner The miner wallet address
     */
    mine(difficulty: number, miner:string){
        this.miner = miner;
        const prefix = new Array(difficulty + 1).join("0");

        do{
            this.nonce++;
            this.hash = this.getHash();   
        }
        while(!this.hash.startsWith(prefix));
    }

    //metodo para validar uma operacao
    /**
     * Validade the block
     * @param previousHash The previous block hash
     * @param previousIndex
     * @returns returns if the block is valid
     */
    
    isValid(previousHash: string, previousIndex: number, difficult: number,):Validation{
        if(previousIndex !== this.index - 1)return new Validation(false, "Inavalid index");
        if(!this.data) return new Validation(false, "Inavalid data");
        if(this.timestamp < 1) return new Validation(false, "Inavalid timestamp");
        if(this.previousHash !== previousHash) return new Validation(false, "Inavalid previousHash");
        if(!this.nonce || !this.miner) return new Validation(false, "No minid");
        
        const prefix = new Array(difficult + 1).join("0");
        if(this.hash !== this.getHash() || !this.hash.startsWith(prefix)) 
            return new Validation(false, "Inavalid hash");
        return new Validation();
    }

    //static serve par acompartilha com todo o arquivos
    static fromBlockInfo(blockInfo: BlockInfo): Block {
        const block = new Block();
        block.index = blockInfo.index;
        block.previousHash = blockInfo.previousHash;
        block.data = blockInfo.data;
        return block;
    }
}
