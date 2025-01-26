/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   block.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tales <tales@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/01/16 09:33:56 by tales             #+#    #+#             */
/*   Updated: 2025/01/26 14:30:20 by tales            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import sha256 from 'crypto-js/sha256';
import Validation from "./validation";
import BlockInfo from './blockInfo';
import Transaction from './transaction';
import TransactionType from './transactionTypes';


//Cria uma classes e estou exportando a minha casse
export default class Block{
    index:number;
    timestamp: number;
    hash:string;
    previousHash: string;
    transactions:Transaction[];
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
        
        this.transactions = block?.transactions 
            ? block.transactions.map(tx => new Transaction(tx))
            : [] as Transaction[];
                
        this.nonce = block?.nonce || 0;
        this.miner = block?.miner || "";
        this.hash = block?.hash || this.getHash();
    }

    /**
     * cria o Hash concatena tudos os paramentro e depois converte de bit para string
     */
    getHash():string {
        const txs = this.transactions && this.transactions.length
            ? this.transactions.map(tx => tx.hash).reduce((a, b) => a + b)
            :"";
        return sha256(this.index +  txs + this.timestamp + this.previousHash + this.nonce +this.miner).toString();
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
        
        if(this.transactions && this.transactions.length){
            if(this.transactions.filter(tx => tx.type === TransactionType.FEE).length > 1)
                return new Validation(false, "Too many fees.");
            
            const validations = this.transactions.map(tx => tx.isValid());
            const erros = validations.filter(v => !v.success).map(v => v.message);
            if(erros.length > 0)
                return new Validation(false, "Invalid block due to invalid tx: " + erros.reduce((a, b) => a + b));
        }

        
        if(previousIndex !== this.index - 1)return new Validation(false, "Inavalid index");
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
        block.transactions = blockInfo.transactions.map(tx => new Transaction(tx));
        return block;
    }
}
