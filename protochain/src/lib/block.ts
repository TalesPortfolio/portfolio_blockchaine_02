/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   block.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tales <tales@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/01/16 09:33:56 by tales             #+#    #+#             */
/*   Updated: 2025/01/17 08:51:42 by tales            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import sha256 from 'crypto-js/sha256';
import Validation from "./validation";

//Cria uma classes e estou exportando a minha casse
export default class Block{
    index:number;
    timestamp: number;
    hash:string;
    previousHash: string;
    data: string;
    

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
        this.hash = block?.hash || this.getHash();
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
     * @returns returns if the block is valid
     */
    isValid(previousHash: string, previousIndex: number):Validation{
        if(previousIndex !== this.index - 1)return new Validation(false, "Inavalid index");
        if(this.hash !== this.getHash()) return new Validation(false, "Inavalid hash");;
        if(!this.data) return new Validation(false, "Inavalid data");;
        if(this.timestamp < 1) return new Validation(false, "Inavalid timestamp");
        if(this.previousHash !== previousHash) return new Validation(false, "Inavalid previousHash");
        return new Validation();
    }
}