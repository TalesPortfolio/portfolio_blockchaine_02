/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   minerClient.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tales <tales@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/01/19 18:57:59 by tales             #+#    #+#             */
/*   Updated: 2025/01/19 20:03:57 by tales            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import axios from "axios";
import BlockInfo from "../lib/blockInfo";
import Block from "../lib/block";

const BLOCKCHAIN_SERVER = 'http://localhost:3000/';

const minerWallet = {
    privateKey: "123456",
    publicKey: "Tales_Pulblic_Key"
};

let totalMined = 0;


async function mine() {
    console.log("Getting next block info...")
    const { data } = await axios.get(`${BLOCKCHAIN_SERVER}blocks/next`);
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
    

    setTimeout(()=>{
        mine();
    },1000)
}

mine()