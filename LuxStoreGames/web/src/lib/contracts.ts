// web/src/lib/contracts.ts
import { ethers } from "ethers";
import GameTokenJson from "./abis/GameToken.json";
import GameStoreJson from "./abis/GameStore.json";

// Endereços dos contratos implantados, fornecidos via variáveis de ambiente.
// NEXT_PUBLIC_* garante que essas variáveis estejam disponíveis no browser.
const tokenAddress = process.env.NEXT_PUBLIC_TOKEN_ADDRESS!;
const storeAddress = process.env.NEXT_PUBLIC_STORE_ADDRESS!;

/**
 * Retorna uma instância do contrato GameToken, permitindo
 * chamadas de leitura (provider) e de escrita (signer).
 *
 * @param signerOrProvider - Objeto ethers.Provider para leitura ou ethers.Signer para transações
 * @returns Contrato GameToken conectado ao endereço e ABI correspondentes
 */
export function getTokenContract(
  signerOrProvider: ethers.Signer | ethers.Provider
) {
  return new ethers.Contract(
    tokenAddress,
    GameTokenJson.abi,
    signerOrProvider
  );
}

/**   
 * Retorna uma instância do contrato GameStore, preparada para transações,
 * uma vez que somente um signer (carteira habilitada) pode executar as funções
 * que alteram o estado (addGame, buyGame, etc.).
 *
 * @param signerOrProvider - Objeto ethers.Signer para enviar transações
 * @returns Contrato GameStore conectado ao endereço e ABI correspondentes
 */
export function getStoreContract(
  signerOrProvider: ethers.Signer | ethers.Provider
) {
  return new ethers.Contract(
    storeAddress,
    GameStoreJson.abi,
    signerOrProvider
  );
}
