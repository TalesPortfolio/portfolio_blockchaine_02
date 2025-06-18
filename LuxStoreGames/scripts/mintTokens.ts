import * as dotenv from "dotenv";
dotenv.config();

import { ethers } from "hardhat";

async function main() {
  const [admin] = await ethers.getSigners();
  console.log("Admin:", admin.address);

  // Endereço do usuário para receber os tokens
  const to = process.env.USER_ADDRESS;
  if (!to) {
    throw new Error("⚠️ Defina USER_ADDRESS no seu .env");
  }

  // Endereço do contrato GameToken
  const tokenAddress = process.env.GAME_TOKEN_ADDRESS!;
  if (!tokenAddress) {
    throw new Error("⚠️ Defina GAME_TOKEN_ADDRESS no seu .env");
  }
  // Normaliza/checksum via ethers
  const TOKEN_ADDRESS = ethers.getAddress(tokenAddress);

  const token = await ethers.getContractAt("GameToken", TOKEN_ADDRESS, admin);
  const amount = ethers.parseUnits("50", 18);

  console.log(`Mintando ${amount} GAM para ${to}…`);
  const tx = await token.mint(to, amount);
  await tx.wait();
  console.log("✔ Mint concluído!");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
