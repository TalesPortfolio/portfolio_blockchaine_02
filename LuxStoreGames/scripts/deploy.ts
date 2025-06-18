////////////////////////////////////////////////////////////////////////////////////
// DEPLOY SCRIPT                                                                     
//                                                                                  
// Este script faz o deploy dos contratos inteligentes GameToken e GameStore         
// na rede configurada pelo Hardhat (por exemplo, Sepolia).                          
////////////////////////////////////////////////////////////////////////////////////
// src/scripts/deploy.ts
import "hardhat/types/runtime";  
import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const Token = await ethers.getContractFactory("GameToken");
  const token = await Token.deploy();
  await token.waitForDeployment();
  console.log("GameToken deployed at:", await token.getAddress());

  const Store = await ethers.getContractFactory("GameStore");
  const store = await Store.deploy(await token.getAddress());
  await store.waitForDeployment();
  console.log("GameStore deployed at:", await store.getAddress());
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
