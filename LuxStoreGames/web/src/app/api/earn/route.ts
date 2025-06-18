// web/src/app/api/earn/route.ts
import { NextResponse } from "next/server";
import { ethers } from "ethers";
import * as dotenv from "dotenv";
import GameTokenJson from "../../../../../artifacts/contracts/GameToken.sol/GameToken.json";

dotenv.config();

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { address, amount, secret } = await req.json();

  // 1) Autenticação simples
  if (secret !== process.env.EARN_API_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2) Validações básicas
  if (!ethers.isAddress(address)) {
    return NextResponse.json({ error: "Invalid address" }, { status: 400 });
  }
  const amt = BigInt(amount);
  if (amt <= 0n) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  // 3) Configura o provider e a wallet do admin
  const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
  const adminWallet = new ethers.Wallet(
    process.env.PRIVATE_KEY as string,
    provider
  );

  // 4) Instancia seu GameToken como admin
  const token = new ethers.Contract(
    process.env.GAME_TOKEN_ADDRESS!,
    GameTokenJson.abi,
    adminWallet
  );

  try {
    // 5) Chama mint on-chain
    const tx = await token.mint(address, amt);
    const receipt = await tx.wait();

    return NextResponse.json({
      txHash: receipt.transactionHash,
      to: address,
      amount: amt.toString(),
    });
  } catch (err: any) {
    console.error("Mint error:", err);
    return NextResponse.json(
      { error: err.reason || err.message || "Mint failed" },
      { status: 500 }
    );
  }
}
