"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "../hooks/useWallet";
import { getTokenContract, getStoreContract } from "../lib/contracts";
import {
  Card,
  Content,
  CoverWrapper,
  DetailsButton,
  DownloadLink,
  PriceTag,
  StyledImage,
  Title,
} from "@/styles/GameCardStyles";
import { ethers } from "ethers";

interface Game {
  id: number;
  slug: string;
  title: string;
  price: number;
  image: string;
  url: string;
}

export default function GameCard({ game }: { game: Game }) {
  const { address, provider } = useWallet();
  const router = useRouter();
  const [purchased, setPurchased] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check on-chain purchase status on mount and when address changes
  useEffect(() => {
    if (!address || !provider) return;
    (async () => {
      try {
        const signer = await provider.getSigner();
        const store = getStoreContract(signer);
        const hasBought: boolean = await store.hasAccess(address, game.id);
        setPurchased(hasBought);
      } catch (err) {
        console.error("Error when checking access:", err);
      }
    })();
  }, [address, provider, game.id]);

  const handleBuy = useCallback(async () => {
    if (!address || !provider) {
      alert("Connect your wallet first.");
      return;
    }

    // If already purchased, open download
    if (purchased) {
      window.open(game.url, "_blank");
      return;
    }

    const signer = await provider.getSigner();
    const buyerAddr = await signer.getAddress();
    console.log("↪️ Buyer address:", buyerAddr);

    const token = getTokenContract(signer);
    const store = getStoreContract(signer);
    const storeAddr = await store.getAddress();
    console.log("↪️ Store address:", storeAddr);

    // Check if game exists in store
    const gameData = await store.games(game.id);
    if (!gameData.exists) {
      alert("This game is not available for purchase.");
      return;
    }

    // Check user balance
    const rawBalance = await token.balanceOf(buyerAddr);
    const balance = parseFloat(rawBalance.toString()) / 1e18;
    if (balance < game.price) {
      router.push("/earn");
      return;
    }

    if (!confirm(`Confirm “${game.title}” por ${game.price} Tokens?`)) {
      return;
    }

    setLoading(true);
    try {
      // 1) Approve
      const amount = ethers.parseUnits(game.price.toString(), 18);
      const txApprove = await token.approve(storeAddr, amount);
      await txApprove.wait();
      console.log("✔ Approve Confirmed");

      // 2) Purchase
      const txBuy = await store.buyGame(game.id);
      const receipt = await txBuy.wait();
      console.log("✔ Confirmed purchase:", receipt.transactionHash);
      setPurchased(true);

      // Notify header to refresh balance
      window.dispatchEvent(new Event("balanceChanged"));
    } catch (err: any) {
      console.error("❌ Purchase error:", err);
      const reason = err.reason || err.error?.message || "Unknown reason";
      alert(`Failure to buy: ${reason}`);
    } finally {
      setLoading(false);
    }
  }, [address, provider, game, purchased, router]);

  return (
    <Card>
      <CoverWrapper>
        {game.image && (
          <StyledImage
            src={game.image}
            alt={`Capa de ${game.title}`}
            fill
            sizes="(max-width: 480px) 100vw, 300px"
          />
        )}
      </CoverWrapper>
      <Content>
        <Title>{game.title}</Title>
        <PriceTag>{game.price} TOKENS</PriceTag>

        {purchased ? (
          <DownloadLink href={game.url} target="_blank" rel="noopener">
            ⬇️ To go down
          </DownloadLink>
        ) : (
          <DetailsButton onClick={handleBuy} disabled={loading}>
            {loading ? "Processing…" : `Buy for ${game.price} Tokens`}
          </DetailsButton>
        )}
      </Content>
    </Card>
  );
}
