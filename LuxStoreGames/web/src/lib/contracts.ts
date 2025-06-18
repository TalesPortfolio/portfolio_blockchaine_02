////////////////////////////////////////////////////////////////////////////////////
// SMART CONTRACTS CONNECTOR                                                            
//                                                                                      
// Este módulo conecta sua aplicação front-end aos contratos GameToken (ERC-20)       
// e GameStore (loja de jogos) usando a biblioteca ethers.js.                          
////////////////////////////////////////////////////////////////////////////////////

import GameTokenABI from "../../../artifacts/contracts/GameToken.sol/GameToken.json";
import GameStoreABI from "../../../artifacts/contracts/GameStore.sol/GameStore.json";
import { ethers } from "ethers";

// Endereços dos contratos implantados, fornecidos via variáveis de ambiente.
// NEXT_PUBLIC_* garante que essas variáveis estejam disponíveis no browser.
const tokenAddress = process.env.NEXT_PUBLIC_TOKEN_ADDRESS!;
const storeAddress = process.env.NEXT_PUBLIC_STORE_ADDRESS!;
const rpcUrl      = process.env.NEXT_PUBLIC_RPC_URL!;


/**
 * Retorna uma instância do contrato GameToken, permitindo
 * chamadas de leitura (provider) e de escrita (signer).
 *
 * @param signerOrProvider - Objeto ethers.Provider para leitura ou ethers.Signer para transações
 * @returns Contrato GameToken conectado ao endereço e ABI correspondentes
 */
export function getTokenContract(
  signerOrProvider: ethers.Provider | ethers.Signer
) {
  return new ethers.Contract(
    tokenAddress,
    GameTokenABI.abi,
    signerOrProvider
  );
}

/**   
 * Retorna uma instância do contrato GameStore, preparada para transações,
 * uma vez que somente um signer (carteira habilitada) pode executar as funções
 * que alteram o estado (addGame, buyGame, etc.).
 *
 * @param signer - Objeto ethers.Signer para enviar transações
 * @returns Contrato GameStore conectado ao endereço e ABI correspondentes
 */
export function getStoreContract(
  signer: ethers.Signer
) {
  return new ethers.Contract(
    storeAddress,
    GameStoreABI.abi,
    signer
  );
}
