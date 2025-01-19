/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   blockchain.test.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tales <tales@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/01/16 12:34:52 by tales             #+#    #+#             */
/*   Updated: 2025/01/19 10:39:11 by tales            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Block from "../src/lib/block";
import Blockchain from "../src/lib/blockchain";

jest.mock("../src/lib/block")

describe("Block tests", ()=>{
    
    //posso usar tambem it() no lugar de test()
    test('Sould has genesis block < Deveria ser valido (traducao) >', ()=>{
        const blockchain = new Blockchain();
        expect(blockchain.blocks.length).toEqual(1);        
    })

    test('Sould be valid (Genesis)', ()=>{
        const blockchain = new Blockchain();
        expect(blockchain.isValid().success).toEqual(true);        
    })

    test('Sould be valid (two blocks)', ()=>{
        const blockchain = new Blockchain();
        const result = blockchain.addBlock(new Block({index:1,previousHash:blockchain.blocks[0].hash,data: "Block 2"}as Block));
        expect(result.success).toEqual(true);        
    })

    test('Sould NOT be valid', ()=>{
        const blockchain = new Blockchain();
        blockchain.addBlock(new Block({
            index:1,
            previousHash:blockchain.blocks[0].hash,
            data: "Block 2"
        }as Block));
        blockchain.blocks[1].index = -1;
        expect(blockchain.isValid().success).toEqual(false);        
    })

    test('Sould add block ', ()=>{
        const blockchain = new Blockchain();
        const result = blockchain.addBlock(new Block({index:1,previousHash:blockchain.blocks[0].hash,data: "Block 2"}as Block));
        expect(result.success).toEqual(true);        
    })

    test('Sould get block ', ()=>{
        const blockchain = new Blockchain();
        const block = blockchain.getBlock(blockchain.blocks[0].hash);
        expect(block).toBeTruthy();        
    })

    test('Sould NOT add block ', ()=>{
        const blockchain = new Blockchain();
        const block = new Block({index:-1,previousHash:blockchain.blocks[0].hash,data: "Block 2"}as Block)
        const result = blockchain.addBlock(block);
        expect(result.success).toEqual(false);        
    })
    
})