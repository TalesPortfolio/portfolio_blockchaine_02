/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   minerClient.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tales <tales@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/01/19 18:57:59 by tales             #+#    #+#             */
/*   Updated: 2025/01/23 20:43:45 by tales            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import dotenv from 'dotenv'
dotenv.config();

import axios from "axios";
import BlockInfo from "../lib/blockInfo";
import Block from "../lib/block";

const BLOCKCHAIN_SERVER = process.env.BLOCKCHAIN_SERVER;

const minerWallet = {
    privateKey: "123456",
    publicKey: `${process.env.MINER_WALLET}`
};

console.log(`logged as ${minerWallet.publicKey}`);

let totalMined = 0;


async function mine() {
    console.log("Getting next block info...")
    const { data } = await axios.get(`${BLOCKCHAIN_SERVER}blocks/next`);
    if(!data){
        console.log("No tx found. Waiting...")
        return setTimeout(()=>{
            mine();
        },5000)
    }
    const blockInfo = data as BlockInfo;
    
    const newBlock = Block.fromBlockInfo(blockInfo);

    //TODO: adcionar tx de recompensa
    console.log(`Start mining block # ${blockInfo.index}`);
    newBlock.mine(blockInfo.difficulty, minerWallet.publicKey);

    console.log("Block mined! Sending to blockchain...");
    
    try {
        await axios.post(`${BLOCKCHAIN_SERVER}blocks/`, newBlock);
        console.log("Block sent and accept!");
        totalMined++;
        console.log(`Total mined blocks: ${totalMined}`);
    } catch (err: any) {
        console.error(err.response ? err.response.data : err.message);
    }
    

  
}

mine()