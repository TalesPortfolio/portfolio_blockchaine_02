/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   blockchain.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tales <tales@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/01/18 20:10:14 by tales             #+#    #+#             */
/*   Updated: 2025/01/18 20:29:14 by tales            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Block from "./block";
import Validation from "../validation";
/**
 * mocked blockchain class
 */

export default class Blockchain {
  block: Block[];
  nextIndex: number = 0;

  /**
   * Create a new mocked blockchain
   */

  constructor() {
    this.block = [
      new Block({
        index: 0,
        hash: "abc",
        previousHash: "",
        data: "Genesis Block",
        timestamp: Date.now(),
      } as Block),
    ];
    this.nextIndex++;
  }

  getLastBlock(): Block {
    return this.block[this.block.length - 1];
  }

  addBlock(block: Block): Validation {
    if (block.index < 0) return new Validation(false, "Invalid mock block");

    this.block.push(block);
    this.nextIndex++;
    return new Validation();
  }

  getBlock(hash: string): Block | undefined {
    return this.block.find((b) => b.hash === hash);
  }

  isValid(): Validation {
    return new Validation();
  }
}
