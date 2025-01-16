/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   blockchain.test.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tales <tales@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/01/16 12:34:52 by tales             #+#    #+#             */
/*   Updated: 2025/01/16 22:17:03 by tales            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Block from "../src/lib/block";
import Blockchain from "../src/lib/blockchain";

describe("Block tests", ()=>{
    
    //posso usar tambem it() no lugar de test()
    test('Sould has genesis block < Deveria ser valido (traducao) >', ()=>{
        const blockchain = new Blockchain();
        expect(blockchain.block.length).toEqual(1);        
    })

    test('Sould be valid (Genesis)', ()=>{
        const blockchain = new Blockchain();
        expect(blockchain.isValid().success).toEqual(true);        
    })

    test('Sould be valid (two blocks)', ()=>{
        const blockchain = new Blockchain();
        const result = blockchain.addBlock(new Block(1, blockchain.block[0].hash, "block 2"));
        expect(result.success).toEqual(true);        
    })

    test('Sould NOT be valid', ()=>{
        const blockchain = new Blockchain();
        blockchain.addBlock(new Block(1, blockchain.block[0].hash, "block 2"));
        blockchain.block[1].data = "a transfere 2 para b"
        expect(blockchain.isValid().success).toEqual(false);        
    })

    test('Sould add block ', ()=>{
        const blockchain = new Blockchain();
        const result = blockchain.addBlock(new Block(1, blockchain.block[0].hash, "block 2"));
        expect(result.success).toEqual(true);        
    })

    test('Sould NOT add block ', ()=>{
        const blockchain = new Blockchain();
        const block = new Block(-1, blockchain.block[0].hash, "block 2")
        const result = blockchain.addBlock(block);
        expect(result.success).toEqual(false);        
    })
    
})