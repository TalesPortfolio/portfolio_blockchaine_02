/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   block.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tales <tales@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/01/16 09:33:56 by tales             #+#    #+#             */
/*   Updated: 2025/01/17 10:15:39 by tales            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */


import Validation from "../validation";

//MOcked block class
export default class Block{
    index:number;
    timestamp: number;
    hash:string;
    previousHash: string;
    data: string;
    

    /**
     * creates a new mock block
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
        return this.hash || "abc";
    }

    //metodo para validar uma operacao
    /**
     * Validade the mock block
     * @returns returns if the mock block is valid
     */
    isValid(previousHash: string, previousIndex: number):Validation{
        if(!previousHash || previousIndex < 0 || this.index < 0)
            return new Validation(false, "Invalid mock block");
        
        return new Validation();
    }
}
