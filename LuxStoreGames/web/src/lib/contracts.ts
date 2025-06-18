import { ethers } from "ethers";
import GameTokenJson from "./abis/GameToken.json";
import GameStoreJson from "./abis/GameStore.json";

// Endereços dos contratos no front-end (NEXT_PUBLIC_*)
const tokenAddress = process.env.NEXT_PUBLIC_TOKEN_ADDRESS!;
const storeAddress = process.env.NEXT_PUBLIC_STORE_ADDRESS!;

/**
 * Instância do GameToken (ERC-20)
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
 * Instância do GameStore (loja de jogos)
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
