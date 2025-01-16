/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   blockchain.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tales <tales@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/01/16 09:49:09 by tales             #+#    #+#             */
/*   Updated: 2025/01/16 20:57:07 by tales            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */


import Block from "./block";
/**
 * lockchain class
 */

export default class Blockchain{
    block: Block[];
    nextIndex: number = 0;
    
    /**
     * Create a new blockchain
     */
    
    constructor() {
        this.block = [new Block(0, "", "Genesis Block")];
        this.nextIndex++;
    }

    getLastBlock(): Block {
        return this.block[this.block.length - 1];
    }

    addBlock(block: Block) : boolean {
        const lastBlock = this.getLastBlock();
        
        if(!block.isValid(lastBlock.hash, lastBlock.index)) return false;
        this.block.push(block);
        this.nextIndex++;
        return true;
    }

    isValid(): boolean {
        for(let i = this.block.length - 1; i > 0; i++){
            const currentBlock = this.block[i];
            const previousBlock = this.block[i - 1];
            const isValid = currentBlock.isValid(previousBlock.hash, previousBlock.index);
            if(!isValid) return false;
        }
        return true;
    }
}