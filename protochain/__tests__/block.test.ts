/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   block.test.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: tales <tales@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/01/16 11:01:00 by tales             #+#    #+#             */
/*   Updated: 2025/01/16 22:00:22 by tales            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Block from "../src/lib/block";

describe("Block tests", () => {
  let genesis: Block;
  beforeAll(() => {
    genesis = new Block(0, "", "Genesis Block");
  });

  //posso usar tambem it() no lugar de test()
  test("Sould be valid < Deveria ser valido (traducao) >", () => {
    const block = new Block(1, genesis.hash, "block 2");
    const valid = block.isValid(genesis.hash, genesis.index);

    //expect(valid).toEqual(true);//compara com o parametro passado
    expect(valid.success).toBeTruthy(); //fais a mesmo coisa mais nao presisa de paramentro compara com qualque coisa q seja verdadeira
  });

  test("Sould NOT be valid (previous hash) <Nao deve ser valido>", () => {
    const block = new Block(1, "abc", "block 2");
    const valid = block.isValid(genesis.hash, genesis.index);

    expect(valid.success).toBeFalsy();
  });

  test("Sould NOT be valid (timestamp) <Nao deve ser valido>", () => {
    const block = new Block(1, genesis.hash, "block 2");
    block.timestamp = -1;
    block.hash = block.getHash();
    const valid = block.isValid(genesis.hash, genesis.index);
    expect(valid.success).toBeFalsy();
  });

  test("Sould NOT be valid (hash) <Nao deve ser valido>", () => {
    const block = new Block(1, genesis.hash, "block 2");
    block.hash = "";
    const valid = block.isValid(genesis.hash, genesis.index);
    expect(valid.success).toBeFalsy();
  });

  test("Sould NOT be valid (data) <Nao deve ser valido>", () => {
    const block = new Block(1, genesis.hash, "");
    const valid = block.isValid(genesis.hash, genesis.index);
    expect(valid.success).toBeFalsy();
  });

  test("Sould NOT be valid (index) <Nao deve ser valido>", () => {
    const block = new Block(-1, genesis.hash, "block 2");
    const valid = block.isValid(genesis.hash, genesis.index);

    expect(valid.success).toBeFalsy();
  });
});
