// scripts/seedGames.ts
import * as dotenv from "dotenv";
dotenv.config();

import { ethers } from "hardhat";

interface ItchGame {
  id: number;
  price: number;
}

async function main() {
  const [admin] = await ethers.getSigners();

  // 1) Conecta ao GameStore
  const raw = process.env.STORE_ADDRESS;
  if (!raw) throw new Error("⚠️ Defina STORE_ADDRESS no seu .env");
  const STORE_ADDRESS = ethers.getAddress(raw);
  const store = await ethers.getContractAt("GameStore", STORE_ADDRESS, admin);

  // 2) Busca a lista local
  console.log("🔎 Fetching itch.io games…");
  const res = await fetch("http://localhost:3000/api/itch");
  if (!res.ok) throw new Error(`Itch API returned ${res.status}`);
  const games: ItchGame[] = await res.json();
  console.log(`Total fetched: ${games.length}`);

  // 3) Limita e filtra os não-cadastrados
  const maxSeed = parseInt(process.env.MAX_SEED_GAMES || `${games.length}`, 10);
  const candidates = games.slice(0, maxSeed);
  const toSeed: ItchGame[] = [];
  for (const g of candidates) {
    const { exists } = await store.games(g.id);
    if (!exists) toSeed.push(g);
  }
  console.log(`To seed: [${toSeed.map((g) => g.id).join(", ")}]`);

  // 4) Envia uma a uma, aguardando cada confirmação
  for (const g of toSeed) {
    const price = ethers.parseUnits(g.price.toString(), 18);
    console.log(`⏳ Sending addGame(${g.id}, ${g.price} GAM)…`);
    const tx = await store.addGame(g.id, price);
    const receipt = await tx.wait();
    console.log(`✔ Game ${g.id} seeded (tx: ${receipt.transactionHash})`);

    // opcional: pausa breve
    await new Promise((r) => setTimeout(r, 2000));
  }

  console.log("🎉 All games seeded!");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
