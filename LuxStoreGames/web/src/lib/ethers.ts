// web/src/lib/ethers.ts
////////////////////////////////////////////////////////////////////////////////////
// UTILITARY LIB FOR SMART CONTRACT INTERACTIONS                                          
//                                                                                      
// Este módulo fornece duas funções que retornam instâncias dos contratos            
// inteligentes GameToken (ERC-20) e GameStore (loja de jogos) usando a biblioteca  
// ethers.js.                                                                          
////////////////////////////////////////////////////////////////////////////////////

import { ethers } from "ethers";
// Ajuste os paths para o diretório abis dentro de src/lib
import GameTokenJson from "./abis/GameToken.json";
import GameStoreJson from "./abis/GameStore.json";

// Endereços dos contratos implantados, definidos via variáveis de ambiente
const TOKEN_ADDRESS = process.env.NEXT_PUBLIC_TOKEN_ADDRESS!;
const STORE_ADDRESS = process.env.NEXT_PUBLIC_STORE_ADDRESS!;

/**
 * Cria e retorna uma instância do contrato GameToken, 
 * que permite chamar funções como balanceOf, transfer, approve, mint etc.
 * 
 * @param signerOrProvider - Signer para transações ou Provider para apenas leitura
 * @returns ethers.Contract ligado ao endereço e ABI do GameToken
 */
export function getTokenContract(
  signerOrProvider: ethers.Signer | ethers.Provider
) {
  return new ethers.Contract(
    TOKEN_ADDRESS,
    GameTokenJson.abi,
    signerOrProvider
  );
}

/**
 * Cria e retorna uma instância do contrato GameStore, 
 * que permite chamar funções como addGame, buyGame e consultar hasAccess.
 * 
 * @param signerOrProvider - Signer para transações ou Provider para apenas leitura
 * @returns ethers.Contract ligado ao endereço e ABI do GameStore
 */
export function getStoreContract(
  signerOrProvider: ethers.Signer | ethers.Provider
) {
  return new ethers.Contract(
    STORE_ADDRESS,
    GameStoreJson.abi,
    signerOrProvider
  );
}
