/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   block.test.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tales <tales@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/01/16 11:01:00 by tales             #+#    #+#             */
/*   Updated: 2025/01/17 09:15:04 by tales            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Block from "../src/lib/block";

describe("Block tests", () => {
  let genesis: Block;
  beforeAll(() => {
    genesis = new Block({data:"Genesis Block"}as Block);
  });

  //posso usar tambem it() no lugar de test()
  test("Sould be valid < Deveria ser valido (traducao) >", () => {
    const block = new Block({index:1,previousHash:genesis.hash,data: "Block 2"}as Block);
    const valid = block.isValid(genesis.hash, genesis.index);
    expect(valid.success).toBeTruthy();//ou toEqual
  });

  test("Sould NOT be valid (fallbacks)< Deveria ser valido (traducao) >", () => {
    const block = new Block();
    const valid = block.isValid(genesis.hash, genesis.index);
    expect(valid.success).toBeFalsy();
  });

  test("Sould NOT be valid (previous hash) <Nao deve ser valido>", () => {
    const block = new Block({index:1,previousHash:"abc",data: "Block 2"}as Block);
    const valid = block.isValid(genesis.hash, genesis.index);

    expect(valid.success).toBeFalsy();
  });

  test("Sould NOT be valid (timestamp) <Nao deve ser valido>", () => {
    const block = new Block({index:1,previousHash:genesis.hash,data: "Block 2"}as Block);
    block.timestamp = -1;
    block.hash = block.getHash();
    const valid = block.isValid(genesis.hash, genesis.index);
    expect(valid.success).toBeFalsy();
  });

  test("Sould NOT be valid (hash) <Nao deve ser valido>", () => {
    const block = new Block({index:1,previousHash:genesis.hash,data: "Block 2"}as Block);
    block.hash = "";
    const valid = block.isValid(genesis.hash, genesis.index);
    expect(valid.success).toBeFalsy();
  });

  test("Sould NOT be valid (data) <Nao deve ser valido>", () => {
    const block = new Block({index:1,previousHash:genesis.hash,data: ""}as Block);
    const valid = block.isValid(genesis.hash, genesis.index);
    expect(valid.success).toBeFalsy();
  });

  test("Sould NOT be valid (index) <Nao deve ser valido>", () => {
    const block = new Block({index:-1,previousHash:genesis.hash,data: "Block 2"}as Block);
    const valid = block.isValid(genesis.hash, genesis.index);

    expect(valid.success).toBeFalsy();
  });
});
