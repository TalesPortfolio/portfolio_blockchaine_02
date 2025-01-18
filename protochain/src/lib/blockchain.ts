/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   blockchain.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tales <tales@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/01/16 09:49:09 by tales             #+#    #+#             */
/*   Updated: 2025/01/17 09:08:24 by tales            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */


import Block from "./block";
import Validation from "./validation";
/**
 * blockchain class
 */

export default class Blockchain{
    block: Block[];
    nextIndex: number = 0;
    
    /**
     * Create a new blockchain
     */
    
    constructor() {
        this.block = [new Block({index: this.nextIndex, previousHash: "" , data: "Genesis Block"}as Block)];
        this.nextIndex++;
    }

    getLastBlock(): Block {
        return this.block[this.block.length - 1];
    }

    addBlock(block: Block) : Validation {
        const lastBlock = this.getLastBlock();
        
        const validation = block.isValid(lastBlock.hash, lastBlock.index);
        if(!validation.success) 
            return new Validation(false, `Invalid block. ${validation.message}`);
        this.block.push(block);
        this.nextIndex++;
        return new Validation();
    }

    getBlock(hash: string): Block | undefined{
        return this.block.find(b => b.hash === hash);   
    }

    isValid(): Validation {
        for(let i = this.block.length - 1; i > 0; i++){
            const currentBlock = this.block[i];
            const previousBlock = this.block[i - 1];
            const validation = currentBlock.isValid(previousBlock.hash, previousBlock.index);
            if(!validation.success) 
                return new Validation(false, `Invalid bloc# ${currentBlock.index}: ${validation.message}`);
        }
        return new Validation();
    }
}